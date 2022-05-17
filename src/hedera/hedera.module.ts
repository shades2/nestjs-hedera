import { Module, DynamicModule } from '@nestjs/common';
import { HederaService } from './hedera.service';
import { KeysModule } from './keys/keys.module';
import { TransactionsModule } from './transactions/transactions.module';
import { ClientModule } from './client/client.module';
import { RestModule } from './rest/rest.module';
import { Operator } from '../types/operator.types';
import { MirrorNode } from '../types/mirror.types';
import { HcsModule } from './hcs/hcs.module';
import { HfsModule } from './hfs/hfs.module';
import { HtsModule } from './hts/hts.module';
// import { AccountsModule } from './accounts/accounts.module';

@Module({})
export class HederaModule {
  static forRoot(operator: Operator, mirrorNode: MirrorNode, network: 'mainnet' | 'testnet'): DynamicModule {
    return {
      module: HederaModule,
      imports: [
        KeysModule, 
        ClientModule.forRoot(operator, network), 
        RestModule.forRoot(mirrorNode),
        TransactionsModule,
        HcsModule,
        HfsModule, 
        HtsModule,
        // AccountsModule    
      ],
      providers: [HederaService],
      exports: [
        HederaService,
        KeysModule, 
        ClientModule.forRoot(operator, network), 
        RestModule.forRoot(mirrorNode),
        TransactionsModule,
        HcsModule,
        HfsModule,
        HtsModule,
        // AccountsModule         
      ],
      global: true
    }
  }
}
