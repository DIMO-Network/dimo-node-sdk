import { Method } from './Method';
import { DimoEnvironment } from '../environments';

export interface Resource {
    [key: string]: (...args: any) => any;
}

export class Resource {
    public api: any;
    public resourceName: any;
    public env: any;

    constructor(api: any, resourceName: string, env: keyof typeof DimoEnvironment ) {
        this.api = api;
        this.resourceName = resourceName;
        this.env = env;
    }

    protected setResource(resources: any): void {
        Object.keys(resources).forEach(key => {
            this[key] = (params: any = {}) => Method(
                resources[key], // Setup the endpoint resources
                this.api, // Setup the base URL
                params, // Pass through the params
                this.env // Identiy the environment
            );
        });
    }
}