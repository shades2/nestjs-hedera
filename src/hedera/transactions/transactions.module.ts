import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsRestService } from './transactions-rest.service';
import { ClientModule } from '../client/client.module';
import { RestModule } from '../rest/rest.module';

@Module({
  imports: [ClientModule, RestModule],
  controllers: [],
  providers: [TransactionsService, TransactionsRestService],
  exports: [TransactionsService, TransactionsRestService]
})
export class TransactionsModule {}
