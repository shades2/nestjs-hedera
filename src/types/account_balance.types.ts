import { Hbar } from "@hashgraph/sdk/lib/contract/ContractCreateFlow";
import { TokenBalance } from "./token_balance.types";

export interface AccountBalance {
  hbars: Hbar
  tokens: Array<TokenBalance>  
}