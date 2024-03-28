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
                auth: 'privilege_token'
            },
            getVehicleStatus: {
                method: 'GET',
                path: '/v2/vehicle/:tokenId/status',
                auth: 'privilege_token'
            },
            getV1VehicleHistory: {
                method: 'GET',
                path: '/v1/vehicle/:tokenId/history',
                queryParams: {
                    startTime: false,
                    endTime: false,
                },
                auth: 'privilege_token'
            },
            getV1VehicleStatus: {
                method: 'GET',
                path: '/v1/vehicle/:tokenId/status',
                auth: 'privilege_token'
            },
            getV1VehicleStatusRaw: {
                method: 'GET',
                path: '/v1/vehicle/:tokenId/status-raw',
                auth: 'privilege_token'
            },
            getUserDeviceStatus: {
                method: 'GET',
                path: '/v1/user/device-data/:userDeviceId/status',
                auth: 'access_token'
            },
            getUserDeviceHistory: {
                method: 'GET',
                path: '/v1/user/device-data/:userDeviceId/historical',
                queryParams: {
                    startDate: false,
                    endDate: false
                },
                auth: 'access_token'
            },
            getDailyDistance: {
                method: 'GET',
                path: '/v1/user/device-data/:userDeviceId/daily-distance',
                queryParams: {
                    time_zone: true
                },
                auth: 'access_token'
            },
            getTotalDistance: {
                method: 'GET',
                path: '/v1/user/device-data/:userDeviceId/distance-driven',
                auth: 'access_token'
            },
            sendJsonExportEmail: {
                method: 'POST',
                path: '/v1/user/device-data/:userDeviceId/export/json/email',
                auth: 'access_token'
            }
        })
    }
}