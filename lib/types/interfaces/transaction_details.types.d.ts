import { Status, TransactionId } from "@hashgraph/sdk";
/**
 * Interface
 */
export interface ITransactionDetails {
    /**
     * Transaction status
     */
    status: Status;
    /**
     * Transaction id
     */
    transaction_id: TransactionId;
}
