import { Client } from '@hashgraph/sdk';
import { Operator } from '../../types/operator.types';
export declare class ClientService {
    private operators;
    private network;
    private client;
    private operator;
    private logger;
    constructor(operators: Array<Operator>, network: 'mainnet' | 'testnet');
    getClient(): Client;
    getNodeOperator(): Operator;
}
