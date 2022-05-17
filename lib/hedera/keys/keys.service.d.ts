import { Logger } from '@nestjs/common';
import { PrivateKey } from '@hashgraph/sdk';
import { PrivateKeyList } from '../../types/private-key-list.types';
export declare class KeysService {
    protected logger: Logger;
    constructor();
    generateKey(): Promise<PrivateKey>;
    generateKeyList(publicKeys?: string[], length?: number, threshold?: number): Promise<PrivateKeyList>;
}
