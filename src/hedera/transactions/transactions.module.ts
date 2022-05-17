import { Module, DynamicModule } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsRestService } from './transactions-rest.service';
import { ClientModule } from '../client/client.module';
import { RestModule } from '../rest/rest.module';
import { Operator } from '../../types/operator.types';
import { MirrorNode } from '../../types/mirror.types';

@Module({})
export class TransactionsModule {
  static forRoot(operator: Operator, mirrorNode: MirrorNode, network: 'mainnet' | 'testnet'): DynamicModule {
    return {
      module: TransactionsModule,
      imports: [
        ClientModule.forRoot(operator, network), 
        RestModule.forRoot(mirrorNode)  
      ],
      providers: [TransactionsService, TransactionsRestService],
      exports: [TransactionsService, TransactionsRestService]
    }
  }
}
