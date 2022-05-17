import { Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { HederaOptions } from '../../types/hedera_options.types';
export declare class RestService {
    private hederaOptions;
    private httpService;
    private mirrorNode;
    protected logger: Logger;
    constructor(hederaOptions: HederaOptions, httpService: HttpService);
    call(endpoint: string): Promise<any>;
}
