import { Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { MirrorNode } from '../../types/mirror.types';
export declare class RestService {
    private mirrorNode;
    private httpService;
    protected logger: Logger;
    constructor(mirrorNode: MirrorNode, httpService: HttpService);
    call(endpoint: string): Promise<any>;
}
