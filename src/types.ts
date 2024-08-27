import { Chain } from "viem";

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

export enum ContractType {
  DIMO_CREDIT,
  DIMO_REGISTRY,
}

export enum SupportedNetworks {
  AMOY,
  POLYGON,
}
