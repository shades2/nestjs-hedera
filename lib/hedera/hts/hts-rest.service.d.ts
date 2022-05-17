import { RestService } from '../rest/rest.service';
export declare class HtsRestService {
    private restService;
    constructor(restService: RestService);
    getTokenInfo(tokenId: string): Promise<any>;
    getAllHolders(tokenId: string): Promise<Array<any>>;
    getAllHoldersFromWallet(tokenId: string, walletId: string): Promise<Array<any>>;
}
