import { Resource } from '../../Resource';
import { DimoEnvironment } from 'environments';

export class Telemetry extends Resource {
    constructor(api: any, env: keyof typeof DimoEnvironment) {
        super(api, 'Telemetry', env);
        this.query({
            auth: 'privilege_token',
            query: true,
        }), 
        this.setQueries({
            doSomethingElse: {
                auth: 'privilege_token',
                query: `
                { 
                    vehicles (first:10) {
                        totalCount,
                    }
                }
                `
            }
        })
    }

}