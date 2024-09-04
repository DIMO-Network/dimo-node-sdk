import { Chain } from "viem";

export enum ContractType {
  DIMO_CREDIT,
  DIMO_REGISTRY,
  VEHICLE_TOKEN,
  DIMO_SACD,
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

export type MintVehicleWithDeviceDefinition = {
  manufacturerNode: bigint;
  owner: `0x${string}`;
  deviceDefinitionID: string;
  attributeInfo: { attribute: string; info: string }[];
};

export type SetPermissionsSACD = {
  asset: `0x${string}`;
  tokenId: bigint;
  grantee: `0x${string}`;
  permissions: bigint;
  expiration: bigint;
  source: string;
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

export type ConnectPasskeyParams = {
  passkeyName: string;
  passkeyServerUrl: string;
};

export type ConnectPrivateKeyParams = {
  privateKey: `0x${string}`;
};

export type ConnectTurnkeyParams = {
  organizationId: string;
  turnkeyApiPublicKey: string;
  turnkeyApiPrivateKey: string;
  turnkeyPKSignerAddress: `0x${string}`;
  turnkeyBaseURL: string;
};

export type ClientConfigDimo = {
  chain: Chain;

  rpcURL: string;
  bundlrURL: string;
  paymasterURL: string;
  chainExplorerURL: string;

  environment: string;
};
