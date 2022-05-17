import { Module, DynamicModule } from '@nestjs/common';
import { Operator } from '../../types/operator.types';
import { ClientService } from './client.service';
import { ConfigModule } from '@nestjs/config';
import { HederaOptions } from '../../types/hedera_options.types';

@Module({})
export class ClientModule {
  static forRoot(options: HederaOptions): DynamicModule {
    return {
      module: ClientModule,
      providers: [
        {
          provide: 'hederaOptions',
          useValue: options,
        },
        ClientService,
      ],
      exports: [ClientService]
    }
  }

  static forRootAsync(options: any): DynamicModule {
    return {
      module: ClientModule,
      imports: [ConfigModule],
      providers: [
        {
          provide: 'hederaOptions',
          useFactory: options.useFactory,
          inject: [options.useExisting]
        },       
        ClientService,
      ],
      exports: [ClientService]
    }
  }
}
