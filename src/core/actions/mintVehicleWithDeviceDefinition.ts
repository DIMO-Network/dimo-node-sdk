import { Chain, Transport, encodeFunctionData } from "viem";
import { ContractType, ENVIRONMENT, MintVehicleWithDeviceDefinition } from "../types/interface.js";
import { CHAIN_ABI_MAPPING, ENV_MAPPING, MINT_VEHICLE_WITH_DEVICE_DEFINITION } from ":core/constants.js";
import { KernelAccountClient, KernelSmartAccount } from "@zerodev/sdk";
import { EntryPoint } from "permissionless/types";

export const mintVehicleCallData = async (
  args: MintVehicleWithDeviceDefinition,
  environment: string = "prod"
): Promise<`0x${string}`> => {
  const contracts = CHAIN_ABI_MAPPING[ENV_MAPPING.get(environment) ?? ENVIRONMENT.DEV].contracts;
  return encodeFunctionData({
    abi: contracts[ContractType.DIMO_REGISTRY].abi,
    functionName: MINT_VEHICLE_WITH_DEVICE_DEFINITION,
    args: [args.manufacturerNode, args.owner, args.deviceDefinitionID, args.attributeInfo],
  });
};

export const mintVehicleWithDeviceDefinition = async (
  args: MintVehicleWithDeviceDefinition,
  client: KernelAccountClient<EntryPoint, Transport, Chain, KernelSmartAccount<EntryPoint, Transport, Chain>>,
  environment: string = "prod"
): Promise<`0x${string}`> => {
  const contracts = CHAIN_ABI_MAPPING[ENV_MAPPING.get(environment) ?? ENVIRONMENT.DEV].contracts;
  return await client.account.encodeCallData({
    to: contracts[ContractType.DIMO_REGISTRY].address,
    value: BigInt(0),
    data: encodeFunctionData({
      abi: contracts[ContractType.DIMO_REGISTRY].abi,
      functionName: MINT_VEHICLE_WITH_DEVICE_DEFINITION,
      args: [args.manufacturerNode, args.owner, args.deviceDefinitionID, args.attributeInfo],
    }),
  });
};
