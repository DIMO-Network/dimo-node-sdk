import abiCredits from "./abis/DimoCredit.json";
import abiRegistry from "./abis/DimoRegistry.json";
import abiSacd from "./abis/DimoSacd.json";
import abiVehicleId from "./abis/DimoVehicleId.json";
import { Chain, polygon, polygonAmoy } from "viem/chains";
import {
  API_BY_ENV,
  AllChainInfos,
  ContractType,
  DIMO_APIs,
  ENVIRONMENT,
  NetworkProvider,
  SupportedNetworks,
} from "./types";

export const POLYGON_DIMO_TOKEN_ADDRESS = "0xE261D618a959aFfFd53168Cd07D12E37B26761db";
export const POLYGON_DIMO_CREDIT_ADDRESS = "0x7186F9aC35d24c9a4cf1E58a797c04DF1b334322";
export const POLYGON_DIMO_REGISTRY_ADDRESS = "0xFA8beC73cebB9D88FF88a2f75E7D7312f2Fd39EC";
export const POLYGON_DIMO_SACD_ADDRESS = "0xEF919b3793deaae1637523d483e3434ae113004E";
export const POLYGON_DIMO_VEHICLE_ID_ADDRESS = "0xbA5738a18d83D41847dfFbDC6101d37C69c9B0cF";

export const AMOY_DIMO_TOKEN_ADDRESS = "0x21cFE003997fB7c2B3cfe5cf71e7833B7B2eCe10";
export const AMOY_DIMO_CREDIT_ADDRESS = "0x49c120f4C3c6679Ebd357F2d749E4D1C03598d65";
export const AMOY_DIMO_REGISTRY_ADDRESS = "0x5eAA326fB2fc97fAcCe6A79A304876daD0F2e96c";
export const AMOY_DIMO_SACD_ADDRESS = "0x3e78Cb1f68132D34C811dcd7D4a10E0Aad752C3c";
export const AMOY_DIMO_VEHICLE_ID_ADDRESS = "0x45fbCD3ef7361d156e8b16F5538AE36DEdf61Da8";

export const MINT_VEHICLE_WITH_DEVICE_DEFINITION = "mintVehicleWithDeviceDefinition";
export const SET_PERMISSIONS_SACD = "setPermissions";

export const SUPPORTED_NETWORKS = [SupportedNetworks.AMOY, SupportedNetworks.POLYGON];
export const SUPPORTED_CHAINS: Chain[] = [polygonAmoy, polygon];

export const PRODUCTION_ENV = "production";

export const CHAIN_ENUM_MAPPING: {
  [key in SupportedNetworks]: Chain;
} = {
  [SupportedNetworks.AMOY]: polygonAmoy,
  [SupportedNetworks.POLYGON]: polygon,
};

export const CHAIN_TO_NETWORK_ENUM_MAPPING = new Map<string, SupportedNetworks>([
  [polygon.name, SupportedNetworks.POLYGON],
  [polygonAmoy.name, SupportedNetworks.AMOY],
]);

export const PROVIDER_BY_NETWORK: NetworkProvider = {
  polygon: process.env.PROVIDER_POLYGON || "",
  amoy: process.env.PROVIDER_AMOY || "",
};

export const api_mapping_by_env = new Map<string, ENVIRONMENT>([
  ["production", ENVIRONMENT.PROD],
  ["prod", ENVIRONMENT.PROD],

  ["development", ENVIRONMENT.DEV],
  ["dev", ENVIRONMENT.DEV],
]);

export const ENV_TO_API_MAPPING: API_BY_ENV = {
  [ENVIRONMENT.PROD]: {
    [DIMO_APIs.ATTESTATION]: { url: "https://attestation-api.dimo.zone" },
    [DIMO_APIs.AUTH]: { url: "https://auth.dimo.zone" },
    [DIMO_APIs.IDENTITY]: { url: "https://identity-api.dimo.zone/query" },
    [DIMO_APIs.DEVICES]: { url: "https://devices-api.dimo.zone" },
    [DIMO_APIs.DEVICE_DATA]: { url: "https://device-data-api.dimo.zone" },
    [DIMO_APIs.DEVICE_DEFINITIONS]: { url: "https://device-definitions-api.dimo.zone" },
    [DIMO_APIs.EVENTS]: { url: "https://events-api.dimo.zone" },
    [DIMO_APIs.TELEMETRY]: { url: "https://telemetry-api.dimo.zone/query" },
    [DIMO_APIs.TOKEN_EXCHANGE]: { url: "https://token-exchange-api.dimo.zone" },
    [DIMO_APIs.TRIPS]: { url: "https://trips-api.dimo.zone" },
    [DIMO_APIs.USER]: { url: "https://users-api.dimo.zone" },
    [DIMO_APIs.VALUATIONS]: { url: "https://valuations-api.dimo.zone" },
    [DIMO_APIs.VEHICLE_SIGNAL_DECODING]: { url: "https://vehicle-signal-decoding.dimo.zone" },
  },
  [ENVIRONMENT.DEV]: {
    [DIMO_APIs.ATTESTATION]: { url: "https://attestation-api.dev.dimo.zone" },
    [DIMO_APIs.AUTH]: { url: "https://auth.dev.dimo.zone" },
    [DIMO_APIs.IDENTITY]: { url: "https://identity-api.dev.dimo.zone/query" },
    [DIMO_APIs.DEVICES]: { url: "https://devices-api.dev.dimo.zone" },
    [DIMO_APIs.DEVICE_DATA]: { url: "https://device-data-api.dev.dimo.zone" },
    [DIMO_APIs.DEVICE_DEFINITIONS]: { url: "https://device-definitions-api.dev.dimo.zone" },
    [DIMO_APIs.EVENTS]: { url: "https://events-api.dev.dimo.zone" },
    [DIMO_APIs.TELEMETRY]: { url: "https://telemetry-api.dev.dimo.zone/query" },
    [DIMO_APIs.TOKEN_EXCHANGE]: { url: "https://token-exchange-api.dev.dimo.zone" },
    [DIMO_APIs.TRIPS]: { url: "https://trips-api.dev.dimo.zone" },
    [DIMO_APIs.USER]: { url: "https://users-api.dev.dimo.zone" },
    [DIMO_APIs.VALUATIONS]: { url: "https://valuations-api.dev.dimo.zone" },
    [DIMO_APIs.VEHICLE_SIGNAL_DECODING]: { url: "https://vehicle-signal-decoding.dev.dimo.zone" },
  },
};

export const CHAIN_ABI_MAPPING: AllChainInfos = {
  [SupportedNetworks.AMOY]: {
    contracts: {
      [ContractType.DIMO_SACD]: {
        abi: abiSacd,
        address: AMOY_DIMO_SACD_ADDRESS,
      },
      [ContractType.DIMO_CREDIT]: {
        abi: abiCredits,
        address: AMOY_DIMO_CREDIT_ADDRESS,
      },
      [ContractType.DIMO_REGISTRY]: {
        abi: abiRegistry,
        address: AMOY_DIMO_REGISTRY_ADDRESS,
      },
      [ContractType.DIMO_VEHICLE_ID]: {
        abi: abiVehicleId,
        address: AMOY_DIMO_VEHICLE_ID_ADDRESS,
      },
    },
  },
  [SupportedNetworks.POLYGON]: {
    contracts: {
      [ContractType.DIMO_SACD]: {
        abi: abiSacd,
        address: AMOY_DIMO_SACD_ADDRESS,
      },
      [ContractType.DIMO_CREDIT]: {
        abi: abiCredits,
        address: POLYGON_DIMO_CREDIT_ADDRESS,
      },
      [ContractType.DIMO_REGISTRY]: {
        abi: abiRegistry,
        address: POLYGON_DIMO_REGISTRY_ADDRESS,
      },
      [ContractType.DIMO_VEHICLE_ID]: {
        abi: abiVehicleId,
        address: POLYGON_DIMO_VEHICLE_ID_ADDRESS,
      },
    },
  },
};

export const ChainContractMapping = {
  polygon: {
    chain: polygonAmoy,
    contracts: {
      [ContractType.DIMO_CREDIT]: {
        abi: abiCredits,
        address: POLYGON_DIMO_CREDIT_ADDRESS,
      },
      [ContractType.DIMO_REGISTRY]: {
        abi: abiRegistry,
        address: POLYGON_DIMO_REGISTRY_ADDRESS,
      },
    },
  },
  amoy: {
    chain: polygonAmoy,
    contracts: {
      [ContractType.DIMO_CREDIT]: {
        abi: abiCredits,
        address: AMOY_DIMO_CREDIT_ADDRESS,
      },
      [ContractType.DIMO_REGISTRY]: {
        abi: abiRegistry,
        address: AMOY_DIMO_REGISTRY_ADDRESS,
      },
    },
  },
};

// TODO- pull this into constants map above and simplify where its used elsewhere
export const DimoConstants = {
  Production: {
    NFT_address: "0xbA5738a18d83D41847dfFbDC6101d37C69c9B0cF",
    RPC_provider: "https://eth.llamarpc.com",
    DLX_address: "0x9A9D2E717bB005B240094ba761Ff074d392C7C85",
    DCX_address: "0x7186F9aC35d24c9a4cf1E58a797c04DF1b334322",
    Vehicle_address: "0xba5738a18d83d41847dffbdc6101d37c69c9b0cf",
  },
  Dev: {
    NFT_address: "0x45fbCD3ef7361d156e8b16F5538AE36DEdf61Da8",
    RPC_provider: "https://eth.llamarpc.com",
    DLX_address: "",
  },
} as const;

export type DimoConstants = typeof DimoConstants.Production | typeof DimoConstants.Dev;
