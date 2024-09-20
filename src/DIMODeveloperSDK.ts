import { CHAIN_ABI_MAPPING, ENTRYPOINT, ENV_MAPPING, ENV_NETWORK_MAPPING } from ":core/constants.js";
import {
  ContractType,
  ENVIRONMENT,
  MintVehicleWithDeviceDefinition,
  SendDIMOTokens,
  SetVehiclePermissions,
} from ":core/types/interface.js";
import { KERNEL_V2_4 } from "@zerodev/sdk/constants";
import { KERNEL_V2_VERSION_TYPE } from "@zerodev/sdk/types";
import { Chain, PublicClient, Transport, createPublicClient, http, parseEventLogs } from "viem";
import { kernelClientFromPrivateKey } from "./index.js";
import { KernelAccountClient, KernelSmartAccount } from "@zerodev/sdk";
import { EntryPoint } from "permissionless/types";
import { BundlerClient, GetUserOperationReceiptReturnType, createBundlerClient } from "permissionless";
import { mintVehicleWithDeviceDefinition } from ":core/actions/mintVehicleWithDeviceDefinition.js";
import { setVehiclePermissions } from ":core/actions/setPermissionsSACD.js";
import { sendDIMOTokens } from ":core/actions/sendDIMOTokens.js";
import { VehicleNodeMintedWithDeviceDefinition } from ":core/types/eventLogs.js";

export class KernelSigner {
  publicClient: PublicClient;
  chain: Chain | undefined;
  bundlerClient: BundlerClient<EntryPoint, Chain | undefined>;
  kernelClient: KernelAccountClient<EntryPoint, Transport, Chain, KernelSmartAccount<EntryPoint, Transport, Chain>>;
  environment: string;

  constructor(environment: string = "prod", rpcURL: string) {
    this.environment = environment;
    this.chain = ENV_NETWORK_MAPPING.get(ENV_MAPPING.get(this.environment) ?? ENVIRONMENT.DEV);
    this.publicClient = createPublicClient({
      transport: http(rpcURL),
      chain: this.chain,
    });
  }

  public async connectKernelClient(
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

  // TODO-- need to update this to have real defaults
  // we can only set perms on vehicles owned by the address making the call
  public async mintVehicleAndSetDefaultPerms(
    args: MintVehicleWithDeviceDefinition
  ): Promise<GetUserOperationReceiptReturnType> {
    const mintVehicleCallData = await mintVehicleWithDeviceDefinition(args, this.kernelClient, this.environment);
    const userOpHashMint = await this.kernelClient.sendUserOperation({
      userOperation: {
        callData: mintVehicleCallData as `0x${string}`,
      },
    });
    const txResultMint = await this.bundlerClient.waitForUserOperationReceipt({ hash: userOpHashMint });

    const contracts = CHAIN_ABI_MAPPING[ENV_MAPPING.get(this.environment) ?? ENVIRONMENT.DEV].contracts;
    const log = parseEventLogs({
      abi: contracts[ContractType.DIMO_REGISTRY].abi,
      logs: txResultMint.logs,
      eventName: "VehicleNodeMintedWithDeviceDefinition",
    })[0];

    if (!log) {
      throw new Error("No event logs found");
    }

    const event = log.args as VehicleNodeMintedWithDeviceDefinition;
    const setVehiclePermsCallData = await setVehiclePermissions(
      {
        tokenId: event.vehicleId,
        permissions: BigInt(4091),
        grantee: this.kernelClient.account.address,
        expiration: BigInt(Math.floor(new Date().setFullYear(new Date().getFullYear() + 1) / 1000)),
        source: "default-string",
      },
      this.kernelClient,
      this.environment
    );

    const userOpHashPerms = await this.kernelClient.sendUserOperation({
      userOperation: {
        callData: setVehiclePermsCallData as `0x${string}`,
      },
    });
    const txResultPerms = await this.bundlerClient.waitForUserOperationReceipt({ hash: userOpHashPerms });

    return [txResultMint, txResultPerms];
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
}
