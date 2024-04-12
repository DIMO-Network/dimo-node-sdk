import { Resource } from '../../Resource';
import { DimoEnvironment } from 'environments';

export class Devices extends Resource {

    constructor(api: any, env: keyof typeof DimoEnvironment) {
        super(api, 'Devices', env);
        this.setResource({
            createVehicle: {
                method: 'POST',
                path: '/v1/user/devices',
                body: {
                    countryCode: true,
                    deviceDefinitionId: true
                },
                auth: 'access_token'
            },
            createVehicleFromSmartcar: {
                method: 'POST',
                path: '/v1/user/devices/fromsmartcar',
                body: {
                    code: true,
                    countryCode: true,
                    redirectURI: true
                },
                auth: 'access_token'
            },
            createVehicleFromVin: {
                method: 'POST',
                path: '/v1/user/devices/fromvin',
                body: {
                    canProtocol: false,
                    countryCode: true,
                    vin: true
                },
                auth: 'access_token'
            },
            updateVehicleVin: {
                method: 'PATCH',
                path: '/v1/user/devices/:userDeviceId/vin',
                auth: 'access_token'
            },
            getClaimingPayload: {
                method: 'POST',
                path: '/v1/aftermarket/device/by-serial/:serial/commands/claim',
                auth: 'access_token'
            },
            signClaimingPayload: {
                method: 'POST',
                path: '/v1/aftermarket/device/by-serial/:serial/commands/claim',
                body: {
                    claimRequest: true
                },
                auth: 'access_token'
            },
            getMintingPayload: {
                method: 'POST',
                path: '/v1/user/devices/:userDeviceId/commands/mint',
                auth: 'access_token'
            },
            signMintingPayload: {
                method: 'POST',
                path: '/v1/user/devices/:userDeviceId/commands/mint',
                body: {
                    mintRequest: true
                },
                auth: 'access_token'
            },
            optInShareData: {
                method: 'POST',
                path: '/v1/user/devices/:userDeviceId/commands/opt-in',
                auth: 'access_token'
            },
            refreshSmartcarData: {
                method: 'POST',
                path: '/v1/user/devices/:userDeviceId/commands/refresh',
                auth: 'access_token'
            },
            getPairingPayload: {
                method: 'GET',
                path: '/v1/user/devices/:userDeviceId/aftermarket/commands/pair',
                auth: 'access_token'
            },
            signPairingPayload: {
                method: 'POST',
                path: '/v1/user/devices/:userDeviceId/aftermarket/commands/pair',
                body: {
                    userSignature: true
                },
                auth: 'access_token'
            },
            getUnpairingPayload: {
                method: 'GET',
                path: '/v1/user/devices/:userDeviceId/aftermarket/commands/unpair',
                auth: 'access_token'
            },
            signUnpairingPayload: {
                method: 'POST',
                path: '/v1/user/devices/:userDeviceId/aftermarket/commands/unpair',
                body: {
                    userSignature: true
                },
                auth: 'access_token'
            },
            lockDoors: {
                method: 'POST',
                path: '/v1/vehicle/:tokenId/commands/doors/lock',
                auth: 'privilege_token'
            },
            unlockDoors: {
                method: 'POST',
                path: '/v1/vehicle/:tokenId/commands/doors/unlock',
                auth: 'privilege_token'
            },
            openFrunk: {
                method: 'POST',
                path: '/v1/vehicle/:tokenId/commands/frunk/open',
                auth: 'privilege_token'
            },
            openTrunk: {
                method: 'POST',
                path: '/v1/vehicle/:tokenId/commands/trunk/open',
                auth: 'privilege_token'
            },
            listErrorCodes: {
                method: 'GET',
                path: '/v1/user/devices/:userDeviceId/error-codes',
                auth: 'access_token'
            },
            submitErrorCodes: {
                method: 'POST',
                path: '/v1/user/devices/:userDeviceId/error-codes',
                body: {
                    queryDeviceErrorCodes: true
                },
                auth: 'access_token'
            },
            clearErrorCodes: {
                method: 'POST',
                path: '/v1/user/devices/:userDeviceId/error-codes/clear',
                auth: 'access_token'
            },
            getAftermarketDevice: {
                method: 'GET',
                path: '/v1/aftermarket/device/:tokenId',
            },
            getAftermarketDeviceImage: {
                method: 'GET',
                path: '/v1/aftermarket/device/:tokenId/image',
            },
            getAftermarketDeviceMetadataByAddress: {
                method: 'GET',
                path: '/v1/aftermarket/device/by-address/:address',
            }
        })
    }
}