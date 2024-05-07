import { Resource } from '../../Resource';
import { DimoEnvironment } from '../../../environments';

export class VehicleSignalDecoding extends Resource {

    constructor(api: any, env: keyof typeof DimoEnvironment) {
        super(api, 'VehicleSignalDecoding', env);
        this.setResource({
            listConfigUrlsByVin: {
                method: 'GET',
                path: '/v1/device-config/vin/:vin/urls',
                queryParams: {
                    protocol: false
                }
            },
            listConfigUrlsByAddress: {
                method: 'GET',
                path: '/v1/device-config/eth-addr/:address/urls',
                queryParams: {
                    protocol: false
                }
            },
            getPidConfigs: {
                method: 'GET',
                path: '/v1/device-config/pids/:templateName',
            },
            getDeviceSettings: {
                method: 'GET',
                path: '/v1/device-config/settings/:templateName',
            },
            getDbcText: {
                method: 'GET',
                path: '/v1/device-config/dbc/:templateName'
            },
            getDeviceStatusByAddress: {
                method: 'GET',
                path: '/v1/device-config/eth-addr/:address/status',
            },
            setDeviceStatusByAddress: {
                method: 'PATCH',
                path: '/v1/device-config/eth-addr/:address/status',
                body: {
                    config: true
                },
                auth: 'privilege_token'
            },
            getJobsByAddress: {
                method: 'GET',
                path: '/v1/device-config/eth-addr/:address/jobs'
            },
            getPendingJobsByAddress: {
                method: 'GET',
                path: '/v1/device-config/eth-addr/:address/jobs/pending'
            },
            setJobStatusByAddress: {
                method: 'PATCH',
                path: '/v1/device-config/eth-addr/:address/jobs/:jobId/:status',
                auth: 'privilege_token'
            },
        })
    }
}