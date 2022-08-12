import { AccountId, AccountInfo, PrivateKey, Status, TokenId } from '@hashgraph/sdk';
import { Logger } from '@nestjs/common';
import { ClientService } from '../client/client.service';
import { KeysService } from '../keys/keys.service';
import { IAccountBalance } from '../../types/interfaces/account_balance.types';
import { IPrivateKeyList } from '../../types/interfaces/private-key-list.types';
/**
 * Injectable
 */
export declare class AccountsService {
    private clientService;
    private keysService;
    /**
    * Logger Service
    */
    protected logger: Logger;
    /**
     * Constructor
     * @param {ClientService} clientService
     * @param {KeysService} keysService
     */
    constructor(clientService: ClientService, keysService: KeysService);
    /**
     * Fetches specific Account Info
     * @param {AccountId} accountId
     * @returns {AccountInfo}
     */
    getInfo(accountId: AccountId): Promise<AccountInfo>;
    /**
   * Fetches Specific account public key
   * @param {AccountId} accountId
   * @returns {any} Account Public Key
   */
    getKeys(accountId: AccountId): Promise<any>;
    /**
     * Updates Account
     * @param {AccountId} accountId
     * @param {PrivateKey} signKey
     * @param {PrivateKey} newKey
     * @param {string} memo
     * @returns {Status} Account Update
     */
    updateAccount(accountId: AccountId, signKey: PrivateKey, newKey?: PrivateKey, memo?: string, maxAutomaticTokenAssociations?: number, isReceiverSignatureRequired?: boolean, isOfflineTransaction?: boolean): Promise<Status | any>;
    /**
   * Creates a single or multi-sig account
   * @param {number} balance
   * @param {number} keysLength
   * @param {number} keysThreshold
   * @returns {AccountId, PrivateKey} single or multi-sig account
   */
    createAccount(balance: number, keysLength: number, publicKeys?: Array<string>, keysThreshold?: number, maxAutomaticTokenAssociations?: number, isReceiverSignatureRequired?: boolean, isOfflineTransaction?: boolean): Promise<{
        accountId: AccountId | null;
        key: PrivateKey | IPrivateKeyList;
    } | any>;
    /**
   * Freezes account related to token ID
   * @param {AccountId} accountId
   * @param {TokenId} tokenId
   * @param {string} freezeKey
   * @returns {Status}
   */
    freezeAccount(accountId: AccountId, tokenId: TokenId, freezeKey: string): Promise<any>;
    /**
   * Unfreezes account related to token ID
   * @param {AccountId} accountId
   * @param {TokenId} tokenId
   * @param {string} freezeKey
   * @returns {Status}
   */
    unfreezeAccount(accountId: AccountId, tokenId: TokenId, freezeKey: string): Promise<any>;
    /**
   * Get query balance
   * @param {string} accountId
   * @param {string} tokenId
   * @returns {IAccountBalance}
   */
    getQueryBalance(accountId: string | AccountId, tokenId?: string): Promise<IAccountBalance>;
}
