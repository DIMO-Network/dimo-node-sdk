import { Chain, Transport, encodeFunctionData } from "viem";
import { ContractType, ENVIRONMENT, KernelSignerConfig } from ":core/types/dimo.js";
import { CHAIN_ABI_MAPPING, ENV_MAPPING } from ":core/constants/mappings.js";
import { KernelAccountClient, KernelSmartAccount } from "@zerodev/sdk";
import { EntryPoint } from "permissionless/types";
import { TRANSFER_VEHICLE_AND_AFTERMARKET_DEVICE_IDS } from ":core/constants/methods.js";
import { TransferVehicleAndAftermarketDeviceIDs } from ":core/types/args.js";
import { PasskeyStamper } from "@turnkey/react-native-passkey-stamper";
import { GetUserOperationReceiptReturnType } from "permissionless";
import { KernelEncodeCallDataArgs } from "@zerodev/sdk/types";
import { executeTransaction } from ":core/transactions/execute.js";

export function transferVehicleAndAftermarketDeviceIDsCallData(
  args: TransferVehicleAndAftermarketDeviceIDs,
  environment: string = "dev"
): `0x${string}` {
  const contracts = CHAIN_ABI_MAPPING[ENV_MAPPING.get(environment) ?? ENVIRONMENT.DEV].contracts;
  return encodeFunctionData({
    abi: contracts[ContractType.DIMO_FORWARDER].abi,
    functionName: TRANSFER_VEHICLE_AND_AFTERMARKET_DEVICE_IDS,
    args: [args.vehicleIds, args.aftermarketDeviceIds, args.to],
  });
}

export const transferVehicleAndAftermarketDeviceIDsTransaction = async (
  args: TransferVehicleAndAftermarketDeviceIDs,
  subOrganizationId: string,
  walletAddress: string,
  passkeyStamper: PasskeyStamper,
  config: KernelSignerConfig
): Promise<GetUserOperationReceiptReturnType> => {
  const env = ENV_MAPPING.get(config.environment) ?? ENVIRONMENT.DEV;
  const contracts = CHAIN_ABI_MAPPING[env].contracts;

  const txData: KernelEncodeCallDataArgs = {
    callType: "call",
    to: contracts[ContractType.DIMO_FORWARDER].address,
    value: BigInt("0"),
    data: transferVehicleAndAftermarketDeviceIDsCallData(args, config.environment),
  };

  const resp = await executeTransaction(subOrganizationId, walletAddress, txData, passkeyStamper, config);

  return resp;
};

export const transferVehicleAndAftermarketDeviceIDs = async (
  args: TransferVehicleAndAftermarketDeviceIDs,
  client: KernelAccountClient<EntryPoint, Transport, Chain, KernelSmartAccount<EntryPoint, Transport, Chain>>,
  environment: string = "dev"
): Promise<`0x${string}`> => {
  const contracts = CHAIN_ABI_MAPPING[ENV_MAPPING.get(environment) ?? ENVIRONMENT.DEV].contracts;
  return await client.account.encodeCallData({
    to: contracts[ContractType.DIMO_FORWARDER].address,
    value: BigInt(0),
    data: encodeFunctionData({
      abi: contracts[ContractType.DIMO_FORWARDER].abi,
      functionName: TRANSFER_VEHICLE_AND_AFTERMARKET_DEVICE_IDS,
      args: [args.vehicleIds, args.aftermarketDeviceIds, args.to],
    }),
  });
};
