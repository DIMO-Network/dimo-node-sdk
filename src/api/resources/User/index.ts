import { Resource } from '../../Resource';
import { DimoEnvironment } from 'environments';

export class User extends Resource {
    
    constructor(api: any, env: keyof typeof DimoEnvironment) {
        super(api, 'User', env);
        this.setResource({
            get: {
                method: 'GET',
                path: '/v1/user',
                auth: 'web3'
            },
            update: {
                method: 'PUT',
                path: '/v1/user',
                body: {
                    'userUpdateRequest': true
                },
                auth: 'web3'
            },
            delete: {
                method: 'DELETE',
                path: '/v1/user',
                auth: 'web3'
            },
            sendConfirmationEmail: {
                method: 'POST',
                path: '/v1/user/send-confirmation-email',
                auth: 'web3'
            },
            confirmEmail: {
                method: 'POST',
                path: 'v1/user/confirm-email',
                body: {
                    confirmEmailRequest: true
                },
                auth: 'web3'
            }
        })
    }
        
}