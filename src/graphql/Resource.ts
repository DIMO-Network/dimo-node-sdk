import { CustomQuery, Query } from "./Query";
import { DimoEnvironment } from "../environments";

export interface Resource {
  [key: string]: (...args: any) => any;
}

export class Resource {
  public api: any;
  public resourceName: any;

  constructor(api: any, resourceName: string) {
    this.api = api;
    this.resourceName = resourceName;
  }

  protected setQueries(resources: any): void {
    Object.keys(resources).forEach((key) => {
      this[key] = (params: any = {}) =>
        Query(
          resources[key], // Setup the endpoint resources
          this.api, // Setup the base URL
          params // Pass through the params
        );
    });
  }

  /**
   * Custom GraphQL Queries
   * @param resources
   */
  query(resources: any): void {
    Object.keys(resources).forEach((key) => {
      this[key] = (params: any = {}) =>
        CustomQuery(
          resources, // Setup the endpoint resources
          this.api, // Setup the base URL
          params // Pass through the params
        );
    });
  }
}
