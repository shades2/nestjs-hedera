import { RestService } from '../rest/rest.service';
/**
 * Injectable
 */
export declare class HcsRestService {
    private restService;
    /**
     * Transaction Rest Service
     * @param {RestService} restService
     */
    constructor(restService: RestService);
    getLatestMessages(topicId: string): Promise<any>;
    getLatestMessagesFromTimestamp(topicId: string, timestamp: number, limit?: number): Promise<any>;
}
