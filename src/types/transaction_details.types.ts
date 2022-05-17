import { Status, TransactionId } from "@hashgraph/sdk";

export interface TransactionDetails {
  status: Status
  transaction_id: TransactionId
}