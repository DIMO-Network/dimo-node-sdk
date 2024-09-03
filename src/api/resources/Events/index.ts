import { Resource } from "../../Resource";
import { DimoEnvironment } from "../../../environments";

export class Events extends Resource {
  constructor(api: any) {
    super(api, "Events");
    this.setResource({
      list: {
        method: "GET",
        path: "/v1/events",
        auth: "access_token",
      },
    });
  }
}
