import { DynamicModule } from '@nestjs/common';
import { Operator } from '../../types/operator.types';
export declare class ClientModule {
    static forRoot(operators: Array<Operator>, network: 'mainnet' | 'testnet'): DynamicModule;
}
