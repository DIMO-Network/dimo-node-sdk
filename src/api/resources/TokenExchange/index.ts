import { Resource } from '../../Resource';
import { DimoConstants } from '../../../constants';
import { DimoEnvironment } from 'environments';

export class TokenExchange extends Resource {

    constructor(api: any, env: keyof typeof DimoEnvironment) {
        super(api, 'TokenExchange', env);
        this.setResource({
            exchange: {
                method: 'POST',
                path: '/v1/tokens/exchange',
                body: {
                    nftContractAddress: DimoConstants[env].NFT_address,
                    privileges: true,
                    tokenId: true
                },
                auth: 'access_token',
                return: 'privilege_token'
            }
        })
    }
}