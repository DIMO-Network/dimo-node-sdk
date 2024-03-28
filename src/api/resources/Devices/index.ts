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
                    user_device: true,
                },
                auth: 'web3'
            },
            createVehicleFromSmartcar: {
                method: 'POST',
                path: '/v1/user/devices/fromsmartcar',
                body: {
                    user_device: true,
                },
                auth: 'web3'
            },
            createVehicleFromVin: {
                method: 'POST',
                path: '/v1/user/devices/fromvin',
                body: {
                    user_device: true,
                },
                auth: 'web3'
            },
            updateVehicleVin: {
                method: 'PATCH',
                path: '/v1/user/devices/:userDeviceId/vin',
                auth: 'web3'
            },
            getClaimingPayload: {
                method: 'POST',
                path: '/v1/aftermarket/device/by-serial/:serial/commands/claim',
                auth: 'web3'
            },
            signClaimingPayload: {
                method: 'POST',
                path: '/v1/aftermarket/device/by-serial/:serial/commands/claim',
                body: {
                    claimRequest: true
                },
                auth: 'web3'
            },
            getMintingPayload: {
                method: 'POST',
                path: '/v1/user/devices/:userDeviceId/commands/mint',
                auth: 'web3'
            },
            signMintingPayload: {
                method: 'POST',
                path: '/v1/user/devices/:userDeviceId/commands/mint',
                body: {
                    mintRequest: true
                },
                auth: 'web3'
            },
            optInShareData: {
                method: 'POST',
                path: '/v1/user/devices/:userDeviceId/commands/opt-in',
                auth: 'web3'
            },
            refreshSmartcarData: {
                method: 'POST',
                path: '/v1/user/devices/:userDeviceId/commands/refresh',
                auth: 'web3'
            },
            getPairingPayload: {
                method: 'GET',
                path: '/v1/user/devices/:userDeviceId/aftermarket/commands/pair',
                auth: 'web3'
            },
            signPairingPayload: {
                method: 'POST',
                path: '/v1/user/devices/:userDeviceId/aftermarket/commands/pair',
                body: {
                    userSignature: true
                },
                auth: 'web3'
            },
            getUnpairingPayload: {
                method: 'GET',
                path: '/v1/user/devices/:userDeviceId/aftermarket/commands/unpair',
                auth: 'web3'
            },
            signUnpairingPayload: {
                method: 'POST',
                path: '/v1/user/devices/:userDeviceId/aftermarket/commands/unpair',
                body: {
                    userSignature: true
                },
                auth: 'web3'
            },
            lockDoors: {
                method: 'POST',
                path: '/v1/vehicle/:tokenId/commands/doors/lock',
                auth: 'privilege'
            },
            unlockDoors: {
                method: 'POST',
                path: '/v1/vehicle/:tokenId/commands/doors/unlock',
                auth: 'privilege'
            },
            openFrunk: {
                method: 'POST',
                path: '/v1/vehicle/:tokenId/commands/frunk/open',
                auth: 'privilege'
            },
            openTrunk: {
                method: 'POST',
                path: '/v1/vehicle/:tokenId/commands/trunk/open',
                auth: 'privilege'
            },
            listErrorCodes: {
                method: 'GET',
                path: '/v1/user/devices/:userDeviceId/error-codes',
                auth: 'web3'
            },
            submitErrorCodes: {
                method: 'POST',
                path: '/v1/user/devices/:userDeviceId/error-codes',
                body: {
                    queryDeviceErrorCodes: true
                },
                auth: 'web3'
            },
            clearErrorCodes: {
                method: 'POST',
                path: '/v1/user/devices/:userDeviceId/error-codes/clear',
                auth: 'web3'
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