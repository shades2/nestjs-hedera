import { Injectable, Inject, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { MirrorNode } from '../../types/mirror.types';
import { HederaOptions } from '../../types/hedera_options.types';

@Injectable()
export class RestService {
  private mirrorNode: MirrorNode;
  protected logger: Logger = new Logger("Rest Transactions Service");

  constructor(
    @Inject('hederaOptions') private hederaOptions: HederaOptions,
    private httpService: HttpService
  ) {
    this.mirrorNode = this.hederaOptions.mirrorNode;
  }

  async call(endpoint: string): Promise<any> {
    return new Promise(async(resolve, reject) => {
      try {
        let headers = {};

        if(this.mirrorNode.apiKey) {
          headers = {
            'authorization': this.mirrorNode.apiKey
          }
        }

        let response = await this.httpService
        .get(
          `${this.mirrorNode.url}/api/v1/${endpoint}`,
          { headers: headers }).toPromise();
  
        resolve(response?.data);
      } catch(error) {
        reject(error);
      }      
    });   
  }
}
