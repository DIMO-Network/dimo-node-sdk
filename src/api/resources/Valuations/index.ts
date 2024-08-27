import { Resource } from "../../Resource";
import { DimoEnvironment } from "../../../environments";

export class Valuations extends Resource {
  constructor(api: any) {
    super(api, "Valuations");
    this.setResource({
      getValuations: {
        method: "GET",
        path: "/v1/user/devices/:userDeviceId/valuations",
        auth: "access_token",
      },
      getInstantOffers: {
        method: "GET",
        path: "/v1/user/devices/:userDeviceId/instant-offer",
        auth: "access_token",
      },
      getOffers: {
        method: "GET",
        path: "/v1/user/devices/:userDeviceId/offers",
        auth: "access_token",
      },
    });
  }
}
