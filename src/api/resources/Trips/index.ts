import { Resource } from '../../Resource';
import { DimoEnvironment } from 'environments';

export class Trips extends Resource {

    constructor(api: any, env: keyof typeof DimoEnvironment) {
        super(api, 'Trips', env);
        this.setResource({
            list: {
                method: 'GET',
                path: '/v1/vehicle/:tokenId/trips',
                queryParams: {
                    page: false
                },
                auth: 'privilege'
            }
        })
    }
}