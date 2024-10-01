import { Chain, Transport, encodeFunctionData } from "viem";
import { ContractType, ENVIRONMENT } from "../types/dimoTypes.js";
import { SEND_DIMO_TOKENS } from ":core/constants/methods.js";
import { KernelAccountClient, KernelSmartAccount } from "@zerodev/sdk";
import { EntryPoint } from "permissionless/types";
import { CHAIN_ABI_MAPPING, ENV_MAPPING } from ":core/constants/mappings.js";
import { SendDIMOTokens } from ":core/types/args.js";
// import { airdropERC20 } from "thirdweb/extensions/airdrop";
// import { sendTransaction } from "thirdweb";

export async function sendDIMOTokensCallData(
  args: SendDIMOTokens,
  environment: string = "dev"
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
  environment: string = "dev"
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

// export async function erc20Airdrop(
//   args: SendDIMOTokens[],
//   account: KernelAccountClient<EntryPoint, Transport, Chain, KernelSmartAccount<EntryPoint, Transport, Chain>>,
//   environment: string = "dev"
// ): Promise<`0x${string}`> {
//   const contracts = CHAIN_ABI_MAPPING[ENV_MAPPING.get(environment) ?? ENVIRONMENT.DEV].contracts;
//   const tokenContract = {
//     address: contracts[ContractType.DIMO_TOKEN].address,
//     abi: contracts[ContractType.DIMO_TOKEN].abi,
//   };

//   const transaction = await airdropERC20({
//     // @ts-ignore
//     contract: tokenContract.abi,
//     tokenAddress: tokenContract.address,
//     // @ts-ignore
//     contents: args.map((arg) => ({
//       recipient: arg.to,
//       amount: arg.amount,
//     })),
//   });

//   const res = await sendTransaction({ transaction, account });

//   console.log(res);

//   return res.transactionHash;
// }
