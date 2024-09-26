import { DIMO } from '../../dimo';
import { DimoEnvironment } from '../../environments';

export const getToken = async(input: { client_id: string, domain: string, private_key: string, address: string }, env: keyof typeof DimoEnvironment) => {
    const sdk = new DIMO(env);

    const challenge = await sdk.auth.generateChallenge({
        client_id: input.client_id,
        domain: input.domain,
        address: input.client_id
    });

    const sign = await sdk.auth.signChallenge({
        message: challenge.challenge, 
        private_key: input.private_key
    });

    const submit = await sdk.auth.submitChallenge({
        client_id: input.client_id,
        domain: input.domain,
        state: challenge.state,
        signature: sign
    });

    return submit;
}