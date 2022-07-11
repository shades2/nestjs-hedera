import { Hbar } from "@hashgraph/sdk/lib/contract/ContractCreateFlow";
import { ITokenBalance } from "../interfaces/token_balance.types";
export declare class AccountBalance {
    hbars: Hbar;
    tokens: Array<ITokenBalance>;
}
