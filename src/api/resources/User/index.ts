import { Resource } from '../../Resource';
import { DimoEnvironment } from 'environments';

export class User extends Resource {
    
    constructor(api: any, env: keyof typeof DimoEnvironment) {
        super(api, 'User', env);
        this.setResource({
            get: {
                method: 'GET',
                path: '/v1/user',
                auth: 'access_token'
            },
            update: {
                method: 'PUT',
                path: '/v1/user',
                body: {
                    'userUpdateRequest': true
                },
                auth: 'access_token'
            },
            delete: {
                method: 'DELETE',
                path: '/v1/user',
                auth: 'access_token'
            },
            sendConfirmationEmail: {
                method: 'POST',
                path: '/v1/user/send-confirmation-email',
                auth: 'access_token'
            },
            confirmEmail: {
                method: 'POST',
                path: 'v1/user/confirm-email',
                body: {
                    confirmEmailRequest: true
                },
                auth: 'access_token'
            }
        })
    }
        
}