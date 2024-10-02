import { Chain, Transport, encodeFunctionData } from "viem";
import { ContractType, ENVIRONMENT, KernelSignerConfig } from ":core/types/dimo.js";
import { CHAIN_ABI_MAPPING, ENV_MAPPING, ENV_NETWORK_MAPPING } from ":core/constants/mappings.js";
import { KernelAccountClient, KernelSmartAccount } from "@zerodev/sdk";
import { EntryPoint } from "permissionless/types";
import { CLAIM_AFTERMARKET_DEVICE } from ":core/constants/methods.js";
import { ClaimAftermarketdevice } from ":core/types/args.js";
import { polygonAmoy } from "viem/chains";
import { omit } from "lodash";
import { ethers } from "ethers";
import { TypeHashResponse } from ":core/types/responses.js";
import {
  ClaimAftermarketDeviceSign,
  AftermarketDeviceNode,
  Owner,
  SolidityTypeUint256,
  SolidityTypeAddress,
  DIMODomain,
  DIMODomainVersion,
} from ":core/constants/dimo.js";
import { PasskeyStamper } from "@turnkey/react-native-passkey-stamper";
import { GetUserOperationReceiptReturnType } from "permissionless";
import { KernelEncodeCallDataArgs } from "@zerodev/sdk/types";
import { executeTransaction } from ":core/transactions/execute.js";

export const claimAftermarketDeviceTypeHash = (
  aftermarketDeviceNode: bigint,
  owner: `0x${string}`,
  environment: string = "dev"
): TypeHashResponse => {
  const env = ENV_MAPPING.get(environment) ?? ENVIRONMENT.DEV;
  const chain = ENV_NETWORK_MAPPING.get(env) ?? polygonAmoy;
  const contracts = CHAIN_ABI_MAPPING[ENV_MAPPING.get(environment) ?? ENVIRONMENT.DEV].contracts;

  const domain = {
    name: DIMODomain,
    version: DIMODomainVersion,
    chainId: chain.id,
    verifyingContract: contracts[ContractType.DIMO_REGISTRY].address,
  };

  const types = {
    [ClaimAftermarketDeviceSign]: [
      { name: AftermarketDeviceNode, type: SolidityTypeUint256 },
      { name: Owner, type: SolidityTypeAddress },
    ],
  };

  const message = {
    aftermarketDeviceNode: aftermarketDeviceNode,
    owner: owner,
  };

  const hash = ethers.TypedDataEncoder.hash(omit(domain, "salt"), omit(types, "EIP712Domain"), message);

  return { hash, payload: { domain, types, message } };
};

export function claimAftermarketDeviceCallData(
  args: ClaimAftermarketdevice,
  environment: string = "dev"
): `0x${string}` {
  const contracts = CHAIN_ABI_MAPPING[ENV_MAPPING.get(environment) ?? ENVIRONMENT.DEV].contracts;
  return encodeFunctionData({
    abi: contracts[ContractType.DIMO_REGISTRY].abi,
    functionName: CLAIM_AFTERMARKET_DEVICE,
    args: [args.aftermarketDeviceNode, args.aftermarketDeviceSig],
  });
}

export const claimAftermarketDeviceTransaction = async (
  args: ClaimAftermarketdevice,
  subOrganizationId: string,
  walletAddress: string,
  passkeyStamper: PasskeyStamper,
  config: KernelSignerConfig
): Promise<GetUserOperationReceiptReturnType> => {
  const env = ENV_MAPPING.get(config.environment) ?? ENVIRONMENT.DEV;
  const contracts = CHAIN_ABI_MAPPING[env].contracts;

  const txData: KernelEncodeCallDataArgs = {
    callType: "call",
    to: contracts[ContractType.DIMO_REGISTRY].address,
    value: BigInt("0"),
    data: claimAftermarketDeviceCallData(args, config.environment),
  };

  const resp = await executeTransaction(subOrganizationId, walletAddress, txData, passkeyStamper, config);

  return resp;
};

export const claimAftermarketDevice = async (
  args: ClaimAftermarketdevice,
  client: KernelAccountClient<EntryPoint, Transport, Chain, KernelSmartAccount<EntryPoint, Transport, Chain>>,
  environment: string = "dev"
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
