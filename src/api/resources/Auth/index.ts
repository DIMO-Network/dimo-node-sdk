import { Resource } from '../../Resource';
import { DimoEnvironment } from 'environments';

export class Auth extends Resource {

    constructor(api: any, env: keyof typeof DimoEnvironment) {
        super(api, 'Auth', env);
        this.setResource({
            generateChallenge: {
                method: 'POST',
                path: '/auth/web3/generate_challenge',
                queryParams: {
                    'client_id': true,
                    'domain': true,
                    'scope': 'openid email',
                    'response_type': 'code',
                    'address': '$client_id'
                }
            },
            signChallenge: {
                method: 'FUNCTION',
                path: 'signChallenge'
            },
            submitChallenge: {
                method: 'POST',
                path: '/auth/web3/submit_challenge',
                body: {
                    'client_id': true,
                    'domain': true,
                    'grant_type': 'authorization_code',
                    'state': true,
                    'signature': true
                },
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                return: 'access_token'
            },
            getToken: {
                method: 'FUNCTION',
                path: 'getToken'
            }
        })
    }
        
}