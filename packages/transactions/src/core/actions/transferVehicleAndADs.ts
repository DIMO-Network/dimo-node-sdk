import {
  Account,
  Address,
  Chain,
  ParseAccount,
  PublicClient,
  RpcSchema,
  Transport,
  WalletClient,
  encodeFunctionData,
} from "viem";
import { ContractType, ENVIRONMENT, KernelConfig } from ":core/types/dimo.js";
import { CHAIN_ABI_MAPPING, ENV_MAPPING, ENV_NETWORK_MAPPING } from ":core/constants/mappings.js";
import { KernelAccountClient, KernelSmartAccount } from "@zerodev/sdk";
import { EntryPoint } from "permissionless/types";
import { TRANSFER_VEHICLE_AND_AFTERMARKET_DEVICE_IDS } from ":core/constants/methods.js";
import { TransferVehicleAndAftermarketDeviceIDs } from ":core/types/args.js";
import { PasskeyStamper } from "@turnkey/react-native-passkey-stamper";
import { GetUserOperationReceiptReturnType } from "permissionless";
import { KernelEncodeCallDataArgs } from "@zerodev/sdk/types";
import { executeTransaction } from ":core/transactions/execute.js";
import { DIMODomain, DIMODomainVersion } from ":core/constants/dimo.js";
import { polygonAmoy } from "viem/chains";

export const transferVehiclesAndAftermarketDeviceIDsTypeHash = (
  vehicleIds: BigInt[],
  aftermarketDeviceIds: BigInt[],
  to: `0x${string}`,
  environment: string = "prod"
): any[] => {
  const env = ENV_MAPPING.get(environment) ?? ENVIRONMENT.DEV;
  const chain = ENV_NETWORK_MAPPING.get(env) ?? polygonAmoy;
  const contracts = CHAIN_ABI_MAPPING[ENV_MAPPING.get(environment) ?? ENVIRONMENT.DEV].contracts;

  const domain = {
    name: DIMODomain,
    version: DIMODomainVersion,
    chainId: chain.id,
    verifyingContract: contracts[ContractType.DIMO_FORWARDER].address,
  };

  const types = {
    ["transferVehicleAndAftermarketDeviceIds"]: [
      { name: "vehicleIds", type: "uint256[]" },
      { name: "aftermarketDeviceIds", type: "uint256[]" },
      { name: "to", type: "address" },
    ],
  };

  const message = {
    vehicleIds: vehicleIds,
    aftermarketDeviceIds: aftermarketDeviceIds,
    to: to,
  };

  // const hash = ethers.TypedDataEncoder.hash(omit(domain, "salt"), omit(types, "EIP712Domain"), message);

  return [domain, types, message];
};

export function transferVehicleAndAftermarketDeviceIDsCallData(
  args: TransferVehicleAndAftermarketDeviceIDs,
  environment: string = "prod"
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
  config: KernelConfig
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
  environment: string = "prod"
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

export async function transferVehicleAndAftermarketDeviceIDsFromAccount(
  args: TransferVehicleAndAftermarketDeviceIDs,
  walletClient: WalletClient<Transport, Chain, ParseAccount<Account | Address>, RpcSchema>,
  publicClient: PublicClient,
  environment: string = "prod"
): Promise<`0x${string}`> {
  const contracts = CHAIN_ABI_MAPPING[ENV_MAPPING.get(environment) ?? ENVIRONMENT.DEV].contracts;

  const { request } = await publicClient.simulateContract({
    address: contracts[ContractType.DIMO_FORWARDER].address,
    abi: contracts[ContractType.DIMO_FORWARDER].abi,
    functionName: TRANSFER_VEHICLE_AND_AFTERMARKET_DEVICE_IDS,
    args: [args.vehicleIds, args.aftermarketDeviceIds, args.to],
    account: walletClient.account,
  });

  const txHash = await walletClient.writeContract(request);
  return txHash;
}
