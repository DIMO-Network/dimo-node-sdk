import { encodeFunctionData, Chain, Transport, PublicClient, PrivateKeyAccount, http, createPublicClient } from "viem";
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
} from "../utils/types";
import { EntryPoint } from "permissionless/types";
import { CustomError } from "utils/error";
import { KERNEL_V2_VERSION_TYPE, KERNEL_V3_VERSION_TYPE } from "@zerodev/sdk/types";
import { signerToEcdsaValidator } from "@zerodev/ecdsa-validator";
import { ENTRYPOINT_ADDRESS_V07 } from "permissionless";
import { KERNEL_V3_1 } from "@zerodev/sdk/constants";

export class DimoWeb3Client {
  private signer: PrivateKeyAccount;
  publicClient: PublicClient;
  entrypoint: EntryPoint;
  kernelVersion: KERNEL_V2_VERSION_TYPE | KERNEL_V3_VERSION_TYPE;
  chainAddrMapping: ChainInfos;
  kernelClient:
    | KernelAccountClient<EntryPoint, Transport, Chain | undefined, KernelSmartAccount<EntryPoint>>
    | undefined;

  constructor(config: ClientConfigDimo) {
    if (config.entrypoint === undefined) {
      config.entrypoint = ENTRYPOINT_ADDRESS_V07;
    }

    if (config.kernelVersion === undefined) {
      config.kernelVersion = KERNEL_V3_1;
    }

    this.publicClient = createPublicClient({
      transport: http(process.env.RPC_URL as string),
      chain: config.chain,
    });
    this.entrypoint = config.entrypoint;
    this.kernelVersion = config.kernelVersion;
    this.signer = config.signer;
    this.chainAddrMapping =
      CHAIN_ABI_MAPPING[CHAIN_TO_NETWORK_ENUM_MAPPING.get(config.chain.name) as SupportedNetworks];
  }

  async init() {
    const ecdsaValidator = await signerToEcdsaValidator(this.publicClient, {
      entryPoint: this.entrypoint,
      kernelVersion: this.kernelVersion,
      signer: this.signer,
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

  // TODO
  async deployKernel() {}

  // async execute(argname: string) {
  // TODO: we should be able to get a method just by the arg name and execute it here with args of [...]any
  //   });

  // TODO create acct from signer? passkey? talk to crystal about this

  async mintVehicleWithDeviceDefinition(args: MintVehicleWithDeviceDefinition): Promise<`0x${string}`> {
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
      account: account,
      userOperation: {
        callData: mintVehicleCallData as `0x${string}`,
      },
    });

    // TODO this will fail bc we need to get the TX from jiffyscan
    // check if we can use jiffyscan as the transport? probably not?
    // look into useWaitForTransaction from wagmi
    const transaction = await this.publicClient.getTransactionReceipt({
      hash: "0x4ca7ee652d57678f26e887c149ab0735f41de37bcad58c9f6d3ed5824f15b74d",
    });

    // return the actual tx hash here not the jiffy tx
    return txHash as `0x${string}`;
  }
}

// TODO: decode these errors for user in return
// 0x1c48d49e00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000  --> idk yet, I think it has to do with the args being bad

// 0x4e487b710000000000000000000000000000000000000000000000000000000000000011 --> not enough dcx in the kernel account!!
