import { Resource } from '../../Resource';
import { DimoEnvironment } from 'environments';

export class Telemetry extends Resource {
    constructor(api: any, env: keyof typeof DimoEnvironment) {
        super(api, 'Telemetry', env);
        this.query({
            auth: 'privilege_token',
            query: true,
        }), 
        this.setQueries({
            getLatestSignals: {
                auth: 'privilege_token',
                params: {
                    tokenId: true
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
                }`
            }
        })
    }

}