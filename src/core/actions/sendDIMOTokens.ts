import { Chain, Transport, encodeFunctionData } from "viem";
import { ContractType, ENVIRONMENT, SendDIMOTokens } from "../types/interface.js";
import { CHAIN_ABI_MAPPING, ENV_MAPPING, SEND_DIMO_TOKENS } from ":core/constants.js";
import { KernelAccountClient, KernelSmartAccount } from "@zerodev/sdk";
import { EntryPoint } from "permissionless/types";

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
