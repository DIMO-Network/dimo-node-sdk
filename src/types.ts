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
