import { AccountId } from "@hashgraph/sdk";
import { IMirrorNode } from "./mirror.types";
import { IOperator } from "./operator.types";

/**
 * Interface
 */
export interface IHederaOptions {


  /**
   * Array of operators
   */
  operators: Array<IOperator>

  /**
   * Mirror Node
   */
  mirrorNode: IMirrorNode

  /**
   * Network choice
   */
  network: 'mainnet' | 'testnet' | 'custom'

  custom: {
    node: { [key: string]: string | AccountId },
    mirror: string
  }
}