import { Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { IHederaOptions } from '../../types/interfaces/hedera_options.types';
/**
 * Injectable
 */
export declare class RestService {
    private hederaOptions;
    private httpService;
    /**
     * Mirror Node
     */
    private mirrorNode;
    /**
     * Logger Service
     */
    protected logger: Logger;
    /**
     * Rest Transaction Service
     * @param {IHederaOptions} hederaOptions
     * @param {HttpService} httpService
     */
    constructor(hederaOptions: IHederaOptions, httpService: HttpService);
    /**
     * Call Mirror Node
     * @param {string} endpoint
     * @returns {any}
     */
    call(endpoint: string): Promise<any>;
}
