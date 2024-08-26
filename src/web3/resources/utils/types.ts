import { KERNEL_V2_VERSION_TYPE, KERNEL_V3_VERSION_TYPE } from "@zerodev/sdk/types";
import { EntryPoint } from "permissionless/types";
import { PrivateKeyAccount } from "viem";

export enum ContractType {
  STAKE,
  DIMO_REGISTRY,
  DIMO_TOKEN,
  AD_NFT,
  SD_NFT,
  MANUFACTURER_NFT,
  MULTICALL_3,
  VEHICLE_NFT,
}

export enum SupportedNetworks {
  AMOY,
  POLYGON,
}

export type ClientConfig = {
  network: SupportedNetworks;
  signer: PrivateKeyAccount;
  rpcUrl: string;
  paymasterUrl: string;
  bundlerUrl: string;
  entrypointAddress: EntryPoint;
  kernelVersion: KERNEL_V2_VERSION_TYPE | KERNEL_V3_VERSION_TYPE;
};

export type AbiAddressPair = {
  [index: string]: {
    [key in ContractType]?: {
      abi: any;
      address: string;
    };
  };
};

export type NetworkProvider = {
  [network: string]: string;
};

export type MintVehicleWithDeviceDefinition = {
  manufacturerNode: bigint;
  owner: `0x${string}`;
  deviceDefinitionID: string;
  attributeInfo: { attribute: string; info: string }[];
};
