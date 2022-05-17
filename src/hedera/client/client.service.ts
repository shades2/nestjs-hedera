import { Injectable, Inject, Logger } from '@nestjs/common';
import { Client } from '@hashgraph/sdk';
import { OnEvent } from '@nestjs/event-emitter';
import { Operator } from '../../types/operator.types';

@Injectable()
export class ClientService {
  private client: Client;
  private operator: Operator;
  private logger: Logger = new Logger("Client Service");

  constructor(
    @Inject('operators') private operators: Array<Operator>,
    @Inject('network') private network: 'mainnet' | 'testnet',
  ) {
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

