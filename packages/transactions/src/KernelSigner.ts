import { ContractToMapping, ENVIRONMENT, KernelSignerConfig } from ":core/types/dimo.js";
import { KERNEL_V2_4 } from "@zerodev/sdk/constants";
import { KERNEL_V2_VERSION_TYPE } from "@zerodev/sdk/types";
import { Chain, PublicClient, Transport, createPublicClient, http } from "viem";
import { KernelAccountClient, KernelSmartAccount } from "@zerodev/sdk";
import { EntryPoint } from "permissionless/types";
import { BundlerClient, GetUserOperationReceiptReturnType, createBundlerClient } from "permissionless";
import { mintVehicleWithDeviceDefinition } from ":core/actions/mintVehicleWithDeviceDefinition.js";
import { setVehiclePermissions } from ":core/actions/setPermissionsSACD.js";
import { CHAIN_ABI_MAPPING, ENV_MAPPING, ENV_NETWORK_MAPPING } from ":core/constants/mappings.js";
import { ENTRYPOINT } from ":core/constants/contractAddrs.js";
import {
  BurnVehicle,
  ClaimAftermarketdevice,
  MintVehicleWithDeviceDefinition,
  PairAftermarketDevice,
  SendDIMOTokens,
  SetVehiclePermissions,
} from ":core/types/args.js";
import { claimAftermarketDevice, claimAftermarketDeviceTypeHash } from ":core/actions/claimAftermarketDevice.js";
import { kernelClientFromPasskey } from ":core/kernelClientFromSigner/kernelClientFromPasskey.js";
import { kernelClientFromPrivateKey } from ":core/kernelClientFromSigner/kernelClientFromPrivateKey.js";
import { TypeHashResponse } from ":core/types/responses.js";
import { sendDIMOTokens } from ":core/actions/sendDIMOTokens.js";
import { pairAftermarketDevice } from ":core/actions/pairAftermarketDevice.js";
import { TurnkeyClient } from "@turnkey/http";
import { polygonAmoy } from "viem/chains";
import { burnVehicle } from ":core/actions/burnVehicle.js";

export class KernelSigner {
  config: KernelSignerConfig;
  publicClient: PublicClient;
  bundlerClient: BundlerClient<EntryPoint, Chain | undefined>;
  kernelClient: KernelAccountClient<EntryPoint, Transport, Chain, KernelSmartAccount<EntryPoint, Transport, Chain>>;
  contractMapping: ContractToMapping;
  chain: Chain;

  constructor(config: KernelSignerConfig) {
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

  public async connectTurnkeyClient(subOrganizationId: string, address: `0x${string}`, tkClient: TurnkeyClient) {
    this.kernelClient = await kernelClientFromPasskey(
      subOrganizationId,
      address,
      tkClient,
      this.config.bundlerUrl!,
      this.publicClient,
      this.config.paymasterUrl!
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
  ): Promise<GetUserOperationReceiptReturnType[]> {
    const claimADCallData = await claimAftermarketDevice(args, this.kernelClient, this.config.environment);
    const claimADHash = await this.kernelClient.sendUserOperation({
      userOperation: {
        callData: claimADCallData as `0x${string}`,
      },
    });
    const claimADResult = await this.bundlerClient.waitForUserOperationReceipt({ hash: claimADHash });

    if (!claimADResult.success) {
      return [claimADResult];
    }

    const pairADCallData = await pairAftermarketDevice(args, this.kernelClient, this.config.environment);
    const pairADHash = await this.kernelClient.sendUserOperation({
      userOperation: {
        callData: pairADCallData as `0x${string}`,
      },
    });
    const pairADResult = await this.bundlerClient.waitForUserOperationReceipt({ hash: pairADHash });
    return [claimADResult, pairADResult];
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
}
