import { Injectable } from '@nestjs/common';
import { RestService } from '../rest/rest.service';

/**
 * Injectable
 */
@Injectable()
export class HcsRestService {

  /**
   * Transaction Rest Service
   * @param {RestService} restService 
   */
  constructor(
    private restService: RestService
  ) { }

  getLatestMessages(topicId: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await this.restService
          .call(`topics/${topicId}/messages`);

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }
}
