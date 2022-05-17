import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { ClientModule } from '../client/client.module';
import { RestModule } from '../rest/rest.module';
import { KeysModule } from '../keys/keys.module';
import { HtsModule } from '../hts/hts.module';

@Module({
  imports: [ClientModule, RestModule, KeysModule, HtsModule],
  controllers: [],
  providers: [AccountsService],
  exports: [AccountsService]
})
export class AccountsModule {}
