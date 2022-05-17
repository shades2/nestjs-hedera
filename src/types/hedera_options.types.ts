import { MirrorNode } from "./mirror.types";
import { Operator } from "./operator.types";

export interface HederaOptions {
  operators: Array<Operator>
  mirrorNode: MirrorNode
  network: 'mainnet' | 'testnet'
}