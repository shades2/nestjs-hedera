import { Injectable, Inject, Logger } from '@nestjs/common';
import { Client } from '@hashgraph/sdk';
import { OnEvent } from '@nestjs/event-emitter';
import { Operator } from '../../types/operator.types';
import { HederaOptions } from '../../types/hedera_options.types';

@Injectable()
export class ClientService {
  private client: Client;
  private operator: Operator;
  private operators: Array<Operator>;
  private network: 'mainnet' | 'testnet';
  private logger: Logger = new Logger("Client Service");

  constructor(
    @Inject('hederaOptions') private hederaOptions: HederaOptions
  ) {
    this.network = this.hederaOptions.network;
    this.operators = this.hederaOptions.operators;
    
    // Create our connection to the Hedera network...
    this.client = this.getClient();
    this.operator = this.getNodeOperator();
  }

  @OnEvent('client.invalid_node_operator')
  getClient(): Client {
    if (this.network == 'testnet') {
      this.client = Client.forTestnet();
    } else {
      this.client = Client.forMainnet();
    }
    
    this.operator = this.operators[Math.floor(Math.random() * this.operators.length)];
    this.client.setOperator(this.operator.accountId, this.operator.privateKey);
    return this.client;
  }

  getNodeOperator(): Operator {
    return this.operator;
  }  
}

