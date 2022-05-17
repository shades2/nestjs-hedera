import { DynamicModule } from '@nestjs/common';
import { Operator } from '../types/operator.types';
import { MirrorNode } from '../types/mirror.types';
export declare class HederaModule {
    static forRoot(operators: Array<Operator>, mirrorNode: MirrorNode, network: 'mainnet' | 'testnet'): DynamicModule;
}
