import { RestService } from '../rest/rest.service';
export declare class TransactionsRestService {
    private restService;
    constructor(restService: RestService);
    getAllTransactionsFromTimestamp(timestamp: string, accountId: string): Promise<any>;
    getAllTransactions(accountId: string, filters?: string): Promise<any>;
    getLatestTransactions(accountId: string): Promise<any>;
    getScheduledTransaction(transactionId: string): Promise<any>;
}
