import { Resource } from "../../Resource";

export class Telemetry extends Resource {
  constructor(api: any) {
    super(api, "Telemetry");
    this.query({
      auth: "privilege_token",
      query: true,
    }),
      this.setQueries({
        getLatestSignals: {
          auth: "privilege_token",
          params: {
            tokenId: true,
          },
          query: `
                query {
                    SignalsLatest(tokenID: $tokenId){
                        powertrainTransmissionTravelledDistance {
                            timestamp
                            value
                        }
                        exteriorAirTemperature {
                            timestamp
                            value
                        }
                        speed{
                            timestamp
                            value
                        }
                        powertrainType{
                            timestamp
                            value
                        }
                    }
                }`,
        },
      });
  }
}
