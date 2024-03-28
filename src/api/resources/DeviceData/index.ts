import { Resource } from '../../Resource';
import { DimoEnvironment } from 'environments';

export class DeviceData extends Resource {

    constructor(api: any, env: keyof typeof DimoEnvironment) {
        super(api, 'DeviceData', env);
        this.setResource({
            getVehicleHistory: {
                method: 'GET',
                path: '/v2/vehicle/:tokenId/history',
                queryParams: {
                    startTime: false,
                    endTime: false,
                    buckets: false
                },
                auth: 'privilege'
            },
            getVehicleStatus: {
                method: 'GET',
                path: '/v2/vehicle/:tokenId/status',
                auth: 'privilege'
            },
            getV1VehicleHistory: {
                method: 'GET',
                path: '/v1/vehicle/:tokenId/history',
                queryParams: {
                    startTime: false,
                    endTime: false,
                },
                auth: 'privilege'
            },
            getV1VehicleStatus: {
                method: 'GET',
                path: '/v1/vehicle/:tokenId/status',
                auth: 'privilege'
            },
            getV1VehicleStatusRaw: {
                method: 'GET',
                path: '/v1/vehicle/:tokenId/status-raw',
                auth: 'privilege'
            },
            getUserDeviceStatus: {
                method: 'GET',
                path: '/v1/user/device-data/:userDeviceId/status',
                auth: 'web3'
            },
            getUserDeviceHistory: {
                method: 'GET',
                path: '/v1/user/device-data/:userDeviceId/historical',
                queryParams: {
                    startDate: false,
                    endDate: false
                },
                auth: 'web3'
            },
            getDailyDistance: {
                method: 'GET',
                path: '/v1/user/device-data/:userDeviceId/daily-distance',
                queryParams: {
                    time_zone: true
                },
                auth: 'web3'
            },
            getTotalDistance: {
                method: 'GET',
                path: '/v1/user/device-data/:userDeviceId/distance-driven',
                auth: 'web3'
            },
            sendJsonExportEmail: {
                method: 'POST',
                path: '/v1/user/device-data/:userDeviceId/export/json/email',
                auth: 'web3'
            }
        })
    }
}