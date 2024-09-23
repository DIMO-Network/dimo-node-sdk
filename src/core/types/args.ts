import { Abi } from "viem";
import { ContractType, SupportedNetworks } from "./dimoTypes.js";

export type MintVehicleWithDeviceDefinition = {
  manufacturerNode: BigInt;
  owner: `0x${string}`;
  deviceDefinitionID: string;
  attributeInfo: { attribute: string; info: string }[];
};

export type MintPermissionedVehicleWithDeviceDefinition = {
  manufacturerNode: BigInt;
  owner: `0x${string}`;
  deviceDefinitionID: string;
  attributeInfo: { attribute: string; info: string }[];
  source: string;
};

export type SetVehiclePermissions = {
  tokenId: BigInt;
  grantee: `0x${string}`;
  permissions: BigInt;
  expiration: BigInt;
  source: string;
};

export type SetPermissionsSACD = {
  asset: `0x${string}`;
  tokenId: BigInt;
  grantee: `0x${string}`;
  permissions: BigInt;
  expiration: BigInt;
  source: string;
};

export type SendDIMOTokens = {
  to: `0x${string}`;
  amount: BigInt;
};

export type NetworkProvider = {
  [network: string]: string;
};

export type AbiAddressPair = {
  abi: Abi;
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

export type ConnectPrivateKeyParams = {
  privateKey: `0x${string}`;
};

export type ConnectTurnkeyParams = {
  organizationId: string;
  turnkeyApiPublicKey: string;
  turnkeyApiPrivateKey: string;
  signer: `0x${string}`;
  turnkeyBaseURL: string;
};

export type ClientConfigDimo = {
  rpcURL: string;
  bundlrURL: string;
  paymasterURL: string;
  chainExplorerURL: string;

  environment: string;
};
