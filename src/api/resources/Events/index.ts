import { Resource } from '../../Resource';
import { DimoEnvironment } from 'environments';

export class Events extends Resource {

    constructor(api: any, env: keyof typeof DimoEnvironment) {
        super(api, 'Events', env);
        this.setResource({
            list: {
                method: 'GET',
                path: '/v1/events',
                auth: 'web3'
            }
        })
    }
}