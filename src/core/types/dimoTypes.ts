import { Chain, polygon, polygonAmoy } from "viem/chains";
export const SUPPORTED_CHAINS: Chain[] = [polygonAmoy, polygon];

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
