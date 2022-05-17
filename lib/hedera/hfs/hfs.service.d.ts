import { FileId, FileInfo, PrivateKey, Status } from '@hashgraph/sdk';
import { Logger } from '@nestjs/common';
import { ClientService } from '../client/client.service';
export declare class HfsService {
    private clientService;
    protected logger: Logger;
    constructor(clientService: ClientService);
    create(key: PrivateKey, content: string, memo?: string, maxTransactionFee?: number): Promise<FileId | null>;
    append(fileId: FileId, key: PrivateKey, content: string, maxTransactionFee?: number): Promise<Status>;
    update(fileId: FileId, content: string, signKey: PrivateKey, newKey?: PrivateKey, memo?: string, maxTransactionFee?: number): Promise<Status>;
    delete(fileId: FileId, key: PrivateKey, maxTransactionFee?: number): Promise<Status>;
    getContents(fileId: FileId): Promise<string>;
    getInfos(fileId: FileId): Promise<FileInfo>;
}
