import { AccountId, AccountInfo, PrivateKey, Status, TokenId } from '@hashgraph/sdk';
import { Logger } from '@nestjs/common';
import { ClientService } from '../client/client.service';
import { KeysService } from '../keys/keys.service';
import { AccountBalance } from '../../types/account_balance.types';
import { PrivateKeyList } from '../../types/private-key-list.types';
export declare class AccountsService {
    private clientService;
    private keysService;
    protected logger: Logger;
    constructor(clientService: ClientService, keysService: KeysService);
    getInfo(accountId: AccountId): Promise<AccountInfo>;
    getKeys(accountId: AccountId): Promise<any>;
    updateAccount(accountId: AccountId, signKey: PrivateKey, newKey?: PrivateKey, memo?: string): Promise<Status>;
    createAccount(balance: number, keysLength: number, publicKeys?: Array<string>, keysThreshold?: number): Promise<{
        accountId: AccountId | null;
        key: PrivateKey | PrivateKeyList;
    }>;
    freezeAccount(accountId: AccountId, tokenId: TokenId, freezeKey: string): Promise<any>;
    unfreezeAccount(accountId: AccountId, tokenId: TokenId, freezeKey: string): Promise<any>;
    getQueryBalance(accountId: string | AccountId, tokenId?: string): Promise<AccountBalance>;
}
