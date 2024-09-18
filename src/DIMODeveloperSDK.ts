import { encodeFunctionData } from "viem";
import {
  ContractToMapping,
  ContractType,
  ENVIRONMENT,
  MintVehicleWithDeviceDefinition,
  SetPermissionsSACD,
  SetVehiclePermissions,
} from "./core/types/interface";
import { CHAIN_ABI_MAPPING, MINT_VEHICLE_WITH_DEVICE_DEFINITION, SET_PERMISSIONS_SACD } from ":core/constants";
// import { KernelAccountClient, KernelSmartAccount } from "@zerodev/sdk";
// import { EntryPoint } from "permissionless";

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
  client: any,
  env: ENVIRONMENT = ENVIRONMENT.DEV
): Promise<`0x${string}`> => {
  const contracts = CHAIN_ABI_MAPPING[env].contracts;
  return await client.account.encodeCallData({
    abi: contracts[ContractType.DIMO_REGISTRY].address,
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
  client: any,
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
  client: any,
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
