import { Client } from '@hashgraph/sdk';
import { Operator } from '../../types/operator.types';
export declare class ClientService {
    private operator;
    private network;
    private client;
    private logger;
    constructor(operator: Operator, network: 'mainnet' | 'testnet');
    generateNewClient(): Client;
    getClient(): Client;
    getNodeOperator(): Operator;
}
