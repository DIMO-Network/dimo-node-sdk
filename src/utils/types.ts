import { KernelAccountClient, KernelSmartAccount } from "@zerodev/sdk";
import { KERNEL_V2_VERSION_TYPE, KERNEL_V3_VERSION_TYPE } from "@zerodev/sdk/types";
import { EntryPoint } from "permissionless/types";
import { Chain, PrivateKeyAccount, Transport } from "viem";

export type NetworkProvider = {
  [network: string]: string;
};

export type AbiAddressPair = {
  [index: string]: {
    [key in ContractType]?: {
      abi: any;
      address: string;
    };
  };
};

export enum ContractType {
  DIMO_CREDIT,
  DIMO_REGISTRY,
  DIMO_TOKEN,
}

export enum SupportedNetworks {
  AMOY,
  POLYGON,
}

export type MintVehicleWithDeviceDefinition = {
  manufacturerNode: bigint;
  owner: `0x${string}`;
  deviceDefinitionID: string;
  attributeInfo: { attribute: string; info: string }[];
};

export type ClientConfig = {
  kernelClient: KernelAccountClient<EntryPoint, Transport, Chain, KernelSmartAccount<EntryPoint>>;
  // kernelClient: KernelSmartAccount<EntryPoint, Transport, Chain>;
};
