import { encodeFunctionData, Chain, Transport } from "viem";
import { CHAIN_ABI_MAPPING, SET_PERMISSIONS_SACD } from "../../utils/constants";
import { KernelAccountClient, KernelSmartAccount } from "@zerodev/sdk";
import {
  ContractToMapping,
  ContractType,
  ENVIRONMENT,
  SetPermissionsSACD,
  SetVehiclePermissions,
} from "../../utils/types";
import { EntryPoint } from "permissionless/types";

export async function setVehiclePermissions(
  args: SetVehiclePermissions,
  client: KernelAccountClient<EntryPoint, Transport, Chain | undefined, KernelSmartAccount<EntryPoint>>,
  env: ENVIRONMENT = ENVIRONMENT.PROD
): Promise<`0x${string}`> {
  const contracts = CHAIN_ABI_MAPPING[env].contracts;
  return await setPermissionsSACD(
    {
      asset: contracts[ContractType.DIMO_VEHICLE_ID].address,
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
  client: KernelAccountClient<EntryPoint, Transport, Chain | undefined, KernelSmartAccount<EntryPoint>>,
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
