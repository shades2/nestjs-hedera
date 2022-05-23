import { AccountId, PrivateKey, Status, TokenId, Transaction, TransactionReceipt, TokenNftInfo } from '@hashgraph/sdk';
import { Logger } from '@nestjs/common';
import { TransactionDetails } from '../../types/transaction_details.types';
import { ClientService } from '../client/client.service';
export declare class HtsService {
    private clientService;
    protected logger: Logger;
    constructor(clientService: ClientService);
    associateToken(accountId: AccountId, tokenId: TokenId, keys: PrivateKey | Array<PrivateKey>): Promise<Status | undefined>;
    dissociateToken(accountId: AccountId, tokenId: TokenId, keys: PrivateKey | Array<PrivateKey>): Promise<Status | undefined>;
    pauseToken(tokenId: TokenId, pauseKey: PrivateKey): Promise<Status>;
    unpauseToken(tokenId: TokenId, pauseKey: PrivateKey): Promise<Status>;
    mintNftToken(tokenId: TokenId, CID: string, supplyKey?: PrivateKey | Array<PrivateKey>): Promise<TransactionReceipt | Transaction>;
    burnNftToken(tokenId: TokenId, serialNumber: number, supplyKey: PrivateKey): Promise<TransactionReceipt>;
    getNftInfo(tokenId: TokenId, serialNumber: number): Promise<TokenNftInfo[]>;
    transferHbar(amount: number, from: AccountId, to: AccountId, memo?: string, key?: PrivateKey): Promise<TransactionDetails | Transaction>;
    transferToken(tokenId: TokenId | Array<TokenId>, from: AccountId, to: AccountId, amount: number | Array<Number>, tokenDecimals: number | Array<Number>, memo?: string, key?: PrivateKey): Promise<TransactionDetails | Transaction>;
    transferNftToken(tokenId: TokenId, from: AccountId, to: AccountId, serialNumber: number, key?: PrivateKey): Promise<TransactionDetails | Transaction>;
}
