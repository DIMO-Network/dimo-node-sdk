# Contributing to DIMO SDK
Thank you for your interest in contributing to the DIMO Hello World repository! We're excited to collaborate with the community to expand the collection of examples showcasing the diverse capabilities of DIMO's platform, including our REST API, Streamr integration, GraphQL API, and more.

## REST API Resource Data Structure
In the SDK, each `functionName` maps to a specific path for an API endpoint, the `method` will be passed in the corresponding HTTP calls. The SDK supports CRUD operations for a REST API but also includes a `FUNCTION` method to call utility functions. Add `queryParams`, `body`, `headers`, `auth`, and `return` according to how the endpoint behaves.

- `body` and `queryParams`, : Sets the requirements for body or query parameters. Anything that is marked `true` will be required, whereas `false` marks it as optional. You can also pass in a fixed strings for constants. To source the value of one query parameter from another query parameter, you can simply prepend a `$` (i.e. `queryParam3: '$queryParam1'` fixes queryParam3 to whatever is passed in by the user in queryParam1).
- `headers`: Dynamically inserts header key-value pair, this is typically used when the endpoint accepts a specific header.
- `auth`: This defines whether the endpoint requires a `access_token` or a `privilege_token`.
- `return`: This defines what the endpoint returns for a more user-friendly experience. Only Auth endpoints will return `access_token`, and Token Exchange endpoint will return `privilege_token`. **You will likely not use this at all**.

```js
<functionName>: {
  method: '<GET|POST|PUT|PATCH|DELETE|FUNCTION>',
  path: '/<path>/:pathParameters' || '<functionName>',
  queryParams: {
    'queryParam1': false,
    'queryParam2': true,
    'queryParam3': '<queryParamValue>' || '<$queryParam1>'
  },
  body: {
    'bodyParam1': false,
    'bodyParam2': true,
    'bodyParam3': '<bodyValue>'
  },
  headers: {
    'headerKey': '<headerValue>'
  },
  auth: '<web3|privilege>',
  return: '<web3|privilege>'
}
```

## GraphQL API Resource Data Structure
Similarly in GraphQL, each `queryName` maps to a specific query that is pre-defined in GraphQL's query language.

- `params`: Defined when user inputs are required in the query.
- `query`: Outlines the query structure, and specifies where each defined `params` will be injected (at where `$` is prepended).

```js
<queryName>: {
  params: {
    param1: true,
    param2: true
  },
  query: `
    <actual_graphQL_query> { input1: $param1, input2: $param2 }
  `
}
```

## How to Contribute
Contributions can take many forms, from fixing typos in documentation to mapping new API endpoints. Here's how you can contribute:

### Reporting Issues
If you find a bug or have a suggestion for improving an existing example, please open an issue. Be as specific as possible and include:

1. A clear title and description
2. Steps to reproduce the issue, if applicable
3. Your ideas for solving the issue, if any

### Updating API Endpoints
1. Locate the endpoint under `/src/api/resources/<directory>/index.ts`
2. Under the `constructor`, locate a `this.setResource()` function call
3. Update the endpoint of interest accordingly

[Note] Some Vehicle Signal Decoding API endpoints uses `eth-addr` as one of the query parameters, for clarification and style purposes, please use `address` as the key when you pass a query parameter.

### Updating SDK Functions
1. Locate the functions under `/src/api/functions`
2. Update existing functions or create new functions
3. Export the modified function(s) in `/src/api/functions/index.ts`
4. Locate the resource mapping under `/src/api/resources/<directory>/index.ts`
5. Apply the new changes under `this.setResource()` function call

### Updating GraphQL Queries
1. Locate the queries under `/src/graphql/resources/<directory>/index.ts`
2. Under the `constructor`, locate a `this.setQueries()` function call
3. Update the query of interest accordingly

### Translating the README
DIMO welcomes translation work done on the SDK.