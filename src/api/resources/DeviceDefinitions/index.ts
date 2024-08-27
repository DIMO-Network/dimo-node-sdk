import { Resource } from "../../Resource";
import { DimoEnvironment } from "../../../environments";

export class DeviceDefinitions extends Resource {
  constructor(api: any) {
    super(api, "DeviceDefinitions");
    this.setResource({
      getByMMY: {
        method: "GET",
        queryParams: {
          make: true,
          model: true,
          year: true,
        },
        path: "/device-definitions",
      },
      getById: {
        method: "GET",
        path: "/device-definitions/:id",
      },
      listDeviceMakes: {
        method: "GET",
        path: "/device-makes",
      },
      getDeviceTypeById: {
        method: "GET",
        path: "/device-types/:id",
      },
    });
  }
}
