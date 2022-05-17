import { Network } from './network.type';
import { Node } from './node.type';
export declare class SmartNode {
    private nodes;
    constructor();
    getNode(network: Network): Node;
    loadLaunchpads(network: Network): Promise<any>;
    loadPools(network: Network): Promise<any>;
    createPool(network: Network, pool: any): Promise<any>;
    getAccountInfos(network: Network, accountId: string): Promise<any>;
    getAccountBalance(network: Network, accountId: string): Promise<any>;
    loadTokens(network: Network): Promise<any>;
    calculatePoolPrice(network: Network, amount: number, baseTokenId: string, swapTokenId: string): Promise<any>;
}
