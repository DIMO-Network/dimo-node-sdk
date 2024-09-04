// import axios from "axios";
// import { Method } from "./Method"; // Import the Method function to be tested
// import { DimoError } from "../utils/error";

// const PROD = "Production";
// const DEV = "Dev";
// const RESOURCE = {
//   method: "GET",
//   path: "",
//   queryParams: { param1: true },
// };
// const PARAM = { param1: "value1" };

// describe("Method Function", () => {
//   test("Valid API Call - Device Data API Server is up and returning data", async () => {
//     jest.spyOn(axios, "request").mockResolvedValue({ data: { key: "value" } });

//     const devResponse = await Method(RESOURCE, DimoEnvironment.Dev.DeviceData, PARAM);
//     const prodResponse = await Method(RESOURCE, DimoEnvironment.Production.DeviceData, PARAM, PROD);

//     // Assertion - Check if the response data is returned correctly
//     expect(devResponse).toEqual({ code: 200, message: "Server is up." });
//     expect(prodResponse).toEqual({ code: 200, message: "Server is up." });
//   });

//   test("Valid API Call - Device Definitions API Server is up and returning data", async () => {
//     jest.spyOn(axios, "request").mockResolvedValue({ data: { key: "value" } });

//     const devResponse = await Method(RESOURCE, DimoEnvironment.Dev.DeviceDefinitions, PARAM, DEV);
//     const prodResponse = await Method(RESOURCE, DimoEnvironment.Production.DeviceDefinitions, PARAM, PROD);

//     // Assertion - Check if the response data is returned correctly
//     expect(devResponse).toEqual("device definitions api running!");
//     expect(prodResponse).toEqual("device definitions api running!");
//   });

//   test("Valid API Call - Devices API Server is up and returning data", async () => {
//     jest.spyOn(axios, "request").mockResolvedValue({ data: { key: "value" } });

//     const devResponse = await Method(RESOURCE, DimoEnvironment.Dev.Devices, PARAM, DEV);
//     const prodResponse = await Method(RESOURCE, DimoEnvironment.Production.Devices, PARAM, PROD);

//     // Assertion - Check if the response data is returned correctly
//     expect(devResponse).toEqual({ data: "Server is up and running" });
//     expect(prodResponse).toEqual({ data: "Server is up and running" });
//   });

//   test("Valid API Call - Events API Server is up and returning data", async () => {
//     jest.spyOn(axios, "request").mockResolvedValue({ data: { key: "value" } });

//     const devResponse = await Method(RESOURCE, DimoEnvironment.Dev.Events, PARAM, DEV);
//     const prodResponse = await Method(RESOURCE, DimoEnvironment.Production.Events, PARAM, PROD);

//     // Assertion - Check if the response data is returned correctly
//     expect(devResponse).toEqual({ data: "Server is up and running" });
//     expect(prodResponse).toEqual({ data: "Server is up and running" });
//   });

//   test("Valid API Call - Token Exchange API Server is up and returning data", async () => {
//     jest.spyOn(axios, "request").mockResolvedValue({ data: { key: "value" } });

//     const devResponse = await Method(RESOURCE, DimoEnvironment.Dev.TokenExchange, PARAM, DEV);
//     const prodResponse = await Method(RESOURCE, DimoEnvironment.Production.TokenExchange, PARAM, PROD);

//     // Assertion - Check if the response data is returned correctly
//     expect(devResponse).toEqual({ data: "Server is up and running" });
//     expect(prodResponse).toEqual({ data: "Server is up and running" });
//   });

//   test("Valid API Call - Users API Server is up and returning data", async () => {
//     jest.spyOn(axios, "request").mockResolvedValue({ data: { key: "value" } });

//     const devResponse = await Method(RESOURCE, DimoEnvironment.Dev.User, PARAM, DEV);
//     const prodResponse = await Method(RESOURCE, DimoEnvironment.Production.User, PARAM, PROD);

//     // Assertion - Check if the response data is returned correctly
//     expect(devResponse).toEqual({ data: "Server is up and running" });
//     expect(prodResponse).toEqual({ data: "Server is up and running" });
//   });

//   test("Valid API Call - Valuations API Server is up and returning data", async () => {
//     jest.spyOn(axios, "request").mockResolvedValue({ data: { key: "value" } });

//     const devResponse = await Method(RESOURCE, DimoEnvironment.Dev.Valuations, PARAM, DEV);
//     const prodResponse = await Method(RESOURCE, DimoEnvironment.Production.Valuations, PARAM, PROD);

//     // Assertion - Check if the response data is returned correctly
//     expect(devResponse).toEqual({ code: 200, message: "Server is up." });
//     expect(prodResponse).toEqual({ code: 200, message: "Server is up." });
//   });

//   test("Valid API Call - Vehicle Signal Decoding API Server is up and returning data", async () => {
//     jest.spyOn(axios, "request").mockResolvedValue({ data: { key: "value" } });

//     const devResponse = await Method(RESOURCE, DimoEnvironment.Dev.VehicleSignalDecoding, PARAM, DEV);
//     const prodResponse = await Method(RESOURCE, DimoEnvironment.Production.VehicleSignalDecoding, PARAM, PROD);

//     // Assertion - Check if the response data is returned correctly
//     expect(devResponse).toEqual("healthy");
//     expect(prodResponse).toEqual("healthy");
//   });

//   test("Missing Required Query Parameter - Throws Error", async () => {
//     // Mock input data with missing required query parameter
//     const resource = {
//       method: "GET",
//       path: "/example/endpoint",
//       queryParams: { expectedParam: true }, // Expect expectedParam
//     };
//     const baseUrl = "https://example.com/api";
//     const params = { unexpectedParam: "value1" };

//     // Call the Method function and expect it to throw an error
//     await expect(Method(resource, baseUrl, params, DEV)).rejects.toThrowError(DimoError);
//     await expect(Method(resource, baseUrl, params, PROD)).rejects.toThrowError(DimoError);
//   });
// });
