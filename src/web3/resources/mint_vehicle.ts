import { encodeFunctionData, Hex, Address } from "viem";
import { _singleEncodeCallData } from "./encode_call_data";

const DIMO_REGISTRY_CONTRACT_AMOY = "0x5eAA326fB2fc97fAcCe6A79A304876daD0F2e96c";

type MintVehicleOptions = {
  manufacturerNode: bigint;
  owner: `0x${string}`;
  deviceDefinitionID: string;
  attributeInfo: { attribute: string; info: string }[];
  signature: Hex;
};

function _mintVehicleUserOperation({
  manufacturerNode,
  owner,
  deviceDefinitionID,
  attributeInfo,
  signature,
}: MintVehicleOptions): Hex {
  const encodedFuncData = _encodeMintVehicle({ manufacturerNode, owner, deviceDefinitionID, attributeInfo, signature });
  return _singleEncodeCallData({
    to: DIMO_REGISTRY_CONTRACT_AMOY,
    value: 0n,
    data: encodedFuncData,
  });
}

function _encodeMintVehicle({
  manufacturerNode,
  owner,
  deviceDefinitionID,
  attributeInfo,
  signature,
}: MintVehicleOptions): Hex {
  return encodeFunctionData({
    abi: [
      {
        inputs: [
          {
            internalType: "uint256",
            name: "manufacturerNode",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "string",
            name: "deviceDefinitionId",
            type: "string",
          },
          {
            components: [
              {
                internalType: "string",
                name: "attribute",
                type: "string",
              },
              {
                internalType: "string",
                name: "info",
                type: "string",
              },
            ],
            internalType: "struct AttributeInfoPair[]",
            name: "attrInfo",
            type: "tuple[]",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
        ],
        name: "mintVehicleWithDeviceDefinitionSign",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "mintVehicleWithDeviceDefinitionSign",
    args: [manufacturerNode, owner, deviceDefinitionID, attributeInfo, signature],
  });
}
