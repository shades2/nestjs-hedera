import {
  AccountBalanceQuery,
  AccountCreateTransaction,
  AccountId,
  AccountInfo,
  AccountInfoQuery,
  AccountUpdateTransaction,
  Hbar,
  PrivateKey,
  Status,
  TokenFreezeTransaction,
  TokenId,
  TokenUnfreezeTransaction
} from '@hashgraph/sdk';
import { Injectable, Logger } from '@nestjs/common';
import { ClientService } from '../client/client.service';
import { KeysService } from '../keys/keys.service';
import { ITokenBalance } from '../../types/interfaces/token_balance.types';
import { IAccountBalance } from '../../types/interfaces/account_balance.types';
import { IPrivateKeyList } from '../../types/interfaces/private-key-list.types';

/**
 * Injectable
 */
@Injectable()
export class AccountsService {
  /**
  * Logger Service
  */
  protected logger: Logger = new Logger("Accounts Service");

  /**
   * Constructor
   * @param {ClientService} clientService 
   * @param {KeysService} keysService 
   */
  constructor(
    private clientService: ClientService,
    private keysService: KeysService
  ) { }

  /**
   * Fetches specific Account Info
   * @param {AccountId} accountId 
   * @returns {AccountInfo}
   */
  async getInfo(accountId: AccountId): Promise<AccountInfo> {
    return new Promise(async (resolve, reject) => {
      try {
        const client = this.clientService.getClient();

        // Creating the transaction...
        const transaction = new AccountInfoQuery()
          .setAccountId(accountId);

        // Signing the transaction...
        const accountInfo = await transaction.execute(client);

        // resolving the account's info...
        resolve(accountInfo);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
 * Fetches Specific account public key
 * @param {AccountId} accountId 
 * @returns {any} Account Public Key
 */
  async getKeys(accountId: AccountId): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const client = this.clientService.getClient();

        const accountInfo = await this.getInfo(accountId);
        resolve(<any>accountInfo.key);
      } catch (error) {
        reject(error);
      }
    });
  }


  /**
   * Updates Account
   * @param {AccountId} accountId 
   * @param {PrivateKey} signKey 
   * @param {PrivateKey} newKey 
   * @param {string} memo 
   * @returns {Status} Account Update
   */
  async updateAccount(
    accountId: AccountId,
    signKey: PrivateKey,
    newKey?: PrivateKey,
    memo?: string,
    maxAutomaticTokenAssociations?: number,
    isReceiverSignatureRequired?: boolean,
    isOfflineTransaction?: boolean
  ): Promise<Status | any> {
    return new Promise(async (resolve, reject) => {
      try {
        const client = this.clientService.getClient();

        // generating random number, as a workound for offline signature...
        let nodeAccountId = this.clientService.getRandomNodeForNetwork();

        // Creating the transaction...
        const transaction = await new AccountUpdateTransaction()
          .setNodeAccountIds([nodeAccountId])
          .setAccountId(accountId);

        if (memo) {
          transaction.setAccountMemo(memo);
        }

        if(maxAutomaticTokenAssociations) {
          transaction.setMaxAutomaticTokenAssociations(maxAutomaticTokenAssociations);
        }

        if(isReceiverSignatureRequired) {
          transaction.setReceiverSignatureRequired(true);
        }        

        if (newKey) {
          transaction.setKey(newKey);
        }

        if(isOfflineTransaction) {
          // generating random number, as a workound for offline signature...
          let nodeAccountId = this.clientService.getRandomNodeForNetwork();
          transaction.setNodeAccountIds([nodeAccountId]);
        }

        transaction.freezeWith(client);

        if(isOfflineTransaction) {
          resolve(transaction);
        } else {
        // Signing the transaction...
        let signTx = await transaction.sign(signKey);

        if (newKey) {
          signTx = await signTx.sign(newKey);
        }

        // Signing the transaction with the client operator...
        const txResponse = await signTx.execute(client);

        // Request the receipt of the transaction...
        const receipt = await txResponse.getReceipt(client);

        // Get the transaction consensus status...
        resolve(receipt.status);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
 * Creates a single or multi-sig account
 * @param {number} balance 
 * @param {number} keysLength 
 * @param {number} keysThreshold 
 * @returns {AccountId, PrivateKey} single or multi-sig account
 */
  async createAccount(
    balance: number,
    keysLength: number,
    publicKeys?: Array<string>,
    keysThreshold?: number,
    maxAutomaticTokenAssociations?: number,
    isReceiverSignatureRequired?: boolean,
    isOfflineTransaction?: boolean
  ): Promise<{ accountId: AccountId | null, key: PrivateKey | IPrivateKeyList } | any> {
    return new Promise(async (resolve, reject) => {
      try {
        const client = this.clientService.getClient();

        let key = null;

        if (keysLength > 1) {
          key = await this.keysService.generateKeyList(publicKeys, keysLength, keysThreshold);
        } else {
          key = await this.keysService.generateKey();
        }

        //Creating the transaction...
        const transaction = new AccountCreateTransaction()
          .setKey(keysLength > 1 ? (<IPrivateKeyList>key).keyList : (<PrivateKey>key).publicKey);

        if(balance) {
          transaction.setInitialBalance(new Hbar(balance.toFixed(8)));
        }

        if(maxAutomaticTokenAssociations) {
          transaction.setMaxAutomaticTokenAssociations(maxAutomaticTokenAssociations);
        }

        if(isReceiverSignatureRequired) {
          transaction.setReceiverSignatureRequired(true);
        }

        if(isOfflineTransaction) {
          // generating random number, as a workound for offline signature...
          let nodeAccountId = this.clientService.getRandomNodeForNetwork();
          transaction.setNodeAccountIds([nodeAccountId]);
        }

        transaction.freezeWith(client);

        if(isOfflineTransaction) {
          resolve(transaction);
        } else {
          // Executing the transactions...
          const txResponse = await transaction.execute(client);

          // Fetching the receipt...
          const receipt = await txResponse.getReceipt(client);

          // resolving the accountId...
          resolve({
            accountId: receipt.accountId,
            key: key
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
 * Freezes account related to token ID
 * @param {AccountId} accountId 
 * @param {TokenId} tokenId 
 * @param {string} freezeKey 
 * @returns {Status}
 */
  async freezeAccount(accountId: AccountId, tokenId: TokenId, freezeKey: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const client = this.clientService.getClient();

        const transaction = await new TokenFreezeTransaction()
          .setAccountId(accountId)
          .setTokenId(tokenId)
          .freezeWith(client);

        const signTx = await transaction.sign(PrivateKey.fromString(freezeKey));
        const txResponse = await signTx.execute(client);
        const receipt = await txResponse.getReceipt(client);
        resolve({
          status: receipt.status,
          transaction_id: txResponse.transactionId.toString()
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
 * Unfreezes account related to token ID
 * @param {AccountId} accountId 
 * @param {TokenId} tokenId 
 * @param {string} freezeKey 
 * @returns {Status}
 */
  async unfreezeAccount(accountId: AccountId, tokenId: TokenId, freezeKey: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const client = this.clientService.getClient();

        const transaction = await new TokenUnfreezeTransaction()
          .setAccountId(accountId)
          .setTokenId(tokenId)
          .freezeWith(client);

        const signTx = await transaction.sign(PrivateKey.fromString(freezeKey));
        const txResponse = await signTx.execute(client);
        const receipt = await txResponse.getReceipt(client);
        resolve({
          status: receipt.status,
          transaction_id: txResponse.transactionId.toString()
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
 * Get query balance
 * @param {string} accountId 
 * @param {string} tokenId 
 * @returns {IAccountBalance}
 */
  getQueryBalance(accountId: string | AccountId, tokenId?: string): Promise<IAccountBalance> {
    return new Promise(async (resolve, reject) => {
      try {
        const client = this.clientService.getClient();

        const query = new AccountBalanceQuery()
          .setAccountId(accountId);

        const response = await query.execute(client);
        let balance = null;

        if (tokenId) {
          balance = {
            tokens: [{
              tokenId: tokenId,
              balance: response.tokens?._map.get(tokenId) ? Number(response.tokens._map.get(tokenId)?.toString()) : 0,
              decimals: response.tokens?._map.get(tokenId) ? Number(response.tokenDecimals?._map.get(tokenId)) : 0
            }],
            hbars: response.hbars
          };
        } else {
          let tokens = new Array<ITokenBalance>();

          response.tokens?._map.forEach((value, tokenId) => {
            tokens.push({
              tokenId: tokenId,
              balance: response.tokens?._map.get(tokenId) ? Number(response.tokens._map.get(tokenId)?.toString()) : 0,
              decimals: response.tokens?._map.get(tokenId) ? Number(response.tokenDecimals?._map.get(tokenId)) : 0
            });
          });

          balance = {
            tokens: tokens,
            hbars: response.hbars
          };
        }

        resolve(balance);
      } catch (error) {
        reject(error);
      }
    });
  }
}
