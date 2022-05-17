import { Module } from '@nestjs/common';
import { KeysService } from './keys.service';

@Module({
  controllers: [],
  providers: [KeysService],
  exports: [KeysService]
})
export class KeysModule {}
