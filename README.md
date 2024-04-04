
# DIMO NodeJS Developer SDK
This is an official DIMO Developer SDK written in NodeJS/TypeScript. The objective of this project is to make our API more accessible to the general public. DIMO offers a grants program for SDK contributions, please reach out to developers@dimo.zone to learn more.

## Installation
```bash
npm install @dimo-network/dimo-node-sdk
```

## API Documentation
Please visit the DIMO [Developer Documentation](https://docs.dimo.zone/developer-platform) to learn more about building on DIMO and detailed information on the API.

## How to Use the SDK

Import the SDK library:
```js
import { DIMO } from '@dimo-network/dimo-node-sdk';
```

Initiate the SDK depending on the environment of your interest, we currently support both `Production` and `Dev` environments:

```js
const dimo = new DIMO('Production');
```
or

```js
const dimo = new DIMO('Dev');
```

### Authentication

In order to authenticate and access private API data, you will need to [authenticate with the DIMO Auth Server](https://docs.dimo.zone/developer-platform/getting-started/authentication). The SDK provides you with all the steps needed in the [Wallet-based Authentication Flow](https://docs.dimo.zone/developer-platform/getting-started/authentication/wallet-based-authentication-flow) in case you need it to build a wallet integration around it. We also offer expedited functions to streamline the multiple calls needed. 

#### Prerequisites for Authentication
1. A set of `client_id` and `redirect_uri` (aka `domain`) registered with the DIMO Engineering Team. You can find us either in [Discord](https://chat.dimo.zone) or by filling out [this form](https://dimo.zone/contact) and choose `Developer` from the dropdown menu.
2. Access to a signer wallet and its private keys. Best practice is to rotate this frequently for security purposes.

> At its core, a Web3 wallet is a software program that stores private keys, which are necessary for accessing blockchain networks and conducting transactions. Unlike traditional wallets, which store physical currency, Web3 wallets store digital assets such as Bitcoin, , and NFTs. 

NOTE: The signer wallet here should be different from the wallet for your [DIMO Developer License](https://github.com/DIMO-Network/developer-license-donotus)

#### REST API Authentication

The SDK offers 3 basic functions that maps to the steps listed in [Wallet-based Authentication Flow](https://docs.dimo.zone/developer-platform/getting-started/authentication/wallet-based-authentication-flow): `generateChallenge`, `signChallenge`, and `submitChallenge`. You can use these accordingly depending on how you build your application.

```js
  const challenge = await dimo.auth.generateChallenge({
    client_id: '<client_id>',
    domain: '<domain>',
    address: '<0x_address>'
  });

  const signature = await dimo.auth.signChallenge({
    message: challenge.challenge, 
    privateKey: '<private_key>'
  });

  const tokens = await dimo.auth.submitChallenge({
    client_id: '<client_id>',
    domain: '<domain>',
    state: challenge.state,
    signature: signature
  });
```

As mentioned earlier, this is the streamlined function call to directly get the `access_token`:

```js
const authHeader = await dimo.auth.getToken({
  client_id: '<client_id>',
  domain: '<domain>',
  privateKey: '<private_key>',
  address: '<0x_address>'
});
```

Once you have the `authHeader`, you'll have access to the basic API endpoints. For endpoints that require the authorization headers, you can simply pass the results.

```js
// Pass the auth object to a protected endpoint
await dimo.user.get(auth);

// Pass the auth object to a protected endpoint with body parameters
await dimo.tokenexchange.exchange({
    ...auth,
    privileges: [4],
    tokenId: <vehicle_token_id>
});

```

### Querying the DIMO REST API
The SDK supports async await and your typical JS Promises. HTTP operations can be utilized in either ways:

```js
// Async Await
async function getAllDeviceMakes() {
  try {
    let response = await dimo.devicedefinitions.listDeviceMakes();
    // Do something with the response
  }
  catch (err) { /* ... */ }
}
getAllDeviceMakes();
```

```js
// JS Promises
dimo.devicedefinitions.listDeviceMakes().then((result) => {
    return result.device_makes.length;
  }).catch((err) => {
  /* ...handle the error... */
});
```

#### Query Parameters

For query parameters, simply feed in an input that matches with the expected query parameters:
```js
dimo.devicedefinitions.getByMMY({
    make: '<vehicle_make>',
    model: '<vehicle_model',
    year: 2021
});
```
#### Path Parameters

For path parameters, simply feed in an input that matches with the expected path parameters:
```js
dimo.devicedefinitions.getById({ id: '26G4j1YDKZhFeCsn12MAlyU3Y2H' })
```

#### Body Parameters

#### Privilege Tokens

As the 2nd leg of the API authentication, applications may exchange for short-lived privilege tokens for specific vehicles that granted privileges to the app. This uses the [DIMO Token Exchange API](https://docs.dimo.zone/developer-platform/api-references/dimo-protocol/token-exchange-api/token-exchange-api-endpoints).

Typically, any endpoints that uses a NFT `tokenId` in path parameters will require privilege tokens. You can get the privilege token and pipe it through to corresponding endpoints like this:  

```js
const privToken = await dimo.tokenexchange.exchange({
    ...auth,
    privileges: [1],
    tokenId: <vehicle_token_id>
});

await dimo.devicedata.getVehicleStatus({
    ...privToken,
    tokenId: <vehicle_token_id>
});
```

### Querying the DIMO Identity GraphQL API

The SDK accepts any type of valid custom GraphQL queries, but we've also included a few sample queries, namely `countDimoVehicles`, `listVehicleDefinitionsPerAddress`, and `getVehicleDetailsByTokenId` to help you understand the DIMO Identity API. 

#### Send a custom GraphQL query
To send a custom GraphQL query, you can simply call the `makeGraphqlRequest` function and pass in any valid GraphQL query. To check whether your GraphQL query is valid, please visit our [Identity API GraphQL Playground](https://identity-api.dimo.zone/).

```js
const query = `{ 
    vehicles (first:10) {
      totalCount
    }
}`;

const totalNetworkVehicles = await dimo.makeGraphqlRequest(query);

```

## How to Contribute to the SDK
Read more about contributing [here](https://github.com/DIMO-Network/dimo-node-sdk/blob/master/CONTRIBUTING.md).