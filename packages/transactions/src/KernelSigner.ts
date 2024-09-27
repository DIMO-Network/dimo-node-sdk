import { ContractToMapping, ENVIRONMENT } from ":core/types/dimoTypes.js";
import { KERNEL_V2_4 } from "@zerodev/sdk/constants";
import { KERNEL_V2_VERSION_TYPE } from "@zerodev/sdk/types";
import { Chain, PublicClient, Transport, createPublicClient, http } from "viem";
import { KernelAccountClient, KernelSmartAccount } from "@zerodev/sdk";
import { EntryPoint } from "permissionless/types";
import { BundlerClient, GetUserOperationReceiptReturnType, createBundlerClient } from "permissionless";
import { mintVehicleWithDeviceDefinition } from ":core/actions/mintVehicleWithDeviceDefinition.js";
import { setVehiclePermissions } from ":core/actions/setPermissionsSACD.js";
import { sendDIMOTokens } from ":core/actions/sendDIMOTokens.js";
import { CHAIN_ABI_MAPPING, ENV_MAPPING, ENV_NETWORK_MAPPING } from ":core/constants/mappings.js";
import { ENTRYPOINT } from ":core/constants/contractAddrs.js";
import { SACD_DEFAULT_EXPIRATION, SACD_DEFAULT_PERMISSIONS, SACD_DEFAULT_SOURCE } from ":core/constants/sacd.js";
import {
  ClaimAftermarketdevice,
  MintVehicleWithDeviceDefinition,
  PairAftermarketDevice,
  SendDIMOTokens,
  SetVehiclePermissions,
} from ":core/types/args.js";
import { claimAftermarketDevice, claimAftermarketDeviceTypeHash, pairAftermarketDevice } from ":core/actions/claimAndPairAftermarketDevice.js";
import { kernelClientFromPasskey } from ":core/kernelClientFromSigner/kernelClientFromPasskey.js";
import { kernelClientFromPrivateKey } from ":core/kernelClientFromSigner/kernelClientFromPrivateKey.js";
import { PasskeyStamper } from "@turnkey/react-native-passkey-stamper";

export class KernelSigner {
  publicClient: PublicClient;
  chain: Chain | undefined;
  bundlerClient: BundlerClient<EntryPoint, Chain | undefined>;
  kernelClient: KernelAccountClient<EntryPoint, Transport, Chain, KernelSmartAccount<EntryPoint, Transport, Chain>>;
  contractMapping: ContractToMapping;
  environment: string;
  rpcURL: string;
  bundlerUrl: string | undefined;
  paymasterUrl: string | undefined;
  turnkeyApiBaseUrl: string | undefined;
  entryPoint: `0x${string}` = ENTRYPOINT;

  constructor(
    environment: string = "prod",
    rpcURL: string,
    bundlerUrl?: string,
    paymasterUrl?: string,
    turnkeyApiBaseUrl?: string,
    entryPoint: `0x${string}` = ENTRYPOINT
  ) {
    this.environment = environment;
    this.chain = ENV_NETWORK_MAPPING.get(ENV_MAPPING.get(this.environment) ?? ENVIRONMENT.DEV);
    this.contractMapping = CHAIN_ABI_MAPPING[ENV_MAPPING.get(this.environment) ?? ENVIRONMENT.DEV].contracts;
    this.publicClient = createPublicClient({
      transport: http(rpcURL),
      chain: this.chain,
    });

    this.rpcURL = rpcURL;
    this.bundlerUrl = bundlerUrl;
    this.paymasterUrl = paymasterUrl;
    this.turnkeyApiBaseUrl = turnkeyApiBaseUrl;
    this.entryPoint = entryPoint;

    if (this.bundlerUrl) {
      this.bundlerClient = createBundlerClient({
        chain: this.chain,
        transport: http(this.bundlerUrl),
        entryPoint: this.entryPoint,
      });
    }
  }

  public async connectPasskey(subOrganizationId: string, address: `0x${string}`, stamper: PasskeyStamper) {
    this.kernelClient = await kernelClientFromPasskey(
      subOrganizationId,
      address,
      stamper,
      this.turnkeyApiBaseUrl!,
      this.bundlerUrl!,
      this.publicClient,
      this.paymasterUrl!
    );
  }

  public async connectPrivateKey(
    privateKey: `0x${string}`,
    bundlrUrl: string,
    paymasterUrl: string,
    entryPoint: `0x${string}` = ENTRYPOINT,
    kernelVersion: KERNEL_V2_VERSION_TYPE = KERNEL_V2_4
  ) {
    this.kernelClient = await kernelClientFromPrivateKey(
      privateKey,
      this.publicClient,
      bundlrUrl,
      paymasterUrl,
      entryPoint,
      kernelVersion
    );

    this.bundlerClient = createBundlerClient({
      chain: this.chain,
      transport: http(bundlrUrl),
      entryPoint: entryPoint,
    });
  }

  public async mintVehicleDefaultPerms(
    args: MintVehicleWithDeviceDefinition
  ): Promise<GetUserOperationReceiptReturnType> {
    if (!args.sacdInput) {
      args.sacdInput = {
        grantee: this.kernelClient.account.address,
        permissions: SACD_DEFAULT_PERMISSIONS,
        expiration: SACD_DEFAULT_EXPIRATION,
        source: SACD_DEFAULT_SOURCE,
      };
    }

    const mintVehicleCallData = await mintVehicleWithDeviceDefinition(args, this.kernelClient, this.environment);
    const userOpHashMint = await this.kernelClient.sendUserOperation({
      userOperation: {
        callData: mintVehicleCallData as `0x${string}`,
      },
    });
    const txResultMint = await this.bundlerClient.waitForUserOperationReceipt({ hash: userOpHashMint });

    return txResultMint;
  }

  public async mintVehicleWithDeviceDefinition(
    args: MintVehicleWithDeviceDefinition
  ): Promise<GetUserOperationReceiptReturnType> {
    const mintVehicleCallData = await mintVehicleWithDeviceDefinition(args, this.kernelClient, this.environment);
    const userOpHash = await this.kernelClient.sendUserOperation({
      userOperation: {
        callData: mintVehicleCallData as `0x${string}`,
      },
    });
    const txResult = await this.bundlerClient.waitForUserOperationReceipt({ hash: userOpHash });
    return txResult;
  }

  public async setVehiclePermissions(args: SetVehiclePermissions): Promise<GetUserOperationReceiptReturnType> {
    const setVehiclePermissionsCallData = await setVehiclePermissions(args, this.kernelClient, this.environment);
    const userOpHash = await this.kernelClient.sendUserOperation({
      userOperation: {
        callData: setVehiclePermissionsCallData as `0x${string}`,
      },
    });
    const txResult = await this.bundlerClient.waitForUserOperationReceipt({ hash: userOpHash });
    return txResult;
  }

  public async sendDIMOTokens(args: SendDIMOTokens): Promise<GetUserOperationReceiptReturnType> {
    const sendDIMOTokensCallData = await sendDIMOTokens(args, this.kernelClient, this.environment);
    const userOpHash = await this.kernelClient.sendUserOperation({
      userOperation: {
        callData: sendDIMOTokensCallData as `0x${string}`,
      },
    });
    const txResult = await this.bundlerClient.waitForUserOperationReceipt({ hash: userOpHash });
    return txResult;
  }

  public claimAftermarketDeviceTypeHash(aftermarketDeviceNode: bigint, owner: `0x${string}`): `0x${string}` {
    return claimAftermarketDeviceTypeHash(aftermarketDeviceNode, owner, this.environment);
  }

  public async claimAftermarketDevice(args: ClaimAftermarketdevice): Promise<GetUserOperationReceiptReturnType> {
    const claimADCallData = await claimAftermarketDevice(args, this.kernelClient, this.environment);
    const userOpHash = await this.kernelClient.sendUserOperation({
      userOperation: {
        callData: claimADCallData as `0x${string}`,
      },
    });
    const txResult = await this.bundlerClient.waitForUserOperationReceipt({ hash: userOpHash });
    return txResult;
  }

  public async pairAftermarketDevice(args: PairAftermarketDevice): Promise<GetUserOperationReceiptReturnType> {
    const pairADCallData = await pairAftermarketDevice(args, this.kernelClient, this.environment);
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
  ): Promise<GetUserOperationReceiptReturnType[]> {
    const claimADCallData = await claimAftermarketDevice(args, this.kernelClient, this.environment);
    const claimADHash = await this.kernelClient.sendUserOperation({
      userOperation: {
        callData: claimADCallData as `0x${string}`,
      },
    });
    const claimADResult = await this.bundlerClient.waitForUserOperationReceipt({ hash: claimADHash });

    if (!claimADResult.success) {
      return [claimADResult];
    }

    const pairADCallData = await pairAftermarketDevice(args, this.kernelClient, this.environment);
    const pairADHash = await this.kernelClient.sendUserOperation({
      userOperation: {
        callData: pairADCallData as `0x${string}`,
      },
    });
    const pairADResult = await this.bundlerClient.waitForUserOperationReceipt({ hash: pairADHash });
    return [claimADResult, pairADResult];
  }
}
