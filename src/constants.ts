import abiRegistry from "./web3/resources/abis/DimoRegistry.json";
import abiCredits from "./web3/resources/abis/DimoCredit.json";

import { AbiAddressPair, ContractType, NetworkProvider } from "types";

export const POLYGON_DIMO_TOKEN_ADDRESS = "0xE261D618a959aFfFd53168Cd07D12E37B26761db";
export const POLYGON_DIMO_CREDIT_ADDRESS = "0x7186F9aC35d24c9a4cf1E58a797c04DF1b334322";
export const POLYGON_DIMO_REGISTRY_ADDRESS = "0xFA8beC73cebB9D88FF88a2f75E7D7312f2Fd39EC";

export const AMOY_DIMO_TOKEN_ADDRESS = "0x21cFE003997fB7c2B3cfe5cf71e7833B7B2eCe10";
export const AMOY_DIMO_CREDIT_ADDRESS = "0x49c120f4C3c6679Ebd357F2d749E4D1C03598d65";
export const AMOY_DIMO_REGISTRY_ADDRESS = "0x5eAA326fB2fc97fAcCe6A79A304876daD0F2e96c";

export const PROVIDER_BY_NETWORK: NetworkProvider = {
  polygon: process.env.PROVIDER_POLYGON || "",
  amoy: process.env.PROVIDER_AMOY || "",
};

export const CONTRACTS_SETUP: AbiAddressPair = {
  amoy: {
    [ContractType.DIMO_REGISTRY]: {
      abi: abiRegistry,
      address: AMOY_DIMO_REGISTRY_ADDRESS,
    },
    [ContractType.DIMO_CREDIT]: {
      abi: abiCredits,
      address: AMOY_DIMO_CREDIT_ADDRESS,
    },
  },
  polygon: {
    [ContractType.DIMO_REGISTRY]: {
      abi: abiRegistry,
      address: POLYGON_DIMO_REGISTRY_ADDRESS,
    },
    [ContractType.DIMO_CREDIT]: {
      abi: abiCredits,
      address: POLYGON_DIMO_CREDIT_ADDRESS,
    },
  },
};

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
