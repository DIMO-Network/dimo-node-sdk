import { encodeFunctionData, Chain, Transport } from "viem";
import { SET_PERMISSIONS_SACD } from "../../utils/constants";
import { KernelAccountClient, KernelSmartAccount } from "@zerodev/sdk";
import { ContractToMapping, ContractType, SetPermissionsSACD } from "../../utils/types";
import { EntryPoint } from "permissionless/types";

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
