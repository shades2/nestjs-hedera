import { Injectable, Inject, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { IOperator } from '../../types/interfaces/operator.types';
import { IHederaOptions } from '../../types/interfaces/hedera_options.types';
import { AccountId, Client } from '@hashgraph/sdk';
import { IMirrorNode } from "../../types/interfaces/mirror.types";

/**
 * Injectable
 */
@Injectable()
export class ClientService {

  /**
   * Client
   */
  private client: Client;

  /**
   * Single IOperator
   */
  private operator: IOperator;

  /**
   * Array of IOperators
   */
  private operators: Array<IOperator>;

  /**
   * Network choice
   */
  private network: 'mainnet' | 'testnet' | 'custom';

  private custom: {
    node: { [key: string]: string | AccountId },
    mirror: string
  } = {
    node: null,
    mirror: null
  };

  private mirrorNode: IMirrorNode;

  /**
   * Logger Service
   */
  private logger: Logger = new Logger("Client Service");

  /**
   * Hedera Network variables
   * @param {IHederaOptions} hederaOptions 
   */
  constructor(
    @Inject('hederaOptions') private hederaOptions: IHederaOptions
  ) {
    this.network = this.hederaOptions.network;
    this.operators = this.hederaOptions.operators;
    this.custom.node = this.hederaOptions.custom.node;
    this.custom.mirror = this.hederaOptions.custom.mirror;

    // Create our connection to the Hedera network...
    this.client = this.getClient();
    this.operator = this.getNodeIOperator();
  }

  /**
   * If the client gives invalid node error...
   * @returns random operator...
   */
  @OnEvent('client.invalid_node_operator')
  getClient(): Client {
    switch(this.network)  {
      case 'testnet':
        this.client = Client.forTestnet();
        break;
      case 'mainnet':
        this.client = Client.forMainnet();
        break;
      case 'custom':
        this.client = Client.forNetwork(this.custom.node).setMirrorNetwork(this.custom.mirror);
        break;
    }

    this.operator = this.operators[Math.floor(Math.random() * this.operators.length)];
    this.client.setOperator(this.operator.accountId, this.operator.privateKey);
    return this.client;
  }

  /**
   * Gets a node operator
   * @returns {IOperator}
   */
  getNodeIOperator(): IOperator {
    return this.operator;
  }
}
