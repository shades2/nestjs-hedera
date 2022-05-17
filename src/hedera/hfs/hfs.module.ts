import { Module } from '@nestjs/common';
import { HfsService } from './hfs.service';
import { ClientModule } from '../client/client.module';

@Module({
  imports: [ClientModule],
  controllers: [],
  providers: [HfsService],
  exports: [HfsService]
})
export class HfsModule {}
