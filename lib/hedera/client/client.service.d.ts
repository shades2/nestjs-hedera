import { IOperator } from '../../types/interfaces/operator.types';
import { IHederaOptions } from '../../types/interfaces/hedera_options.types';
import { AccountId, Client } from '@hashgraph/sdk';
/**
 * Injectable
 */
export declare class ClientService {
    private hederaOptions;
    /**
     * Client
     */
    private client;
    /**
     * Single IOperator
     */
    private operator;
    /**
     * Array of IOperators
     */
    private operators;
    /**
     * Network choice
     */
    private network;
    private custom;
    private mirrorNode;
    /**
     * Logger Service
     */
    private logger;
    /**
     * Hedera Network variables
     * @param {IHederaOptions} hederaOptions
     */
    constructor(hederaOptions: IHederaOptions);
    /**
     * If the client gives invalid node error...
     * @returns random operator...
     */
    getClient(): Client;
    /**
     * Gets a node operator
     * @returns {IOperator}
     */
    getNodeOperator(): IOperator;
    getRandomNodeForNetwork(): AccountId;
}
