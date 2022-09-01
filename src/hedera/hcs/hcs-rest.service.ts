import { Injectable } from '@nestjs/common';
import { RestService } from '../rest/rest.service';
import * as lodash from 'lodash';

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
        let messages = [];
        let response = await this.restService
          .call(`topics/${topicId}/messages?order=desc&timestamp=gte:${timestamp}.000000000`);

        messages = messages.concat(response.messages);
        let retry = false;
        let timeout = 0;

        while (response.links.next || retry) {
          if(timeout) {
            await new Promise(resolve => setTimeout(resolve, timeout));
          }

          let next = lodash.get(response.links.next.split("?"), 1);

          try {
            response = await this.restService
            .call(`topics/${topicId}/messages?${next}`);

            messages = messages.concat(response.messages);
            retry = false;
          } catch(error) {
            timeout += 100;
            retry = true;
          }
        }          

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }
}
