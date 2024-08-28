import { encodeFunctionData, Chain, Transport, PublicClient, http, createPublicClient } from "viem";
import {
  CHAIN_ABI_MAPPING,
  CHAIN_TO_NETWORK_ENUM_MAPPING,
  MINT_VEHICLE_WITH_DEVICE_DEFINITION,
} from "../utils/constants";
import {
  KernelSmartAccount,
  KernelAccountClient,
  createKernelAccount,
  createKernelAccountClient,
  createZeroDevPaymasterClient,
} from "@zerodev/sdk";
import {
  ChainInfos,
  ClientConfigDimo,
  ContractType,
  MintVehicleWithDeviceDefinition,
  SupportedNetworks,
  connectPasskeyParams,
  connectPrivateKeyParams,
} from "../utils/types";
import { EntryPoint } from "permissionless/types";
import { CustomError } from "../utils/error";
import { KERNEL_V3_VERSION_TYPE } from "@zerodev/sdk/types";
import { signerToEcdsaValidator } from "@zerodev/ecdsa-validator";
import {
  BundlerClient,
  ENTRYPOINT_ADDRESS_V07,
  GetUserOperationReceiptReturnType,
  createBundlerClient,
} from "permissionless";
import { KERNEL_V3_1 } from "@zerodev/sdk/constants";
import { privateKeyToAccount } from "viem/accounts";
import {
  WebAuthnMode,
  toWebAuthnKey,
  toPasskeyValidator,
  PasskeyValidatorContractVersion,
} from "@zerodev/passkey-validator";

export class DimoWeb3Client {
  publicClient: PublicClient;
  entrypoint: EntryPoint;
  kernelVersion: KERNEL_V3_VERSION_TYPE;
  chainAddrMapping: ChainInfos;
  kernelClient:
    | KernelAccountClient<EntryPoint, Transport, Chain | undefined, KernelSmartAccount<EntryPoint>>
    | undefined;
  bundlerClient: BundlerClient<EntryPoint, Chain>;

  constructor(config: ClientConfigDimo) {
    this.entrypoint = ENTRYPOINT_ADDRESS_V07;
    this.kernelVersion = KERNEL_V3_1;
    this.chainAddrMapping =
      CHAIN_ABI_MAPPING[CHAIN_TO_NETWORK_ENUM_MAPPING.get(config.chain.name) as SupportedNetworks];
    this.publicClient = createPublicClient({
      transport: http(process.env.RPC_URL as string),
      chain: config.chain,
    });

    this.bundlerClient = createBundlerClient({
      chain: this.publicClient.chain,
      transport: http(process.env.BUNDLER_URL as string), // Use any bundler url
      entryPoint: ENTRYPOINT_ADDRESS_V07,
    }) as BundlerClient<EntryPoint, Chain>;
  }

  async connectKernalAccountPasskey(params: connectPasskeyParams) {
    const webAuthnKey = await toWebAuthnKey({
      passkeyName: params.passkeyName,
      passkeyServerUrl: params.passkeyServerUrl,
      mode: WebAuthnMode.Login,
    });

    const passkeyValidator = await toPasskeyValidator(this.publicClient, {
      webAuthnKey,
      entryPoint: ENTRYPOINT_ADDRESS_V07,
      kernelVersion: KERNEL_V3_1,
      validatorContractVersion: PasskeyValidatorContractVersion.V0_0_2,
    });

    const kernelAcct = (await createKernelAccount(this.publicClient, {
      plugins: {
        sudo: passkeyValidator,
      },
      entryPoint: ENTRYPOINT_ADDRESS_V07,
      kernelVersion: KERNEL_V3_1,
    })) as KernelSmartAccount<EntryPoint, Transport, Chain>;

    const kernelClient = createKernelAccountClient({
      account: kernelAcct,
      entryPoint: this.entrypoint,
      chain: this.publicClient.chain,
      bundlerTransport: http(process.env.BUNDLER_URL as string),
      middleware: {
        sponsorUserOperation: async ({ userOperation }) => {
          const zerodevPaymaster = createZeroDevPaymasterClient({
            // @ts-ignore
            account: kernelAcct,
            chain: this.publicClient.chain,
            entryPoint: this.entrypoint,
            transport: http(process.env.PAYMASTER_URL as string),
          });

          const res = zerodevPaymaster.sponsorUserOperation({ userOperation, entryPoint: this.entrypoint });
          return res;
        },
      },
    });

    this.kernelClient = kernelClient as
      | KernelAccountClient<EntryPoint, Transport, Chain | undefined, KernelSmartAccount<EntryPoint>>
      | undefined;
  }

  async connectKernalAccountPrivateKey(params: connectPrivateKeyParams) {
    const ecdsaValidator = await signerToEcdsaValidator(this.publicClient, {
      entryPoint: this.entrypoint,
      kernelVersion: this.kernelVersion,
      signer: privateKeyToAccount(params.privateKey),
    });

    const kernelAcct = await createKernelAccount(this.publicClient, {
      entryPoint: this.entrypoint,
      kernelVersion: this.kernelVersion,
      plugins: {
        sudo: ecdsaValidator,
      },
    });

    const kernelClient = createKernelAccountClient({
      account: kernelAcct,
      entryPoint: this.entrypoint,
      chain: this.publicClient.chain,
      bundlerTransport: http(process.env.BUNDLER_URL as string),
      middleware: {
        sponsorUserOperation: async ({ userOperation }) => {
          const zerodevPaymaster = createZeroDevPaymasterClient({
            // @ts-ignore
            account: kernelAcct,
            chain: this.publicClient.chain,
            entryPoint: this.entrypoint,
            transport: http(process.env.PAYMASTER_URL as string),
          });

          const res = zerodevPaymaster.sponsorUserOperation({ userOperation, entryPoint: this.entrypoint });
          return res;
        },
      },
    });

    this.kernelClient = kernelClient;
  }

  // async execute(argname: string) {
  // TODO: we should be able to get a method just by the arg name and execute it here with args of [...]any
  //   });

  async mintVehicleWithDeviceDefinition(
    args: MintVehicleWithDeviceDefinition
  ): Promise<GetUserOperationReceiptReturnType> {
    if (this.kernelClient === undefined) {
      throw new CustomError("Kernel client is not initialized");
    }

    const mintVehicleCallData = await this.kernelClient?.account.encodeCallData({
      to: this.chainAddrMapping.contracts[ContractType.DIMO_REGISTRY].address,
      value: BigInt(0),
      data: encodeFunctionData({
        abi: this.chainAddrMapping.contracts[ContractType.DIMO_REGISTRY].abi,
        functionName: MINT_VEHICLE_WITH_DEVICE_DEFINITION,
        args: [args.manufacturerNode, args.owner, args.deviceDefinitionID, args.attributeInfo],
      }),
    });

    const txHash = await this.kernelClient?.sendUserOperation({
      // @ts-ignore
      account: this.kernelClient?.account,
      userOperation: {
        callData: mintVehicleCallData as `0x${string}`,
      },
    });

    return await this.bundlerClient?.waitForUserOperationReceipt({ hash: txHash });
  }
}

// TODO: decode these errors for user in return
// 0x1c48d49e00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000  --> idk yet, I think it has to do with the args being bad

// 0x4e487b710000000000000000000000000000000000000000000000000000000000000011 --> not enough dcx in the kernel account!!
