import { 
  AccountId, 
  Hbar, 
  PrivateKey, 
  Status, 
  TokenAssociateTransaction, 
  TokenId, 
  TokenMintTransaction, 
  TokenPauseTransaction, 
  TokenUnpauseTransaction, 
  TokenDissociateTransaction,
  Transaction, 
  TransferTransaction, 
  TransactionReceipt, 
  NftId, 
  TokenNftInfoQuery, 
  TokenNftInfo 
} from '@hashgraph/sdk';
import { Injectable, Logger } from '@nestjs/common';
import { TransactionDetails } from '../../types/transaction_details.types';
import { ClientService } from '../client/client.service';

@Injectable()
export class HtsService {
  protected logger: Logger = new Logger("HTS Service");

  constructor(
    private clientService: ClientService
  ) {}

  async associateToken(
    accountId: AccountId,
    tokenId: TokenId,
    keys: PrivateKey | Array<PrivateKey>
    ): Promise<Status | undefined> {
    return new Promise(async(resolve, reject) => {
      try {
        const transaction = await new TokenAssociateTransaction()
        .setAccountId(accountId)
        .setTokenIds([tokenId])
        .freezeWith(this.clientService.getClient());

        let signTx = null;

        if(keys instanceof PrivateKey) {
          signTx = await transaction.sign(keys);
        } else {
          for (let i = 0; i < keys.length; i++) {
            signTx = await transaction.sign(keys[i]);
          };
        }
                 
        const txResponse = await signTx.execute(this.clientService.getClient());
        const receipt = await txResponse.getReceipt(this.clientService.getClient());
        resolve(receipt.status);        
      } catch(error) {
        reject(error);
      }
    })
  }

  async dissociateToken(
    accountId: AccountId,
    tokenId: TokenId,
    keys: PrivateKey | Array<PrivateKey>
    ): Promise<Status | undefined> {
    return new Promise(async(resolve, reject) => {
      try {
        const transaction = await new TokenDissociateTransaction()
        .setAccountId(accountId)
        .setTokenIds([tokenId])
        .freezeWith(this.clientService.getClient());

        let signTx = null;

        if(keys instanceof PrivateKey) {
          signTx = await transaction.sign(keys);
        } else {
          for (let i = 0; i < keys.length; i++) {
            signTx = await transaction.sign(keys[i]);
          };
        }

        const txResponse = await signTx.execute(this.clientService.getClient());
        const receipt = await txResponse.getReceipt(this.clientService.getClient());
        resolve(receipt.status);        
      } catch(error) {
        reject(error);
      }
    })
  }

  async pauseToken(tokenId: TokenId, pauseKey: PrivateKey): Promise<Status> {
    return new Promise(async(resolve, reject) => {
      try {
        const transaction = new TokenPauseTransaction()
        .setTokenId(tokenId)
        .freezeWith(this.clientService.getClient());

        const signTx = await transaction.sign(pauseKey);
        const txResponse = await signTx.execute(this.clientService.getClient());
        const receipt = await txResponse.getReceipt(this.clientService.getClient());
        resolve(receipt.status);        
      } catch(error) {
        reject(error);
      }
    });
  }

  async unpauseToken(tokenId: TokenId, pauseKey: PrivateKey): Promise<Status> {
    return new Promise(async(resolve, reject) => {
      try {
        const transaction = new TokenUnpauseTransaction()
        .setTokenId(tokenId)
        .freezeWith(this.clientService.getClient());

        const signTx = await transaction.sign(pauseKey);
        const txResponse = await signTx.execute(this.clientService.getClient());
        const receipt = await txResponse.getReceipt(this.clientService.getClient());
        resolve(receipt.status);        
      } catch(error) {
        reject(error);
      }
    });
  }

  async mintNftToken(
    tokenId: TokenId,
    CID: string,
    supplyKey?: PrivateKey | Array<PrivateKey>
  ): Promise<TransactionReceipt | Transaction> {
    return new Promise(async(resolve, reject) => {
      try {
        const transaction = new TokenMintTransaction()
        .setTokenId(tokenId)
        .addMetadata(Buffer.from(CID));

        if(supplyKey) {
          transaction.freezeWith(this.clientService.getClient());

          let signTx = null;

          if(supplyKey instanceof PrivateKey) {
            signTx = await transaction.sign(supplyKey);
          } else {
            for (let i = 0; i < supplyKey.length; i++) {
              signTx = await transaction.sign(supplyKey[i]);
            };
          }
  
          const txResponse = await signTx.execute(this.clientService.getClient());
          const receipt = await txResponse.getReceipt(this.clientService.getClient());
          resolve(receipt); 
        } else {
          // if no key has been provided, we return the transasction to be wrapped
          // into a scheduled transaction to allow multisig threshold mechanism...
          resolve(transaction);
        }       
      } catch(error) {
        reject(error);
      }
    });
  }

  async getNftInfo(
    tokenId: TokenId,
    serialNumber: number,
  ): Promise<TokenNftInfo[]> {
    return new Promise(async(resolve, reject) => {
      try {
        let nftId = new NftId(tokenId, serialNumber);
        let nftInfos = await new TokenNftInfoQuery()
        .setNftId(nftId)
        .execute(this.clientService.getClient());

        resolve(nftInfos);        
      } catch(error) {
        reject(error);
      }
    });
  }

  async transferHbar(
    amount: number,
    from: AccountId,
    to: AccountId,
    memo?: string,
    key?: PrivateKey
  ): Promise<TransactionDetails | Transaction> {
    return new Promise(async(resolve,reject) => {
      try {
        // Creating a transaction...
        const transaction = new TransferTransaction()
          .addHbarTransfer(from, new Hbar(-amount))
          .addHbarTransfer(to, new Hbar(amount));

        if(memo) {
          transaction.setTransactionMemo(memo);
        }
          
        if(key) {
          transaction.freezeWith(this.clientService.getClient());

          // signing the transaction with the sender key...
          let signTx = await transaction.sign(key);
            
          // Submitting the transaction to a Hedera network...
          const txResponse = await signTx.execute(this.clientService.getClient());
  
          // Requesting the receipt of the transaction...
          const receipt = await txResponse.getReceipt(this.clientService.getClient());
  
          // Resolving the transaction consensus status...
          resolve({
            status: receipt.status,
            transaction_id: txResponse.transactionId
          });
        } else {
          // if no key has been provided, we return the transasction to be wrapped
          // into a scheduled transaction to allow multisig threshold mechanism...          
          resolve(transaction);
        }
          
      } catch(error) {
        reject(error);        
      }
    });
  }

  async transferToken(
    tokenId: TokenId,
    from: AccountId,
    to: AccountId,    
    amount: number,
    tokenDecimals: number,
    memo?: string,
    key?: PrivateKey
  ): Promise<TransactionDetails | Transaction> {
    return new Promise(async(resolve,reject) => {
      try {
        // Creating the transfer transaction...
        const transaction = await new TransferTransaction()
          .addTokenTransfer(tokenId, from, Number(-amount  * (10 ** tokenDecimals)))
          .addTokenTransfer(tokenId, to, Number(amount  * (10 ** tokenDecimals)));

          if(memo) {
            transaction.setTransactionMemo(memo);
          }

        if(key) {
          transaction.freezeWith(this.clientService.getClient());

          // signing the transaction with the sender key...
          let signTx = await transaction.sign(key);
            
          // Submitting the transaction to a Hedera network...
          const txResponse = await signTx.execute(this.clientService.getClient());
  
          // Requesting the receipt of the transaction...
          const receipt = await txResponse.getReceipt(this.clientService.getClient());
  
          // Resolving the transaction consensus status...
          resolve({
            status: receipt.status,
            transaction_id: txResponse.transactionId
          });
        } else {
          // if no key has been provided, we return the transasction to be wrapped
          // into a scheduled transaction to allow multisig threshold mechanism...
          resolve(transaction);
        }          
      } catch(error) {
        reject(error);        
      }
    });
  }

  async transferNftToken(
    tokenId: TokenId,
    from: AccountId,
    to: AccountId,
    serialNumber: number,
    key?: PrivateKey
  ): Promise<TransactionDetails | Transaction> {
    return new Promise(async(resolve,reject) => {
      try {
        // Creating the transfer transaction...
        const transaction = await new TransferTransaction()
          .addNftTransfer(new NftId(tokenId, serialNumber), from, to);

        if(key) {
          transaction.freezeWith(this.clientService.getClient());

          // signing the transaction with the sender key...
          let signTx = await transaction.sign(key);
            
          // Submitting the transaction to a Hedera network...
          const txResponse = await signTx.execute(this.clientService.getClient());
  
          // Requesting the receipt of the transaction...
          const receipt = await txResponse.getReceipt(this.clientService.getClient());
  
          // Resolving the transaction consensus status...
          resolve({
            status: receipt.status,
            transaction_id: txResponse.transactionId
          });
        } else {
          // if no key has been provided, we return the transasction to be wrapped
          // into a scheduled transaction to allow multisig threshold mechanism...
          resolve(transaction);
        }          
      } catch(error) {
        reject(error);        
      }
    });
  }
}
