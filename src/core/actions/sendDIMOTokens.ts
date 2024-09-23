import { Chain, Transport, encodeFunctionData } from "viem";
import { ContractType, ENVIRONMENT } from "../types/dimoTypes.js";
import { SEND_DIMO_TOKENS } from ":core/constants/methods.js";
import { KernelAccountClient, KernelSmartAccount } from "@zerodev/sdk";
import { EntryPoint } from "permissionless/types";
import { CHAIN_ABI_MAPPING, ENV_MAPPING } from ":core/constants/mappings.js";
import { SendDIMOTokens } from ":core/types/args.js";

export async function sendDIMOTokensCallData(
  args: SendDIMOTokens,
  environment: string = "prod"
): Promise<`0x${string}`> {
  const contracts = CHAIN_ABI_MAPPING[ENV_MAPPING.get(environment) ?? ENVIRONMENT.DEV].contracts;
  return await encodeFunctionData({
    abi: contracts[ContractType.DIMO_TOKEN].abi,
    functionName: SEND_DIMO_TOKENS,
    args: [args.to, args.amount],
  });
}

export async function sendDIMOTokens(
  args: SendDIMOTokens,
  client: KernelAccountClient<EntryPoint, Transport, Chain, KernelSmartAccount<EntryPoint, Transport, Chain>>,
  environment: string = "prod"
): Promise<`0x${string}`> {
  const contracts = CHAIN_ABI_MAPPING[ENV_MAPPING.get(environment) ?? ENVIRONMENT.DEV].contracts;
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
