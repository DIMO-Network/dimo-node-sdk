import { Chain, MulticallReturnType, PublicClient, Transport, encodeFunctionData } from "viem";
import { ContractType, ENVIRONMENT } from "../types/dimoTypes.js";
import { SEND_DIMO_TOKENS } from ":core/constants/methods.js";
import { KernelAccountClient, KernelSmartAccount } from "@zerodev/sdk";
import { EntryPoint } from "permissionless/types";
import { CHAIN_ABI_MAPPING, ENV_MAPPING } from ":core/constants/mappings.js";
import { SendDIMOTokens } from ":core/types/args.js";
import { PROCESSING_FEE_ADDR } from ":core/constants/contractAddrs.js";

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

// TODO(ae): make this use a paymaster
export async function sendDIMOTokensWithFee(
  args: SendDIMOTokens,
  client: PublicClient,
  environment: string = "prod"
): Promise<MulticallReturnType> {
  const contracts = CHAIN_ABI_MAPPING[ENV_MAPPING.get(environment) ?? ENVIRONMENT.DEV].contracts;
  const tokenContract = {
    address: contracts[ContractType.DIMO_TOKEN].address,
    abi: contracts[ContractType.DIMO_TOKEN].abi,
  };

  return await client.multicall({
    contracts: [
      {
        ...tokenContract,
        functionName: SEND_DIMO_TOKENS,
        args: [args.to, args.amount],
      },
      {
        ...tokenContract,
        functionName: SEND_DIMO_TOKENS,
        args: [PROCESSING_FEE_ADDR, BigInt(1)],
      },
    ],
  });
}
