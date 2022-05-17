import { DynamicModule } from '@nestjs/common';
import { HederaOptions } from '../../types/hedera_options.types';
export declare class ClientModule {
    static forRoot(options: HederaOptions): DynamicModule;
    static forRootAsync(options: any): DynamicModule;
}
