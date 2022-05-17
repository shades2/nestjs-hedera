import { TopicInfo, TopicId, PrivateKey, Status, Key, KeyList } from '@hashgraph/sdk';
import { Logger } from '@nestjs/common';
import { ClientService } from '../client/client.service';
export declare class HcsService {
    private clientService;
    protected logger: Logger;
    constructor(clientService: ClientService);
    createTopic(adminKey?: PrivateKey, submitKey?: Key | KeyList, memo?: string): Promise<TopicId | null>;
    updateTopic(topicId: TopicId, currentAdminKey?: PrivateKey, adminKey?: PrivateKey, submitKey?: Key | KeyList, memo?: string): Promise<Status>;
    deleteTopic(topicId: TopicId, adminKey: PrivateKey): Promise<Status>;
    topicInfo(topicId: TopicId): Promise<TopicInfo>;
    submitMessage(topicId: TopicId, message: string | Uint8Array, submitKey?: PrivateKey): Promise<string | undefined>;
    getMessages(topicId: TopicId, callback: (message: any) => void, start?: number, end?: number, limit?: number): Promise<any>;
}
