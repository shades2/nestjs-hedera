import { Logger } from '@nestjs/common';
import { ClientService } from '../client/client.service';
import { PrivateKey, ScheduleId, Status, Transaction, TransactionId } from '@hashgraph/sdk';
export declare class TransactionsService {
    private clientService;
    protected logger: Logger;
    constructor(clientService: ClientService);
    getTransactionQuery(transactionId: TransactionId): Promise<any>;
    getTransactionReceipt(transactionId: TransactionId): Promise<any>;
    signScheduledTransaction(scheduleId: ScheduleId, key: PrivateKey): Promise<Status>;
    createScheduledTransaction(transactionToSchedule: Transaction): Promise<ScheduleId | null>;
    getScheduledTrasaction(scheduleId: string): Promise<any>;
}
