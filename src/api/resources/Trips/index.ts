import { Resource } from "../../Resource";

export class Trips extends Resource {
  constructor(api: any) {
    super(api, "Trips");
    this.setResource({
      list: {
        method: "GET",
        path: "/v1/vehicle/:tokenId/trips",
        queryParams: {
          page: false,
        },
        auth: "privilege_token",
      },
    });
  }
}
