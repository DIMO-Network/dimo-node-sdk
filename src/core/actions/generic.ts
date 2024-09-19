import { Chain, Transport, encodeFunctionData } from "viem";
import { KernelAccountClient, KernelSmartAccount } from "@zerodev/sdk";
import { EntryPoint } from "permissionless/types";
import { AbiAddressPair } from ":core/types/interface.js";

const unpackValues = (input: any): any[] => {
  if (typeof input === "object" && input !== null) {
    return Object.values(input).flatMap((value) => unpackValues(value));
  } else {
    return [input];
  }
};

export async function genericCallData(
  args: any,
  contractInfo: AbiAddressPair,
  functionName: string,
  client:
    | KernelAccountClient<EntryPoint, Transport, Chain, KernelSmartAccount<EntryPoint, Transport, Chain>>
    | undefined
): Promise<`0x${string}`> {
  const unpackedArgs = unpackValues(args);
  console.log("unpacked Args: ", unpackedArgs);

  if (!client) {
    return await encodeFunctionData({
      abi: contractInfo.abi,
      functionName: functionName,
      args: unpackedArgs,
    });
  }

  return await client.account.encodeCallData({
    to: contractInfo.address,
    value: BigInt(0),
    data: encodeFunctionData({
      abi: contractInfo.abi,
      functionName: functionName,
      args: unpackedArgs,
    }),
  });
}
