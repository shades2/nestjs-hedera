import { Decimal } from 'decimal.js';
/**
 * Interface
 */
export interface ITokenBalance {
    /**
     * Token id string
     */
    tokenId: string;
    /**
      * Token balance
      */
    balance: Decimal;
    /**
      * Token decimals number
      */
    decimals: Decimal;
}
