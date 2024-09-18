import { Chain, Transport, encodeFunctionData } from "viem";
import {
  ContractToMapping,
  ContractType,
  ENVIRONMENT,
  MintVehicleWithDeviceDefinition,
  SendDIMOTokens,
  SetPermissionsSACD,
  SetVehiclePermissions,
} from "./core/types/interface.js";
import {
  CHAIN_ABI_MAPPING,
  MINT_VEHICLE_WITH_DEVICE_DEFINITION,
  SEND_DIMO_TOKENS,
  SET_PERMISSIONS_SACD,
} from ":core/constants.js";
import { KernelAccountClient, KernelSmartAccount } from "@zerodev/sdk";
import { EntryPoint } from "permissionless/types";

export const mintVehicleCallData = async (
  args: MintVehicleWithDeviceDefinition,
  env: ENVIRONMENT = ENVIRONMENT.DEV
): Promise<`0x${string}`> => {
  const contracts = CHAIN_ABI_MAPPING[env].contracts;
  return encodeFunctionData({
    abi: contracts[ContractType.DIMO_REGISTRY].abi,
    functionName: MINT_VEHICLE_WITH_DEVICE_DEFINITION,
    args: [args.manufacturerNode, args.owner, args.deviceDefinitionID, args.attributeInfo],
  });
};

export const mintVehicleWithDeviceDefinition = async (
  args: MintVehicleWithDeviceDefinition,
  client: KernelAccountClient<EntryPoint, Transport, Chain, KernelSmartAccount<EntryPoint, Transport, Chain>>,
  env: ENVIRONMENT = ENVIRONMENT.DEV
): Promise<`0x${string}`> => {
  const contracts = CHAIN_ABI_MAPPING[env].contracts;
  return await client.account.encodeCallData({
    to: contracts[ContractType.DIMO_REGISTRY].address,
    value: BigInt(0),
    data: encodeFunctionData({
      abi: contracts[ContractType.DIMO_REGISTRY].abi,
      functionName: MINT_VEHICLE_WITH_DEVICE_DEFINITION,
      args: [args.manufacturerNode, args.owner, args.deviceDefinitionID, args.attributeInfo],
    }),
  });
};

export async function setVehiclePermissions(
  args: SetVehiclePermissions,
  client: KernelAccountClient<EntryPoint, Transport, Chain, KernelSmartAccount<EntryPoint, Transport, Chain>>,
  env: ENVIRONMENT = ENVIRONMENT.DEV
): Promise<`0x${string}`> {
  const contracts = CHAIN_ABI_MAPPING[env].contracts;
  return await setPermissionsSACD(
    {
      asset: contracts[ContractType.DIMO_REGISTRY].address,
      tokenId: args.tokenId,
      grantee: args.grantee,
      permissions: args.permissions,
      expiration: args.expiration,
      source: args.source,
    },
    client,
    contracts
  );
}

export async function setPermissionsSACD(
  args: SetPermissionsSACD,
  client: KernelAccountClient<EntryPoint, Transport, Chain, KernelSmartAccount<EntryPoint, Transport, Chain>>,
  contracts: ContractToMapping
): Promise<`0x${string}`> {
  return await client.account.encodeCallData({
    to: contracts[ContractType.DIMO_SACD].address,
    value: BigInt(0),
    data: encodeFunctionData({
      abi: contracts[ContractType.DIMO_SACD].abi,
      functionName: SET_PERMISSIONS_SACD,
      args: [args.asset, args.tokenId, args.grantee, args.permissions, args.expiration, args.source],
    }),
  });
}

export async function sendDIMOTokensCallData(
  args: SendDIMOTokens,
  env: ENVIRONMENT = ENVIRONMENT.DEV
): Promise<`0x${string}`> {
  const contracts = CHAIN_ABI_MAPPING[env].contracts;
  return await encodeFunctionData({
    abi: contracts[ContractType.DIMO_TOKEN].abi,
    functionName: SEND_DIMO_TOKENS,
    args: [args.to, args.amount],
  });
}

export async function sendDIMOTokens(
  args: SendDIMOTokens,
  client: KernelAccountClient<EntryPoint, Transport, Chain, KernelSmartAccount<EntryPoint, Transport, Chain>>,
  env: ENVIRONMENT = ENVIRONMENT.DEV
): Promise<`0x${string}`> {
  const contracts = CHAIN_ABI_MAPPING[env].contracts;
  return await client.account.encodeCallData({
    to: contracts[ContractType.DIMO_TOKEN].address,
    value: BigInt(0),
    data: encodeFunctionData({
      abi: contracts[ContractType.DIMO_TOKEN].abi,
      functionName: SEND_DIMO_TOKENS,
      args: [args.to, args.amount],
    }),
  });
}
