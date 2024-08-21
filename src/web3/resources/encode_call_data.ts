import { encodeFunctionData, Hex, Address } from "viem";

type encodeCallDataArgs = {
  to: Address;
  value: bigint;
  data: `0x${string}`;
};

export function _batchEncodeCallData(args: encodeCallDataArgs[]): `0x${string}` {
  return encodeFunctionData({
    abi: [
      {
        inputs: [
          {
            internalType: "address[]",
            name: "dest",
            type: "address[]",
          },
          {
            internalType: "bytes[]",
            name: "func",
            type: "bytes[]",
          },
        ],
        name: "executeBatch",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "executeBatch",
    args: [args.map((a) => a.to), args.map((a) => a.data)],
  });
}

export function _singleEncodeCallData(args: encodeCallDataArgs): `0x${string}` {
  return encodeFunctionData({
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "dest",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "func",
            type: "bytes",
          },
        ],
        name: "execute",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "execute",
    args: [args.to, args.value, args.data],
  });
}
