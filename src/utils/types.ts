import { KERNEL_V2_VERSION_TYPE, KERNEL_V3_VERSION_TYPE } from "@zerodev/sdk/types";
import { EntryPoint } from "permissionless/types";
import { Chain, PrivateKeyAccount, PublicClient } from "viem";

export enum ContractType {
  DIMO_CREDIT,
  DIMO_REGISTRY,
  VEHICLE_TOKEN,
}

export enum SupportedNetworks {
  AMOY,
  POLYGON,
}

export enum ENVIRONMENT {
  PROD,
  DEV,
}

export enum DIMO_APIs {
  ATTESTATION,
  AUTH,
  IDENTITY,
  DEVICES,
  DEVICE_DATA,
  DEVICE_DEFINITIONS,
  EVENTS,
  TELEMETRY,
  TOKEN_EXCHANGE,
  TRIPS,
  USER,
  VALUATIONS,
  VEHICLE_SIGNAL_DECODING,
}

export type API_BY_ENV = {
  [key in ENVIRONMENT]: {
    [key in DIMO_APIs]?: {
      url: string;
    };
  };
};

export type MintVehicleWithDeviceDefinition = {
  manufacturerNode: bigint;
  owner: `0x${string}`;
  deviceDefinitionID: string;
  attributeInfo: { attribute: string; info: string }[];
};

export type NetworkProvider = {
  [network: string]: string;
};

export type AbiAddressPair = {
  abi: any;
  address: `0x${string}`;
};

export type ContractToMapping = {
  [key in ContractType]: AbiAddressPair;
};

export type ChainInfos = {
  contracts: ContractToMapping;
};

export type AllChainInfos = {
  [key in SupportedNetworks]: ChainInfos;
};

export type connectPasskeyParams = {
  passkeyName: string;
  passkeyServerUrl: string;
};

export type connectPrivateKeyParams = {
  privateKey: `0x${string}`;
};

export type ClientConfigDimo = {
  chain: Chain;

  rpcURL: string;
  bundlrURL: string;
  paymasterURL: string;
  chainExplorerURL: string;

  environment: ENVIRONMENT;
};
