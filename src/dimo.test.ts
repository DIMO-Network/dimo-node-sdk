import { DIMO } from "./dimo";

const PROD = "Production";
const DEV = "Dev";

// const dimo = new DIMO(PROD);
// const devDimo = new DIMO(DEV);

// describe('Production Environment', () => {
//     test('Production resources are initialized with the correct environment', () => {
//         expect(dimo.attestation.env).toBe(PROD);
//         expect(dimo.auth.env).toBe(PROD);
//         expect(dimo.devicedata.env).toBe(PROD);
//         expect(dimo.devicedefinitions.env).toBe(PROD);
//         expect(dimo.devices.env).toBe(PROD);
//         expect(dimo.events.env).toBe(PROD);
//         expect(dimo.identity.env).toBe(PROD);
//         expect(dimo.telemetry.env).toBe(PROD);
//         expect(dimo.tokenexchange.env).toBe(PROD);
//         expect(dimo.trips.env).toBe(PROD);
//         expect(dimo.user.env).toBe(PROD);
//         expect(dimo.valuations.env).toBe(PROD);
//         expect(dimo.vehiclesignaldecoding.env).toBe(PROD);
//     });

//     test('Production API endpoints are defined', () => {
//         expect(dimo.attestation.api).toBeDefined;
//         expect(dimo.auth.api).toBeDefined;
//         expect(dimo.devicedata.api).toBeDefined;
//         expect(dimo.devicedefinitions.api).toBeDefined;
//         expect(dimo.devices.api).toBeDefined;
//         expect(dimo.events.api).toBeDefined;
//         expect(dimo.identity.api).toBeDefined;
//         expect(dimo.telemetry.api).toBeDefined;
//         expect(dimo.tokenexchange.api).toBeDefined;
//         expect(dimo.trips.api).toBeDefined;
//         expect(dimo.user.api).toBeDefined;
//         expect(dimo.valuations.api).toBeDefined;
//         expect(dimo.vehiclesignaldecoding.api).toBeDefined;
//     });
// });

// describe('Dev Environment', () => {
//     test('Dev resources are initialized with the correct environment', () => {
//         expect(devDimo.attestation.env).toBe(DEV);
//         expect(devDimo.auth.env).toBe(DEV);
//         expect(devDimo.devicedata.env).toBe(DEV);
//         expect(devDimo.devicedefinitions.env).toBe(DEV);
//         expect(devDimo.devices.env).toBe(DEV);
//         expect(devDimo.events.env).toBe(DEV);
//         expect(devDimo.identity.env).toBe(DEV);
//         expect(devDimo.telemetry.env).toBe(DEV);
//         expect(devDimo.tokenexchange.env).toBe(DEV);
//         expect(devDimo.trips.env).toBe(DEV);
//         expect(devDimo.user.env).toBe(DEV);
//         expect(devDimo.valuations.env).toBe(DEV);
//         expect(devDimo.vehiclesignaldecoding.env).toBe(DEV);
//     });

//     test('Dev API endpoints are defined', () => {
//         expect(devDimo.attestation.api).toBeDefined;
//         expect(devDimo.auth.api).toBeDefined;
//         expect(devDimo.devicedata.api).toBeDefined;
//         expect(devDimo.devicedefinitions.api).toBeDefined;
//         expect(devDimo.devices.api).toBeDefined;
//         expect(devDimo.events.api).toBeDefined;
//         expect(devDimo.identity.api).toBeDefined;
//         expect(devDimo.telemetry.api).toBeDefined;
//         expect(devDimo.tokenexchange.api).toBeDefined;
//         expect(devDimo.trips.api).toBeDefined;
//         expect(devDimo.user.api).toBeDefined;
//         expect(devDimo.valuations.api).toBeDefined;
//         expect(devDimo.vehiclesignaldecoding.api).toBeDefined;
//     });
// });
