import { request } from 'graphql-request';

import { 
    countDimoVehicles, 
    getVehicleDetailsByTokenId,
    listVehicleDefinitionsPerAddress 
} from './graphql/graphqlQueries.js';
import { DimoEnvironment } from 'environments';

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
} from 'api/resources/DimoRestResources';

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

    // GraphQL Queries
    async countDimoVehicles() {
        const query = countDimoVehicles();
        return this.makeGraphqlRequest(query);
    } 

    async listVehicleDefinitionsPerAddress(address: string, limit: number) {
        if (!address) {
            throw new Error('Missing address input, check again'); 
        }
        // Set default value for limit
        if (!limit) {
            limit = 10;
        };
        const query = listVehicleDefinitionsPerAddress(address, limit);
        return this.makeGraphqlRequest(query);
    }

    async getVehicleDetailsByTokenId(tokenId: number) {
        if (!tokenId) {
            throw new Error('Missing token ID input, check again');
        }
        const query = getVehicleDetailsByTokenId(tokenId);
        return this.makeGraphqlRequest(query);
    }

    // Generic GraphQL Methods
    async makeGraphqlRequest(queryOrMutation: string, variables: any = {}): Promise<any> {
        const headers = {
            'User-Agent': 'dimo-node-sdk'
        };

        try {
            const data = await request(this.graphqlBaseUrl, queryOrMutation, variables, headers);
            return data;
        } catch (error) {
            console.error('GraphQL request failed:', error);
            throw error;
        }
    }

}
