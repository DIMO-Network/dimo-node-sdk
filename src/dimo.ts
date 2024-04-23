import { DimoEnvironment } from './environments';
import { DimoError } from './errors';
import axios, { AxiosResponse } from 'axios';
import fs from 'fs';
import * as graphqlQueries from './graphql/resources/index';

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
    private graphqlBaseUrl: string;
    public auth: Auth;
    public devicedata: DeviceData;
    public devicedefinitions: DeviceDefinitions;
    public devices: Devices;
    public events: Events;
    public tokenexchange: TokenExchange;
    public trips: Trips;
    public user: User;
    public valuations: Valuations;
    public vehiclesignaldecoding: VehicleSignalDecoding;

    constructor(env: keyof typeof DimoEnvironment) {
        this.graphqlBaseUrl = DimoEnvironment[env].Identity;
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

    // GraphQL Queries
    async countDimoVehicles() {
        const query = graphqlQueries.countDimoVehicles();
        return this.makeGraphqlRequest(query);
    } 

    async listVehicleDefinitionsPerAddress(address: string, limit: number) {
        if (!address) {
            throw new DimoError({
                message: 'Missing address input, check again',
                statusCode: 400
            }); 
        }
        // Set default value for limit
        if (!limit) {
            limit = 10;
        };
        const query = graphqlQueries.listVehicleDefinitionsPerAddress(address, limit);
        return this.makeGraphqlRequest(query);
    }

    async getVehicleDetailsByTokenId(tokenId: number) {
        if (!tokenId) {
            throw new Error('Missing token ID input, check again');
        }
        const query = graphqlQueries.getVehicleDetailsByTokenId(tokenId);
        return this.makeGraphqlRequest(query);
    }

    // Generic GraphQL Methods
    async makeGraphqlRequest(queryOrMutation: string, variables: any = {}): Promise<any> {
        const headers = {
            'Content-Type': 'application/json',
            'User-Agent': 'dimo-node-sdk'
        };

        try {
            const response: AxiosResponse = await axios.post(this.graphqlBaseUrl, {
                query: queryOrMutation,
                variables: variables
            }, { headers });
            return response.data;
        } catch (error) {
            console.error('GraphQL request failed:', error);
            throw new DimoError({
                message: 'GraphQL request failed, check your query again',
                statusCode: 400
            });
        }
    }

}
