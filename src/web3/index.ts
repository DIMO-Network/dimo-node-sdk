import { Chain, Transport, PublicClient, http, createPublicClient, createWalletClient } from "viem";
import { TurnkeyClient } from "@turnkey/http";
import { ApiKeyStamper } from "@turnkey/api-key-stamper";
import { createAccount } from "@turnkey/viem";
import { CHAIN_ABI_MAPPING, CHAIN_TO_NETWORK_ENUM_MAPPING } from "../utils/constants";
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
  MintVehicleWithDeviceDefinition,
  SupportedNetworks,
  ConnectPasskeyParams,
  ConnectPrivateKeyParams,
  ConnectTurnkeyParams,
  SetVehiclePermissions,
} from "../utils/types";
import { EntryPoint } from "permissionless/types";
import { DimoError } from "../utils/error";
import { KERNEL_V3_VERSION_TYPE, KernelValidator } from "@zerodev/sdk/types";
import { signerToEcdsaValidator } from "@zerodev/ecdsa-validator";
import {
  BundlerClient,
  ENTRYPOINT_ADDRESS_V07,
  createBundlerClient,
  walletClientToSmartAccountSigner,
} from "permissionless";
import { KERNEL_V3_1 } from "@zerodev/sdk/constants";
import { privateKeyToAccount } from "viem/accounts";
import {
  WebAuthnMode,
  toWebAuthnKey,
  toPasskeyValidator,
  PasskeyValidatorContractVersion,
} from "@zerodev/passkey-validator";
import { SendUserOperationParameters } from "permissionless/actions/smartAccount";
import { SmartAccount } from "permissionless/accounts";
import { mintVehicleWithDeviceDefinition } from "./actions/mintVehicleWithDeviceDefinition";
import { setVehiclePermissions } from "./actions/setPermissionsSACD";

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

  async connectKernelAccountTurnkey(params: ConnectTurnkeyParams) {
    const turnkeyClient = new TurnkeyClient(
      { baseUrl: params.turnkeyBaseURL },
      new ApiKeyStamper({
        apiPublicKey: params.turnkeyApiPublicKey,
        apiPrivateKey: params.turnkeyApiPrivateKey,
      })
    );

    const turnkeyAccount = await createAccount({
      client: turnkeyClient,
      organizationId: params.organizationId, // organization id
      signWith: params.turnkeyPKSignerAddress, // private key address (org)
    });

    const walletClient = createWalletClient({
      account: turnkeyAccount,
      transport: http(this.publicClient?.transport.url),
    });

    const smartAccountSigner = walletClientToSmartAccountSigner(walletClient);

    const ecdsaValidator = await signerToEcdsaValidator(this.publicClient, {
      signer: smartAccountSigner,
      entryPoint: ENTRYPOINT_ADDRESS_V07,
      kernelVersion: KERNEL_V3_1,
    });

    const kernelAcct = await createKernelAccount(this.publicClient, {
      entryPoint: this.entrypoint,
      kernelVersion: this.kernelVersion,
      plugins: {
        sudo: ecdsaValidator as KernelValidator<EntryPoint, string>,
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

  // TODO: test this with some passkey accounts
  // that eduardo and crystal have set up
  async connectKernalAccountPasskey(params: ConnectPasskeyParams) {
    const webAuthnKey = await toWebAuthnKey({
      passkeyName: params.passkeyName,
      passkeyServerUrl: params.passkeyServerUrl,
      mode: WebAuthnMode.Login,
      passkeyServerHeaders: {},
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

  async connectKernalAccountPrivateKey(params: ConnectPrivateKeyParams) {
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

  async setVehiclePermissions(args: SetVehiclePermissions, returnForSignature: boolean = false): Promise<any> {
    if (this.kernelClient === undefined) {
      throw new DimoError("Kernel client is not initialized");
    }

    const setPermissionsCallData = await setVehiclePermissions(
      args,
      this.kernelClient,
      this.chainAddrMapping.contracts
    );

    if (returnForSignature) {
      return this._returnUserOperationForSignature(setPermissionsCallData as `0x${string}`);
    }

    return this._submitUserOperation(setPermissionsCallData as `0x${string}`);
  }

  async mintVehicleWithDeviceDefinition(
    args: MintVehicleWithDeviceDefinition,
    returnForSignature: boolean = false
  ): Promise<any> {
    if (this.kernelClient === undefined) {
      throw new DimoError("Kernel client is not initialized");
    }

    const mintVehicleCallData = await mintVehicleWithDeviceDefinition(
      args,
      this.kernelClient,
      this.chainAddrMapping.contracts
    );

    if (returnForSignature) {
      return this._returnUserOperationForSignature(mintVehicleCallData as `0x${string}`);
    }

    return this._submitUserOperation(mintVehicleCallData as `0x${string}`);
  }

  async _returnUserOperationForSignature(callData: `0x${string}`): Promise<any> {
    const userOp: SendUserOperationParameters<
      EntryPoint,
      Transport,
      Chain | undefined,
      KernelSmartAccount<EntryPoint>
    > = {
      account: this.kernelClient?.account,
      userOperation: {
        callData: callData,
      },
    };

    const userOperationForSignature = await this.kernelClient?.prepareUserOperationRequest({
      ...userOp,
      account: this.kernelClient?.account as unknown as SmartAccount<
        EntryPoint,
        string,
        Transport,
        // @ts-ignore
        KernelSmartAccount<EntryPoint>
      >,
    });

    return userOperationForSignature;
  }

  async _submitUserOperation(callData: `0x${string}`): Promise<any> {
    const txHash = await this.kernelClient?.sendUserOperation({
      // @ts-ignore
      account: this.kernelClient?.account,
      userOperation: {
        callData: callData as `0x${string}`,
      },
    });

    const txResult = await this.bundlerClient?.waitForUserOperationReceipt({ hash: txHash! });
    return txResult;
  }
}
