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
          .call(`topics/${topicId}/messages?order=desc`);

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }

  getLatestMessagesFromTimestamp(topicId: string, timestamp: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await this.restService
          .call(`topics/${topicId}/messages?order=desc&timestamp=gte:${timestamp}.000000000`);

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }
}
