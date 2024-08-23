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

export type Client = {
  network: SupportedNetworks;
  signer: PrivateKeyAccount;
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
