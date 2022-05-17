import { Injectable } from '@nestjs/common';
import { RestService } from '../rest/rest.service';
import * as lodash from 'lodash';

@Injectable()
export class HtsRestService {
  constructor(
    private restService: RestService
  ) {}

  getTokenInfo(tokenId: string): Promise<any> {
    return new Promise(async(resolve, reject) => {
      try {
        let response = await this.restService
        .call(`tokens/${tokenId}`);

        resolve(response);
      } catch(error) {
        reject(error);
      }
    });
  }

  getAllHolders(tokenId: string): Promise<Array<any>> {
    return new Promise(async(resolve, reject) => {
      try {
        let holders: any = [];

        let response = await this.restService
        .call(`tokens/${tokenId}/balances`);

        holders = holders.concat(response.balances);

        while(response.links.next) {
          let next = lodash.get(response.links.next.split("?"), 1);

          response = await this.restService
            .call(`tokens/${tokenId}/balances?${next}`);

          holders = holders.concat(response.balances);
        }

        resolve(holders);
      } catch(error) {
        reject(error);
      }
    });
  }

  getAllHoldersFromWallet(tokenId: string, walletId: string): Promise<Array<any>> {
    return new Promise(async(resolve, reject) => {
      try {
        let holders: any = [];

        let response = await this.restService
        .call(`tokens/${tokenId}/balances?account.id=gt:${walletId}`);

        holders = holders.concat(response.balances);

        while(response.links.next) {
          let next = lodash.get(response.links.next.split("?"), 1);

          response = await this.restService
            .call(`tokens/${tokenId}/balances?${next}`);

          holders = holders.concat(response.balances);
        }

        resolve(holders);
      } catch(error) {
        reject(error);
      }
    });
  }
}