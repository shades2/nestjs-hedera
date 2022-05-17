import { Module, DynamicModule } from '@nestjs/common';
import { Operator } from '../../types/operator.types';
import { ClientService } from './client.service';

@Module({})
export class ClientModule {
  static forRoot(operators: Array<Operator>, network: 'mainnet' | 'testnet'): DynamicModule {
    return {
      module: ClientModule,
      providers: [
        {
          provide: 'operators',
          useValue: operators,
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
