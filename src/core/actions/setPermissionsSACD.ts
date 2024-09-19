import { Chain, Transport, encodeFunctionData } from "viem";
import {
  ContractToMapping,
  ContractType,
  ENVIRONMENT,
  SetPermissionsSACD,
  SetVehiclePermissions,
} from "../types/interface.js";
import { CHAIN_ABI_MAPPING, ENV_MAPPING, SET_PERMISSIONS_SACD } from ":core/constants.js";
import { KernelAccountClient, KernelSmartAccount } from "@zerodev/sdk";
import { EntryPoint } from "permissionless/types";

export async function setVehiclePermissions(
  args: SetVehiclePermissions,
  client: KernelAccountClient<EntryPoint, Transport, Chain, KernelSmartAccount<EntryPoint, Transport, Chain>>,
  environment: string = "prod"
): Promise<`0x${string}`> {
  const contracts = CHAIN_ABI_MAPPING[ENV_MAPPING.get(environment) ?? ENVIRONMENT.DEV].contracts;
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
