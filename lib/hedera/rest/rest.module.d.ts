import { DynamicModule } from '@nestjs/common';
import { MirrorNode } from '../../types/mirror.types';
export declare class RestModule {
    static forRoot(mirrorNode: MirrorNode): DynamicModule;
}
