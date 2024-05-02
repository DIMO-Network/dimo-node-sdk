import { DimoEnvironment } from './environments';
import { DimoError } from './errors';
import axios, { AxiosResponse } from 'axios';
import fs from 'fs';

import {
    Identity,
    Telemetry
} from './graphql/resources/DimoGraphqlResources';

import { 
    Auth,
    DeviceData, 
    DeviceDefinitions, 
    Devices,
    Events,
    TokenExchange,
    Trips,
    User, 
    Valuations, 
    VehicleSignalDecoding 
} from './api/resources/DimoRestResources';

export class DIMO {
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

    constructor(env: keyof typeof DimoEnvironment) {
        this.identity = new Identity(DimoEnvironment[env], env);
        this.telemetry = new Telemetry(DimoEnvironment[env], env);

        /**
         * Set up all REST Endpoints
         */
        this.auth = new Auth(DimoEnvironment[env], env);
        this.devicedata = new DeviceData(DimoEnvironment[env], env);
        this.devicedefinitions = new DeviceDefinitions(DimoEnvironment[env], env);
        this.devices = new Devices(DimoEnvironment[env], env);
        this.events = new Events(DimoEnvironment[env], env);
        this.tokenexchange = new TokenExchange(DimoEnvironment[env], env);
        this.trips = new Trips(DimoEnvironment[env], env);
        this.user = new User(DimoEnvironment[env], env);
        this.valuations = new Valuations(DimoEnvironment[env], env);
        this.vehiclesignaldecoding = new VehicleSignalDecoding(DimoEnvironment[env], env);
    }

    // Helper Function
    async authenticate() {
        const credentials = JSON.parse(fs.readFileSync('.credentials.json', 'utf8'));
        // Call getToken with credentials
        const authHeader = await this.auth.getToken({
            client_id: credentials.client_id,
            domain: credentials.redirect_uri,
            private_key: credentials.private_key,
        });
        return authHeader;
    }
}
