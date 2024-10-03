import { ContractToMapping, ENVIRONMENT, KernelConfig } from ":core/types/dimo.js";
import { Chain, PublicClient, Transport, createPublicClient, createWalletClient, http } from "viem";
import {
  KernelAccountClient,
  KernelSmartAccount,
  createKernelAccount,
  createKernelAccountClient,
  createZeroDevPaymasterClient,
} from "@zerodev/sdk";
import { EntryPoint } from "permissionless/types";
import { BundlerClient, GetUserOperationReceiptReturnType, createBundlerClient } from "permissionless";
import { mintVehicleWithDeviceDefinition } from ":core/actions/mintVehicleWithDeviceDefinition.js";
import { setVehiclePermissions } from ":core/actions/setPermissionsSACD.js";
import { CHAIN_ABI_MAPPING, ENV_MAPPING, ENV_NETWORK_MAPPING } from ":core/constants/mappings.js";
import {
  BurnVehicle,
  ClaimAftermarketdevice,
  MintVehicleWithDeviceDefinition,
  PairAftermarketDevice,
  SendDIMOTokens,
  SetVehiclePermissions,
  TransferVehicleAndAftermarketDeviceIDs,
} from ":core/types/args.js";
import { claimAftermarketDevice, claimAftermarketDeviceTypeHash } from ":core/actions/claimAftermarketDevice.js";
import { TypeHashResponse } from ":core/types/responses.js";
import { sendDIMOTokens } from ":core/actions/sendDIMOTokens.js";
import { pairAftermarketDevice } from ":core/actions/pairAftermarketDevice.js";
import { TurnkeyClient } from "@turnkey/http";
import { polygonAmoy } from "viem/chains";
import { burnVehicle } from ":core/actions/burnVehicle.js";
import { createAccount } from "@turnkey/viem";
import { PasskeyStamper } from "@turnkey/react-native-passkey-stamper";
import { walletClientToSmartAccountSigner } from "permissionless/utils";
import { signerToEcdsaValidator } from "@zerodev/ecdsa-validator";
import { privateKeyToAccount } from "viem/accounts";
import { transferVehicleAndAftermarketDeviceIDs } from ":core/actions/transferVehicleAndADs.js";

export class KernelSigner {
  config: KernelConfig;
  publicClient: PublicClient;
  bundlerClient: BundlerClient<EntryPoint, Chain | undefined>;
  kernelClient: KernelAccountClient<EntryPoint, Transport, Chain, KernelSmartAccount<EntryPoint, Transport, Chain>>;
  contractMapping: ContractToMapping;
  chain: Chain;
  kernelAddress: `0x${string}` | undefined;

  constructor(config: KernelConfig) {
    this.config = config;
    this.chain = ENV_NETWORK_MAPPING.get(ENV_MAPPING.get(this.config.environment) ?? ENVIRONMENT.DEV) ?? polygonAmoy;
    this.contractMapping = CHAIN_ABI_MAPPING[ENV_MAPPING.get(this.config.environment) ?? ENVIRONMENT.DEV].contracts;
    this.publicClient = createPublicClient({
      transport: http(this.config.rpcURL),
      chain: this.chain,
    });

    this.bundlerClient = createBundlerClient({
      chain: this.chain,
      transport: http(this.config.bundlerUrl),
      entryPoint: this.config.entryPoint,
    });
  }

  public async passkeyInit(
    subOrganizationId: string,
    walletAddress: `0x${string}`,
    turnkeyApiBaseUrl: string,
    rpID: string
  ) {
    const passkeyStamper = new PasskeyStamper({
      rpId: rpID,
    });

    const turnkeyClient = new TurnkeyClient({ baseUrl: turnkeyApiBaseUrl }, passkeyStamper);

    const localAccount = await createAccount({
      // @ts-ignore
      client: turnkeyClient,
      organizationId: subOrganizationId,
      signWith: walletAddress,
      ethereumAddress: walletAddress,
    });

    const smartAccountClient = createWalletClient({
      account: localAccount,
      chain: this.chain,
      transport: http(this.config.rpcURL),
    });

    const smartAccountSigner = walletClientToSmartAccountSigner(smartAccountClient);
    const ecdsaValidator = await signerToEcdsaValidator(this.publicClient, {
      signer: smartAccountSigner,
      entryPoint: this.config.entryPoint,
      // @ts-ignore
      kernelVersion: this.config.kernelVersion,
    });

    const account = await createKernelAccount(this.publicClient, {
      plugins: {
        sudo: ecdsaValidator,
      },
      entryPoint: this.config.entryPoint,
      // @ts-ignore
      kernelVersion: this.config.kernelVersion,
    });

    this.kernelClient = createKernelAccountClient({
      account,
      chain: this.chain,
      entryPoint: this.config.entryPoint,
      bundlerTransport: http(this.config.bundlerUrl),
      middleware: {
        // @ts-ignore
        sponsorUserOperation: async ({ userOperation }) => {
          const zerodevPaymaster = createZeroDevPaymasterClient({
            chain: this.chain,
            entryPoint: this.config.entryPoint,
            transport: http(this.config.paymasterUrl),
          });
          return zerodevPaymaster.sponsorUserOperation({
            userOperation,
            entryPoint: this.config.entryPoint,
          });
        },
      },
    });

    this.kernelAddress = account.address;
  }

  public async privateKeyInit(privateKey: `0x${string}`) {
    const ecdsaValidator = await signerToEcdsaValidator(this.publicClient, {
      signer: privateKeyToAccount(privateKey),
      entryPoint: this.config.entryPoint,
      // @ts-ignore
      kernelVersion: this.config.kernelVersion,
    });

    const account = await createKernelAccount(this.publicClient, {
      plugins: {
        sudo: ecdsaValidator,
      },
      entryPoint: this.config.entryPoint,
      // @ts-ignore
      kernelVersion: this.config.kernelVersion,
    });

    this.kernelClient = createKernelAccountClient({
      account,
      chain: this.chain,
      entryPoint: this.config.entryPoint,
      bundlerTransport: http(this.config.bundlerUrl),
      middleware: {
        // @ts-ignore
        sponsorUserOperation: async ({ userOperation }) => {
          const zerodevPaymaster = createZeroDevPaymasterClient({
            chain: this.chain,
            entryPoint: this.config.entryPoint,
            transport: http(this.config.paymasterUrl),
          });
          return zerodevPaymaster.sponsorUserOperation({
            userOperation,
            entryPoint: this.config.entryPoint,
          });
        },
      },
    });

    this.kernelAddress = account.address;
  }

  public async mintVehicleWithDeviceDefinition(
    args: MintVehicleWithDeviceDefinition
  ): Promise<GetUserOperationReceiptReturnType> {
    const mintVehicleCallData = await mintVehicleWithDeviceDefinition(args, this.kernelClient, this.config.environment);
    const userOpHash = await this.kernelClient.sendUserOperation({
      userOperation: {
        callData: mintVehicleCallData as `0x${string}`,
      },
    });
    const txResult = await this.bundlerClient.waitForUserOperationReceipt({ hash: userOpHash });
    return txResult;
  }

  public async setVehiclePermissions(args: SetVehiclePermissions): Promise<GetUserOperationReceiptReturnType> {
    const setVehiclePermissionsCallData = await setVehiclePermissions(args, this.kernelClient, this.config.environment);
    const userOpHash = await this.kernelClient.sendUserOperation({
      userOperation: {
        callData: setVehiclePermissionsCallData as `0x${string}`,
      },
    });
    const txResult = await this.bundlerClient.waitForUserOperationReceipt({ hash: userOpHash });
    return txResult;
  }

  public async sendDIMOTokens(args: SendDIMOTokens): Promise<GetUserOperationReceiptReturnType> {
    const setVehiclePermissionsCallData = await sendDIMOTokens(args, this.kernelClient, this.config.environment);
    const userOpHash = await this.kernelClient.sendUserOperation({
      userOperation: {
        callData: setVehiclePermissionsCallData as `0x${string}`,
      },
    });
    const txResult = await this.bundlerClient.waitForUserOperationReceipt({ hash: userOpHash });
    return txResult;
  }

  public claimAftermarketDeviceTypeHash(aftermarketDeviceNode: bigint, owner: `0x${string}`): TypeHashResponse {
    return claimAftermarketDeviceTypeHash(aftermarketDeviceNode, owner, this.config.environment);
  }

  public async claimAftermarketDevice(args: ClaimAftermarketdevice): Promise<GetUserOperationReceiptReturnType> {
    const claimADCallData = await claimAftermarketDevice(args, this.kernelClient, this.config.environment);
    const userOpHash = await this.kernelClient.sendUserOperation({
      userOperation: {
        callData: claimADCallData as `0x${string}`,
      },
    });
    const txResult = await this.bundlerClient.waitForUserOperationReceipt({ hash: userOpHash });
    return txResult;
  }

  public async pairAftermarketDevice(args: PairAftermarketDevice): Promise<GetUserOperationReceiptReturnType> {
    const pairADCallData = await pairAftermarketDevice(args, this.kernelClient, this.config.environment);
    const userOpHash = await this.kernelClient.sendUserOperation({
      userOperation: {
        callData: pairADCallData as `0x${string}`,
      },
    });
    const txResult = await this.bundlerClient.waitForUserOperationReceipt({ hash: userOpHash });
    return txResult;
  }

  public async claimAndPairAftermarketDevice(
    args: ClaimAftermarketdevice & PairAftermarketDevice
  ): Promise<GetUserOperationReceiptReturnType> {
    const claimADCallData = await claimAftermarketDevice(args, this.kernelClient, this.config.environment);
    const claimADHash = await this.kernelClient.sendUserOperation({
      userOperation: {
        callData: claimADCallData as `0x${string}`,
      },
    });
    const claimADResult = await this.bundlerClient.waitForUserOperationReceipt({ hash: claimADHash });

    if (!claimADResult.success) {
      return claimADResult;
    }

    const pairADCallData = await pairAftermarketDevice(args, this.kernelClient, this.config.environment);
    const pairADHash = await this.kernelClient.sendUserOperation({
      userOperation: {
        callData: pairADCallData as `0x${string}`,
      },
    });
    const pairADResult = await this.bundlerClient.waitForUserOperationReceipt({ hash: pairADHash });
    return pairADResult;
  }

  public async burnVehicle(args: BurnVehicle): Promise<GetUserOperationReceiptReturnType> {
    const burnVehicleCallData = await burnVehicle(args, this.kernelClient, this.config.environment);
    const userOpHash = await this.kernelClient.sendUserOperation({
      userOperation: {
        callData: burnVehicleCallData as `0x${string}`,
      },
    });

    const txResult = await this.bundlerClient.waitForUserOperationReceipt({ hash: userOpHash });
    return txResult;
  }

  public async transferVehicleAndAftermarketDevices(
    args: TransferVehicleAndAftermarketDeviceIDs
  ): Promise<GetUserOperationReceiptReturnType> {
    const burnVehicleCallData = await transferVehicleAndAftermarketDeviceIDs(
      args,
      this.kernelClient,
      this.config.environment
    );
    const userOpHash = await this.kernelClient.sendUserOperation({
      userOperation: {
        callData: burnVehicleCallData as `0x${string}`,
      },
    });

    const txResult = await this.bundlerClient.waitForUserOperationReceipt({ hash: userOpHash });
    return txResult;
  }
}
