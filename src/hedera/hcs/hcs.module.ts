import { Module } from '@nestjs/common';
import { HcsService } from './hcs.service';
import { ClientModule } from '../client/client.module';
import { RestModule } from '../rest/rest.module';
import { HcsRestService } from './hcs-rest.service';

@Module({
  imports: [ClientModule, RestModule],
  controllers: [],
  providers: [HcsService, HcsRestService],
  exports: [HcsService, HcsRestService]
})
export class HcsModule {}
