import { Web3 } from 'web3';
import { DimoConstants } from '../../constants';
import { DimoEnvironment } from 'environments';

export async function signChallenge(input: { message: string, privateKey: string }, env: keyof typeof DimoEnvironment) {
    const web3 = new Web3(DimoConstants[env].RPC_provider);
    const formattedKey = '0x' + Buffer.from(input.privateKey, 'utf8');
    const response = web3.eth.accounts.sign(input.message, formattedKey);
    return response.signature;
}