import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { ClientModule } from '../client/client.module';
import { RestModule } from '../rest/rest.module';
import { KeysModule } from '../keys/keys.module';
import { HtsModule } from '../hts/hts.module';
import { AccountsRestService } from './accounts-rest.service';

@Module({
  imports: [ClientModule, RestModule, KeysModule, HtsModule],
  controllers: [],
  providers: [AccountsService, AccountsRestService],
  exports: [AccountsService, AccountsRestService]
})
export class AccountsModule {}
