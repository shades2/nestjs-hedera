import { Injectable, Inject, Logger } from '@nestjs/common';
import { Client } from '@hashgraph/sdk';
import { OnEvent } from '@nestjs/event-emitter';
import { Operator } from '../../types/operator.types';

@Injectable()
export class ClientService {
  private client: Client;
  private logger: Logger = new Logger("Client Service");

  constructor(
    @Inject('operator') private operator: Operator,
    @Inject('network') private network: 'mainnet' | 'testnet',
  ) {
    // Create our connection to the Hedera network...
    this.client = this.generateNewClient();
  }

  @OnEvent('client.invalid_node_operator')
  generateNewClient() {
    if (this.network == 'testnet') {
      this.client = Client.forTestnet();
    } else {
      this.client = Client.forMainnet();
    }
    
    this.client.setOperator(this.operator.accountId, this.operator.privateKey);
    return this.client;
  }

  getClient(): Client {
    return this.client;
  }

  getNodeOperator(): Operator {
    return this.operator;
  }  
}

