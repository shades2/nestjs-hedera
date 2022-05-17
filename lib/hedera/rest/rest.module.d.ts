import { DynamicModule } from '@nestjs/common';
import { HederaOptions } from '../../types/hedera_options.types';
export declare class RestModule {
    static forRoot(options: HederaOptions): DynamicModule;
    static forRootAsync(options: any): DynamicModule;
}
