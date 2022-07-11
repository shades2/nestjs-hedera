import { DynamicModule } from '@nestjs/common';
import { IHederaOptions } from '../../types/interfaces/hedera_options.types';
export declare class ClientModule {
    static forRoot(options: IHederaOptions): DynamicModule;
    static forRootAsync(options: any): DynamicModule;
}
