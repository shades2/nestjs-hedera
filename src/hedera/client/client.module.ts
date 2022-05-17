import { Module, DynamicModule } from '@nestjs/common';
import { Operator } from '../../types/operator.types';
import { ClientService } from './client.service';

@Module({})
export class ClientModule {
  static forRoot(operator: Operator, network: 'mainnet' | 'testnet'): DynamicModule {
    return {
      module: ClientModule,
      providers: [
        {
          provide: 'operator',
          useValue: operator,
        },
        {
          provide: 'network',
          useValue: network
        },
        ClientService,
      ],
      exports: [ClientService]
    }
  }
}
