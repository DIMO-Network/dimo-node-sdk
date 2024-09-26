import { Chain, Transport, encodeFunctionData } from "viem";
import { ContractType, ENVIRONMENT } from ":core/types/dimoTypes.js";
import { CHAIN_ABI_MAPPING, ENV_MAPPING } from ":core/constants/mappings.js";
import { KernelAccountClient, KernelSmartAccount } from "@zerodev/sdk";
import { EntryPoint } from "permissionless/types";
import { CLAIM_AFTERMARKET_DEVICE, PAIR_AFTERMARKET_DEVICE } from ":core/constants/methods.js";
import { ClaimAftermarketdevice, PairAftermarketDevice } from ":core/types/args.js";

export const claimAftermarketDeviceCallData = async (
  args: ClaimAftermarketdevice,
  environment: string = "prod"
): Promise<`0x${string}`> => {
  const contracts = CHAIN_ABI_MAPPING[ENV_MAPPING.get(environment) ?? ENVIRONMENT.DEV].contracts;
  return encodeFunctionData({
    abi: contracts[ContractType.DIMO_REGISTRY].abi,
    functionName: CLAIM_AFTERMARKET_DEVICE,
    args: [args.aftermarketDeviceNode, args.aftermarketDeviceSig],
  });
};

export const pairAftermarketDeviceCallData = async (
  args: PairAftermarketDevice,
  environment: string = "prod"
): Promise<`0x${string}`> => {
  const contracts = CHAIN_ABI_MAPPING[ENV_MAPPING.get(environment) ?? ENVIRONMENT.DEV].contracts;
  return encodeFunctionData({
    abi: contracts[ContractType.DIMO_REGISTRY].abi,
    functionName: PAIR_AFTERMARKET_DEVICE,
    args: [args.aftermarketDeviceNode, args.vehicleNode],
  });
};

export const claimAftermarketDevice = async (
  args: ClaimAftermarketdevice,
  client: KernelAccountClient<EntryPoint, Transport, Chain, KernelSmartAccount<EntryPoint, Transport, Chain>>,
  environment: string = "prod"
): Promise<`0x${string}`> => {
  const contracts = CHAIN_ABI_MAPPING[ENV_MAPPING.get(environment) ?? ENVIRONMENT.DEV].contracts;
  return await client.account.encodeCallData({
    to: contracts[ContractType.DIMO_REGISTRY].address,
    value: BigInt(0),
    data: encodeFunctionData({
      abi: contracts[ContractType.DIMO_REGISTRY].abi,
      functionName: CLAIM_AFTERMARKET_DEVICE,
      args: [args.aftermarketDeviceNode, args.aftermarketDeviceSig],
    }),
  });
};

export const pairAftermarketDevice = async (
  args: PairAftermarketDevice,
  client: KernelAccountClient<EntryPoint, Transport, Chain, KernelSmartAccount<EntryPoint, Transport, Chain>>,
  environment: string = "prod"
): Promise<`0x${string}`> => {
  const contracts = CHAIN_ABI_MAPPING[ENV_MAPPING.get(environment) ?? ENVIRONMENT.DEV].contracts;
  return await client.account.encodeCallData({
    to: contracts[ContractType.DIMO_REGISTRY].address,
    value: BigInt(0),
    data: encodeFunctionData({
      abi: contracts[ContractType.DIMO_REGISTRY].abi,
      functionName: PAIR_AFTERMARKET_DEVICE,
      args: [args.aftermarketDeviceNode, args.vehicleNode],
    }),
  });
};
