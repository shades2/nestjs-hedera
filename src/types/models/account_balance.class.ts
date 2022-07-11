import { Hbar } from "@hashgraph/sdk/lib/contract/ContractCreateFlow";
import { ITokenBalance } from "../interfaces/token_balance.types";
import { ApiProperty } from "@nestjs/swagger";
import { TokenBalance } from "./token_balance.class";

export class AccountBalance {
  @ApiProperty()
  hbars: Hbar

  @ApiProperty({type: TokenBalance, isArray: true})
  tokens: Array<ITokenBalance>  
}