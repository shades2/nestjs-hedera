import { Module, DynamicModule } from '@nestjs/common';
import { RestService } from './rest.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { IHederaOptions } from '../../types/interfaces/hedera_options.types';

@Module({})
export class RestModule {
  static forRoot(options: IHederaOptions): DynamicModule {
    return {
      module: RestModule,
      imports: [HttpModule],
      providers: [
        {
          provide: 'hederaOptions',
          useValue: options,
        },
        RestService,
      ],
      exports: [RestService]
    }
  }

  static forRootAsync(options: any): DynamicModule {
    return {
      module: RestModule,
      imports: [HttpModule, ConfigModule],
      providers: [
        {
          provide: 'hederaOptions',
          useFactory: options.useFactory,
          inject: [options.useExisting]
        },       
        RestService,
      ],
      exports: [RestService]
    }
  }
}
