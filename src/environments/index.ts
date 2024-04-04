export const DimoEnvironment = {
    Production: {
        'Auth': 'https://auth.dimo.zone',
        'Identity': 'https://identity-api.dimo.zone/query',
        'Devices': 'https://devices-api.dimo.zone',
        'DeviceData': 'https://device-data-api.dimo.zone',
        'DeviceDefinitions': 'https://device-definitions-api.dimo.zone',
        'Events': 'https://events-api.dimo.zone',
        'TokenExchange': 'https://token-exchange-api.dimo.zone',
        'Trips': 'https://trips-api.dimo.zone',
        'User': 'https://users-api.dimo.zone',
        'Valuations': 'https://valuations-api.dimo.zone',
        'VehicleSignalDecoding': 'https://vehicle-signal-decoding.dimo.zone'
    },
    Dev: {
        'Auth': 'https://auth.dev.dimo.zone',
        'Identity': 'https://identity-api.dev.dimo.zone',
        'Devices': 'https://devices-api.dev.dimo.zone',
        'DeviceData': 'https://device-data-api.dev.dimo.zone',
        'DeviceDefinitions': 'https://device-definitions-api.dev.dimo.zone',
        'Events': 'https://events-api.dev.dimo.zone',
        'TokenExchange': 'https://token-exchange-api.dev.dimo.zone',
        'Trips': 'https://trips-api.dev.dimo.zone',
        'User': 'https://users-api.dev.dimo.zone',
        'Valuations': 'https://valuations-api.dev.dimo.zone',
        'VehicleSignalDecoding': 'https://vehicle-signal-decoding.dev.dimo.zone'
    } 
} as const;

export type DimoEnvironment =
    | typeof DimoEnvironment.Production
    | typeof DimoEnvironment.Dev