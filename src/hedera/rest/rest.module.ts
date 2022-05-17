import { Module, DynamicModule } from '@nestjs/common';
import { RestService } from './rest.service';
import { HttpModule } from '@nestjs/axios';
import { MirrorNode } from '../../types/mirror.types';

@Module({})
export class RestModule {
  static forRoot(mirrorNode: MirrorNode): DynamicModule {
    return {
      module: RestModule,
      imports: [HttpModule],
      providers: [
        {
          provide: 'mirrorNode',
          useValue: mirrorNode,
        },
        RestService,
      ],
      exports: [RestService]
    }
  }
}
