import { KERNEL_V2_VERSION_TYPE, KERNEL_V3_VERSION_TYPE } from "@zerodev/sdk/types";
import { Abi } from "viem";
import { Chain, polygon, polygonAmoy } from "viem/chains";
export const SUPPORTED_CHAINS: Chain[] = [polygonAmoy, polygon];

export type KernelSignerConfig = {
  rpcURL: string;
  bundlerUrl: string;
  paymasterUrl: string;
  turnkeyApiBaseUrl: string;
  entryPoint: `0x${string}`;
  kernelVersion: KERNEL_V3_VERSION_TYPE | KERNEL_V2_VERSION_TYPE;
  environment: string;
};

export enum ContractType {
  DIMO_CREDIT,
  DIMO_REGISTRY,
  DIMO_VEHICLE_ID,
  DIMO_SACD,
  DIMO_TOKEN,
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
    [key in DIMO_APIs]: {
      url: string;
    };
  };
};

export type ApiInfos = {
  [key in ENVIRONMENT]: DIMO_APIs;
};

export type AllChainInfos = {
  [key in SupportedNetworks]: ChainInfos;
};

export type ChainInfos = {
  contracts: ContractToMapping;
};

export type ContractToMapping = {
  [key in ContractType]: AbiAddressPair;
};

export type AbiAddressPair = {
  abi: Abi;
  address: `0x${string}`;
};
