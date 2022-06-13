import { Injectable, Inject, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Operator } from '../../types/operator.types';
import { HederaOptions } from '../../types/hedera_options.types';
import { AccountId, Client } from '@hashgraph/sdk';
import { MirrorNode } from "../../types/mirror.types";

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
   * Single Operator
   */
  private operator: Operator;

  /**
   * Array of Operators
   */
  private operators: Array<Operator>;

  /**
   * Network choice
   */
  private network: 'mainnet' | 'testnet' | 'custom';

  private customNode: { [key: string]: string | AccountId };
  private mirrorNode: MirrorNode;

  /**
   * Logger Service
   */
  private logger: Logger = new Logger("Client Service");

  /**
   * Hedera Network variables
   * @param {HederaOptions} hederaOptions 
   */
  constructor(
    @Inject('hederaOptions') private hederaOptions: HederaOptions
  ) {
    this.network = this.hederaOptions.network;
    this.operators = this.hederaOptions.operators;
    this.customNode = this.hederaOptions.customNode;
    this.mirrorNode = this.hederaOptions.mirrorNode;

    // Create our connection to the Hedera network...
    this.client = this.getClient();
    this.operator = this.getNodeOperator();
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
        this.client = Client.forNetwork(this.customNode).setMirrorNetwork(this.mirrorNode.url);
        break;
    }

    this.operator = this.operators[Math.floor(Math.random() * this.operators.length)];
    this.client.setOperator(this.operator.accountId, this.operator.privateKey);
    return this.client;
  }

  /**
   * Gets a node operator
   * @returns {Operator}
   */
  getNodeOperator(): Operator {
    return this.operator;
  }
}
