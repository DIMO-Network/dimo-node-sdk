import { DimoEnvironment } from './environments';
import { DimoError } from './errors';

import {
    Identity,
    Telemetry
} from './graphql/resources/DimoGraphqlResources';

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
    VehicleSignalDecoding 
} from './api/resources/DimoRestResources';

import { Stream } from './streamr';

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

    constructor(env: keyof typeof DimoEnvironment) {
        this.identity = new Identity(DimoEnvironment[env].Identity, env);
        this.telemetry = new Telemetry(DimoEnvironment[env].Telemetry, env);

        /**
         * Set up all REST Endpoints
         */
        this.attestation = new Attestation(DimoEnvironment[env].Attestation, env);
        this.auth = new Auth(DimoEnvironment[env].Auth, env);
        this.devicedata = new DeviceData(DimoEnvironment[env].DeviceData, env);
        this.devicedefinitions = new DeviceDefinitions(DimoEnvironment[env].DeviceDefinitions, env);
        this.devices = new Devices(DimoEnvironment[env].Devices, env);
        this.events = new Events(DimoEnvironment[env].Events, env);
        this.tokenexchange = new TokenExchange(DimoEnvironment[env].TokenExchange, env);
        this.trips = new Trips(DimoEnvironment[env].Trips, env);
        this.user = new User(DimoEnvironment[env].User, env);
        this.valuations = new Valuations(DimoEnvironment[env].Valuations, env);
        this.vehiclesignaldecoding = new VehicleSignalDecoding(DimoEnvironment[env].VehicleSignalDecoding, env);
    }

    // Helper Function
    async authenticate() {
        let fs;
        try {
            // Dynamically import fs
            if (typeof process !== 'undefined' && process.versions && process.versions.node) {
                fs = await import('fs');
            } else {
                // Optionally handle the case where 'fs' is not available, returns null
                console.log('Not in Node.js environment; `fs` module is not available.');
                return null;
            }

            if (!fs.existsSync('.credentials.json')) {
                throw new DimoError({
                    message: 'Credentials file does not exist'
                });
            }
    
            const data = fs.readFileSync('.credentials.json', 'utf8');
            const credentials = JSON.parse(data);
    
            const authHeader = await this.auth.getToken({
                client_id: credentials.client_id,
                domain: credentials.redirect_uri,
                private_key: credentials.private_key,
            });
            
            return authHeader;

        } catch (error: any) {
            // Handle file not existing and other errors
            console.error('Failed to authenticate:', error.message);
            // Decide whether to throw the error or handle it differently
            throw new DimoError({
                message: 'Authentication failed'
            });
        }
    }

    async stream(streamId: string, clientId: string, privateKey: string, log?: string) {
        try {
            return Stream({ streamId, clientId, privateKey, log });
        } catch (error: any) {
            console.error('Streaming failed:', error.type);
            throw new DimoError({
                message: 'Subscribe to stream failed'
            });
        }
    }
}
