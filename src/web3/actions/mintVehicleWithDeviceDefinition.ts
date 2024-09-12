import { encodeFunctionData, Chain, Transport } from "viem";
import { CHAIN_ABI_MAPPING, MINT_VEHICLE_WITH_DEVICE_DEFINITION } from "../../utils/constants";
import { KernelAccountClient, KernelSmartAccount } from "@zerodev/sdk";
import { ContractType, ENVIRONMENT, MintVehicleWithDeviceDefinition } from "../../utils/types";
import { EntryPoint } from "permissionless/types";

export async function mintVehicleWithDeviceDefinition(
  args: MintVehicleWithDeviceDefinition,
  client: KernelAccountClient<EntryPoint, Transport, Chain | undefined, KernelSmartAccount<EntryPoint>>,
  env: ENVIRONMENT = ENVIRONMENT.PROD
): Promise<`0x${string}`> {
  const contracts = CHAIN_ABI_MAPPING[env].contracts;
  return await client.account.encodeCallData({
    to: contracts[ContractType.DIMO_REGISTRY].address,
    value: BigInt(0),
    data: encodeFunctionData({
      abi: contracts[ContractType.DIMO_REGISTRY].abi,
      functionName: MINT_VEHICLE_WITH_DEVICE_DEFINITION,
      args: [args.manufacturerNode, args.owner, args.deviceDefinitionID, args.attributeInfo],
    }),
  });
}
