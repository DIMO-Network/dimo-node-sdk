import { Chain, Transport, encodeFunctionData } from "viem";
import { ContractToMapping, ContractType, ENVIRONMENT, KernelConfig } from ":core/types/dimo.js";
import { KernelAccountClient, KernelSmartAccount } from "@zerodev/sdk";
import { EntryPoint } from "permissionless/types";
import { CHAIN_ABI_MAPPING, ENV_MAPPING } from ":core/constants/mappings.js";
import { SET_PERMISSIONS_SACD } from ":core/constants/methods.js";
import { SetPermissionsSACD, SetVehiclePermissions } from ":core/types/args.js";
import { PasskeyStamper } from "@turnkey/react-native-passkey-stamper";
import { GetUserOperationReceiptReturnType } from "permissionless";
import { KernelEncodeCallDataArgs } from "@zerodev/sdk/types";
import { executeTransaction } from ":core/transactions/execute.js";

export async function setVehiclePermissions(
  args: SetVehiclePermissions,
  client: KernelAccountClient<EntryPoint, Transport, Chain, KernelSmartAccount<EntryPoint, Transport, Chain>>,
  environment: string = "prod"
): Promise<`0x${string}`> {
  const contracts = CHAIN_ABI_MAPPING[ENV_MAPPING.get(environment) ?? ENVIRONMENT.DEV].contracts;
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

export function sacdCallData(args: SetPermissionsSACD, environment: string = "prod"): `0x${string}` {
  const contracts = CHAIN_ABI_MAPPING[ENV_MAPPING.get(environment) ?? ENVIRONMENT.DEV].contracts;
  return encodeFunctionData({
    abi: contracts[ContractType.DIMO_SACD].abi,
    functionName: SET_PERMISSIONS_SACD,
    args: [args.asset, args.tokenId, args.grantee, args.permissions, args.expiration, args.source],
  });
}

export const setVehiclePermissionsTransaction = async (
  args: SetVehiclePermissions,
  subOrganizationId: string,
  walletAddress: string,
  passkeyStamper: PasskeyStamper,
  config: KernelConfig
): Promise<GetUserOperationReceiptReturnType> => {
  const env = ENV_MAPPING.get(config.environment) ?? ENVIRONMENT.DEV;
  const contracts = CHAIN_ABI_MAPPING[env].contracts;

  const sacdArgs = args as SetPermissionsSACD;
  sacdArgs.asset = contracts[ContractType.DIMO_VEHICLE_ID].address;

  const txData: KernelEncodeCallDataArgs = {
    callType: "call",
    to: contracts[ContractType.DIMO_SACD].address,
    value: BigInt("0"),
    data: sacdCallData(sacdArgs, config.environment),
  };

  const resp = await executeTransaction(subOrganizationId, walletAddress, txData, passkeyStamper, config);

  return resp;
};
