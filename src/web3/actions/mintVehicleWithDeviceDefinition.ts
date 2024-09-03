import { encodeFunctionData, Chain, Transport } from "viem";
import { MINT_VEHICLE_WITH_DEVICE_DEFINITION } from "../../utils/constants";
import { KernelAccountClient, KernelSmartAccount } from "@zerodev/sdk";
import { ContractToMapping, ContractType, MintVehicleWithDeviceDefinition } from "../../utils/types";
import { EntryPoint } from "permissionless/types";

export async function mintVehicleWithDeviceDefinition(
  args: MintVehicleWithDeviceDefinition,
  client: KernelAccountClient<EntryPoint, Transport, Chain | undefined, KernelSmartAccount<EntryPoint>>,
  contract_address: `0x${string}`,
  contracts: ContractToMapping
): Promise<`0x${string}`> {
  return await client.account.encodeCallData({
    to: contract_address,
    value: BigInt(0),
    data: encodeFunctionData({
      abi: contracts[ContractType.DIMO_REGISTRY].abi,
      functionName: MINT_VEHICLE_WITH_DEVICE_DEFINITION,
      args: [args.manufacturerNode, args.owner, args.deviceDefinitionID, args.attributeInfo],
    }),
  });
}
