![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/dimo-network/dimo-node-sdk/npm-publish.yml?style=flat-square)
![GitHub top language](https://img.shields.io/github/languages/top/dimo-network/dimo-node-sdk?style=flat-square)
![GitHub License](https://img.shields.io/github/license/dimo-network/dimo-node-sdk?style=flat-square)
[![Downloads](https://img.shields.io/npm/d18m/@dimo-network/dimo-node-sdk.svg?style=flat-square)](https://www.npmjs.com/package/@dimo-network/dimo-node-sdk)
[![Discord](https://img.shields.io/discord/892438668453740634)](https://chat.dimo.zone/)
![X (formerly Twitter) URL](https://img.shields.io/twitter/url?url=https%3A%2F%2Ftwitter.com%2FDIMO_Network&style=social)

# DIMO NodeJS Developer SDK
This is an official DIMO Developer SDK written in NodeJS/TypeScript. The objective of this project is to make our API more accessible to the general public. DIMO also offers a bounty program for SDK contributions, please fill [this form and select Developer](https://dimo.zone/contact) to contact us for more information.

## Installation
Use [npm](https://www.npmjs.com/package/@dimo-network/dimo-node-sdk):
```bash
npm install @dimo-network/dimo-node-sdk
```

or use [yarn](https://classic.yarnpkg.com/en/package/@dimo-network/dimo-node-sdk) instead:

```bash
yarn add @dimo-network/dimo-node-sdk
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
### Developer License
As part of the authentication process, you will need to register a set of `client_id` and `redirect_uri` (aka `domain`) on the DIMO Network. The [DIMO Developer License](https://docs.dimo.zone/developer-platform/getting-started/developer-license) is our approach and design to a more secured, decentralized access control. As a developer, you will need to perform the following steps:

1. [Approving the Dev License to use of $DIMO](https://docs.dimo.zone/developer-platform/getting-started/developer-license/licensing-process#step-1-approving-the-dev-license-to-use-of-usddimo)
2. [Issue the Dev License](https://docs.dimo.zone/developer-platform/getting-started/developer-license/licensing-process#step-2-issue-the-dev-license) (Get a `client_id` assigned to you)
3. [Configuring the Dev License](https://docs.dimo.zone/developer-platform/getting-started/developer-license/licensing-process#step-3-configuring-the-dev-license) (Set `redirect_uri` aka `domain`)
4. [Enable Signer(s)](https://docs.dimo.zone/developer-platform/getting-started/developer-license/licensing-process#step-4-enable-signer-s), the `private_key` of this signer will be required for API access

### Authentication

In order to authenticate and access private API data, you will need to [authenticate with the DIMO Auth Server](https://docs.dimo.zone/developer-platform/getting-started/authentication). The SDK provides you with all the steps needed in the [Wallet-based Authentication Flow](https://docs.dimo.zone/developer-platform/getting-started/authentication/wallet-based-authentication-flow) in case you need it to build a wallet integration around it. We also offer expedited functions to streamline the multiple calls needed. 

#### Prerequisites for Authentication
1. A valid Developer License.
2. Access to a signer wallet and its private keys. Best practice is to rotate this frequently for security purposes.

> At its core, a Web3 wallet is a software program that stores private keys, which are necessary for accessing blockchain networks and conducting transactions. Unlike traditional wallets, which store physical currency, Web3 wallets store digital assets such as Bitcoin, Ethereum, and NFTs. 

NOTE: The signer wallet here is recommended to be different from the spender or holder wallet for your [DIMO Developer License](https://github.com/DIMO-Network/developer-license-donotus).

#### API Authentication

##### (Option 1) 3-Step Function Calls
The SDK offers 3 basic functions that maps to the steps listed in [Wallet-based Authentication Flow](https://docs.dimo.zone/developer-platform/getting-started/authentication/wallet-based-authentication-flow): `generateChallenge`, `signChallenge`, and `submitChallenge`. You can use them accordingly depending on how you build your application.

```js
  const challenge = await dimo.auth.generateChallenge({
    client_id: '<client_id>',
    domain: '<domain>',
    address: '<client_id>'
  });

  const signature = await dimo.auth.signChallenge({
    message: challenge.challenge, 
    private_key: '<private_key>'
  });

  const tokens = await dimo.auth.submitChallenge({
    client_id: '<client_id>',
    domain: '<domain>',
    state: challenge.state,
    signature: signature
  });
```
##### (Option 2) Auth Endpoint Shortcut Function
As mentioned earlier, this is the streamlined function call to directly get the `access_token`. The `address` field in challenge generation is omitted since it is essentially the `client_id` of your application per Developer License:

```js
const authHeader = await dimo.auth.getToken({
  client_id: '<client_id>',
  domain: '<domain>',
  private_key: '<private_key>',
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

##### (Option 3) Credentials.json File
By loading a valid `.credentials.json`, you can easily call `dimo.authenticate()` if you prefer to manage your credentials differently. Instead of calling the `Auth` endpoint, you would directly interact with the SDK main class.

Start by navigating to the SDK directory that was installed, if you used NPM, you can execute `npm list -g | dimo` to find the directory. In the root directory of the SDK, there will be `.credentials.json.example` - simply remove the `.example` extension to proceed with authentication:

```js
// After .credentials.json are provided
const authHeader = await dimo.authenticate();
// The rest would be the same as option 2
```

(We're reserving this as a function in the near future, where Build on DIMO Developer Console users will be able to export their credentials directly from the UI and work with the SDK)

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

For the end users of your application, they will need to share their vehicle permissions via the DIMO Mobile App or through your own implementation of privilege sharing functions - this should be built on the [`setPrivilege` function of the DIMO Vehicle Smart Contract](https://polygonscan.com/address/0xba5738a18d83d41847dffbdc6101d37c69c9b0cf#writeProxyContract).

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

### Querying the DIMO GraphQL API

The SDK accepts any type of valid custom GraphQL queries, but we've also included a few sample queries to help you understand the DIMO GraphQL APIs. 

#### Authentication for GraphQL API
The GraphQL entry points are designed almost identical to the REST API entry points. For any GraphQL API that requires auth headers (Telemetry API for example), you can use the same pattern as you would in the REST protected endpoints.

```js
const privToken = await dimo.tokenexchange.exchange({
    ...auth,
    privileges: [1, 3, 4],
    tokenId: <vehicle_token_id>
});

const tele = await dimo.telemetry.query({
  ...privToken,
  query: `
    query {
      some_valid_GraphQL_query
    }
  `
});
```

#### Send a custom GraphQL query
To send a custom GraphQL query, you can simply call the `query` function on any GraphQL API Endpoints and pass in any valid GraphQL query. To check whether your GraphQL query is valid, please visit our [Identity API GraphQL Playground](https://identity-api.dimo.zone/) or [Telemetry API GraphQL Playground](https://telemetry-api.dimo.zone/).

```js
const yourQuery = `{ 
    vehicles (first:10) {
      totalCount
    }
}`;

const totalNetworkVehicles = await dimo.identity.query({
  query: yourQuery
});

```

This GraphQL API query is equivalent to calling `dimo.identity.countDimoVehicles()`.

## How to Contribute to the SDK
Read more about contributing [here](https://github.com/DIMO-Network/dimo-node-sdk/blob/master/CONTRIBUTING.md).
