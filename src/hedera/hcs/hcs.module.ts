import { Module } from '@nestjs/common';
import { HcsService } from './hcs.service';
import { ClientModule } from '../client/client.module';
import { RestModule } from '../rest/rest.module';

@Module({
  imports: [ClientModule, RestModule],
  controllers: [],
  providers: [HcsService],
  exports: [HcsService]
})
export class HcsModule {}
