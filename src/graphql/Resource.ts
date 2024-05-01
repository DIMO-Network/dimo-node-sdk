import { CustomQuery, Query } from './Query';
import { DimoEnvironment } from 'environments';

export interface Resource {
    [key: string]: (...args: any) => any;
}

export class Resource {
    protected api: any;
    protected resourceName: any;
    protected env: any;

    constructor(api: any, resourceName: string, env: keyof typeof DimoEnvironment ) {
        this.api = api;
        this.resourceName = resourceName;
        this.env = env;
    }

    protected setQueries(resources: any): void {
        Object.keys(resources).forEach(key => {
            this[key] = (params: any = {}) => Query(
                resources[key], // Setup the endpoint resources
                this.api[this.resourceName], // Setup the base URL
                params, // Pass through the params
                this.env // Identiy the environment
            );
        });
    }

    /**
     * Custom GraphQL Queries
     * @param resources 
     */
    query(resources: any): void {
        Object.keys(resources).forEach(key => {
            this[key] = (params: any = {}) => CustomQuery(
                resources, // Setup the endpoint resources
                this.api[this.resourceName], // Setup the base URL
                params, // Pass through the params
                this.env // Identiy the environment
            );
        });

    }
}