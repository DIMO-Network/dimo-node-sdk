import axios from "axios";
import { CustomQuery, Query } from "./Query"; // Import the Query function to be tested
import { DimoError } from "utils/error";
import { ENV_TO_API_MAPPING } from "utils/constants";
import { DIMO_APIs, ENVIRONMENT } from "utils/types";

const RESOURCE = {
  method: "POST",
  path: "",
  queryParams: { param1: true },
};
const PARAM = {
  query: `{
    vehicles (first:10) {
      totalCount
    }
}`,
};

// describe("Query Function", () => {
//   test("Valid API Call - Identity API Server is up and returning data", async () => {
//     jest.spyOn(axios, "request").mockResolvedValue({
//       query: `{
//             vehicles (first:10) {
//               totalCount
//             }
//         }`,
//     });

//     // const url = ENV_TO_API_MAPPING[CHAIN_TO_NETWORK_ENUM_MAPPING.get(config.chain.name) as SupportedNetworks];

//     const devResponse = await CustomQuery(
//       RESOURCE,
//       ENV_TO_API_MAPPING[ENVIRONMENT.PROD][DIMO_APIs.IDENTITY].url,
//       PARAM
//     );
//     const prodResponse = await CustomQuery(RESOURCE, DimoEnvironment.Production.Identity, PARAM);

//     // Assertion - Check if the response data is defined
//     expect(devResponse.data).toBeDefined();
//     expect(prodResponse.data).toBeDefined();
//   });

//   test("Missing Required Query Parameter - Throws Error", async () => {
//     // Mock input data with missing required query parameter
//     const devResource = {
//       Query: "POST",
//       path: "",
//       queryParams: { expectedParam: true },
//     };
//     const prodResource = {
//       Query: "POST",
//       path: "",
//       queryParams: { expectedParam: true },
//     };
//     const params = { unexpectedParam: "value1" };

//     // Call the Query function and expect it to throw an error
//     await expect(Query(devResource, DimoEnvironment.Dev.Identity, params)).rejects.toThrow(DimoError);
//     await expect(Query(prodResource, DimoEnvironment.Production.Identity, params)).rejects.toThrow(DimoError);
//     await expect(Query(devResource, DimoEnvironment.Dev.Telemetry, params)).rejects.toThrow(DimoError);
//     await expect(Query(prodResource, DimoEnvironment.Production.Telemetry, params)).rejects.toThrow(DimoError);
//   });
// });
