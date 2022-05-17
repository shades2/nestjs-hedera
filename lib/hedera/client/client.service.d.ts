import { Client } from '@hashgraph/sdk';
import { Operator } from '../../types/operator.types';
import { HederaOptions } from '../../types/hedera_options.types';
export declare class ClientService {
    private hederaOptions;
    private client;
    private operator;
    private operators;
    private network;
    private logger;
    constructor(hederaOptions: HederaOptions);
    getClient(): Client;
    getNodeOperator(): Operator;
}
