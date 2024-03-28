import { Resource } from '../../Resource';
import { DimoEnvironment } from 'environments';

export class Valuations extends Resource {

    constructor(api: any, env: keyof typeof DimoEnvironment) {
        super(api, 'Valuations', env);
        this.setResource({
            getValuations: {
                method: 'GET',
                path: '/v1/user/devices/:userDeviceId/valuations',
                auth: 'web3'
            },
            getInstantOffers: {
                method: 'GET',
                path: '/v1/user/devices/:userDeviceId/instant-offer',
                auth: 'web3'
            },
            getOffers: {
                method: 'GET',
                path: '/v1/user/devices/:userDeviceId/offers',
                auth: 'web3'
            }
        })
    }
}