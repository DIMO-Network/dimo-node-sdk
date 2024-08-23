import * as dotenv from "dotenv";
import ethers from "ethers";
import abiRegistry from "../utils/abis/DimoRegistry.json";
import { ContractType, AbiAddressPair, NetworkProvider } from "./types";

dotenv.config();

export const AMOY_DIMO_REGISTRY_ADDRESS = "0x5eAA326fB2fc97fAcCe6A79A304876daD0F2e96c";
export const MINT_VEHICLE_WITH_DEVICE_DEFINITION = "mintVehicleWithDeviceDefinition";

export const PROVIDER_BY_NETWORK: NetworkProvider = {
  localhost: process.env.PROVIDER_LOCALHOST || "",
  tenderly: process.env.PROVIDER_TENDERLY || "",
  polygon: process.env.PROVIDER_POLYGON || "",
  amoy: process.env.PROVIDER_AMOY || "",
};

export const CONTRACTS_SETUP: AbiAddressPair = {
  amoy: {
    [ContractType.DIMO_REGISTRY]: {
      abi: abiRegistry,
      address: AMOY_DIMO_REGISTRY_ADDRESS,
    },
  },
  localhost: {},
};
