import { Resource } from "../../Resource";

export class Attestation extends Resource {
  constructor(api: any) {
    super(api, "Attestation");
    this.setResource({
      createVinVC: {
        method: "POST",
        path: "/v1/vc/vin/:tokenId",
        auth: "privilege_token",
      },
      createPomVC: {
        method: "POST",
        path: "/v1/vc/pom/:tokenId",
        auth: "privilege_token",
      },
    });
  }
}
