import { Hbar } from "@hashgraph/sdk/lib/contract/ContractCreateFlow";
import { ITokenBalance } from "./token_balance.types";
/**
 * Interface
 */
export interface IAccountBalance {
    /**
     * HBAR
     */
    hbars: Hbar;
    /**
     * Array of custom tokens
     */
    tokens: Array<ITokenBalance>;
}
