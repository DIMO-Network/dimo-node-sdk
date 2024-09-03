import { DimoError } from "utils/error";

import { Identity, Telemetry } from "./graphql/resources/DimoGraphqlResources";

import {
  Attestation,
  Auth,
  DeviceData,
  DeviceDefinitions,
  Devices,
  Events,
  TokenExchange,
  Trips,
  User,
  Valuations,
  VehicleSignalDecoding,
} from "./api/resources/DimoRestResources";

import { DimoWeb3Client } from "./web3/index";

import { Stream } from "./streamr";
import { ClientConfigDimo, ContractType, DIMO_APIs, ENVIRONMENT, SupportedNetworks } from "utils/types";
import {
  CHAIN_ABI_MAPPING,
  CHAIN_TO_NETWORK_ENUM_MAPPING,
  ENV_TO_API_MAPPING,
  api_mapping_by_env,
} from "utils/constants";

export class DIMO {
  public attestation: Attestation;
  public auth: Auth;
  public devicedata: DeviceData;
  public devicedefinitions: DeviceDefinitions;
  public devices: Devices;
  public events: Events;
  public identity: Identity;
  public telemetry: Telemetry;
  public tokenexchange: TokenExchange;
  public trips: Trips;
  public user: User;
  public valuations: Valuations;
  public vehiclesignaldecoding: VehicleSignalDecoding;
  public web3: DimoWeb3Client;

  constructor(config: ClientConfigDimo) {
    const apiMapping = ENV_TO_API_MAPPING[api_mapping_by_env.get(config.environment) || ENVIRONMENT.DEV];
    this.identity = new Identity(apiMapping[DIMO_APIs.IDENTITY].url);
    this.telemetry = new Telemetry(apiMapping[DIMO_APIs.TELEMETRY].url);

    /**
     * Set up all REST Endpoints
     */
    this.attestation = new Attestation(apiMapping[DIMO_APIs.ATTESTATION].url);
    this.auth = new Auth(apiMapping[DIMO_APIs.AUTH].url);
    this.devicedata = new DeviceData(apiMapping[DIMO_APIs.DEVICE_DATA].url);
    this.devicedefinitions = new DeviceDefinitions(apiMapping[DIMO_APIs.DEVICE_DEFINITIONS].url);
    this.devices = new Devices(apiMapping[DIMO_APIs.DEVICES].url);
    this.events = new Events(apiMapping[DIMO_APIs.EVENTS].url);

    const abiMapping =
      CHAIN_ABI_MAPPING[
        CHAIN_TO_NETWORK_ENUM_MAPPING.get(config.chain.name ? config.chain.name : "") as SupportedNetworks
      ];
    this.tokenexchange = new TokenExchange(
      apiMapping[DIMO_APIs.TOKEN_EXCHANGE].url,
      abiMapping.contracts[ContractType.DIMO_REGISTRY].address
    );

    this.trips = new Trips(apiMapping[DIMO_APIs.TELEMETRY].url);
    this.user = new User(apiMapping[DIMO_APIs.TELEMETRY].url);
    this.valuations = new Valuations(apiMapping[DIMO_APIs.TELEMETRY].url);
    this.vehiclesignaldecoding = new VehicleSignalDecoding(apiMapping[DIMO_APIs.TELEMETRY].url);

    /**
     * Set up Web3 Client
     */
    this.web3 = new DimoWeb3Client(config);
  }

  // Helper Function
  async authenticate() {
    let fs;
    try {
      // Dynamically import fs
      if (typeof process !== "undefined" && process.versions && process.versions.node) {
        fs = await import("fs");
      } else {
        // Optionally handle the case where 'fs' is not available, returns null
        console.log("Not in Node.js environment; `fs` module is not available.");
        return null;
      }

      if (!fs.existsSync(".credentials.json")) {
        throw new DimoError({
          message: "Credentials file does not exist",
        });
      }

      const data = fs.readFileSync(".credentials.json", "utf8");
      const credentials = JSON.parse(data);

      const authHeader = await this.auth.getToken({
        client_id: credentials.client_id,
        domain: credentials.redirect_uri,
        private_key: credentials.private_key,
      });

      return authHeader;
    } catch (error: any) {
      // Handle file not existing and other errors
      console.error("Failed to authenticate:", error.message);
      // Decide whether to throw the error or handle it differently
      throw new DimoError({
        message: "Authentication failed",
      });
    }
  }

  async stream(streamId: string, clientId: string, privateKey: string, log?: string) {
    try {
      return Stream({ streamId, clientId, privateKey, log });
    } catch (error: any) {
      console.error("Streaming failed:", error.type);
      throw new DimoError({
        message: "Subscribe to stream failed",
      });
    }
  }
}
