import { Chain, Transport, encodeFunctionData } from "viem";
import { ContractType, ENVIRONMENT } from ":core/types/dimoTypes.js";
import { CHAIN_ABI_MAPPING, ENV_MAPPING } from ":core/constants/mappings.js";
import { KernelAccountClient, KernelSmartAccount } from "@zerodev/sdk";
import { EntryPoint } from "permissionless/types";
import { MINT_VEHICLE_WITH_DEVICE_DEFINITION } from ":core/constants/methods.js";
import { MintVehicleWithDeviceDefinition } from ":core/types/args.js";

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
