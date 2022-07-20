import { Injectable } from '@nestjs/common';
import { RestService } from '../rest/rest.service';
import * as lodash from 'lodash';

/**
 * Injectable
 */
@Injectable()
export class HtsRestService {

  /**
   * HTS REST Service
   * @param restService 
   */
  constructor(
    private restService: RestService
  ) { }

  /**
   * Get Token Info
   * @param {string} tokenId 
   * @returns {any} response
   */
  getTokenInfo(tokenId: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await this.restService
          .call(`tokens/${tokenId}`);

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Get array of holders by tokenId
   * @param {string} tokenId 
   * @returns {Array}
   */
  getAllHolders(tokenId: string, timeout?: number): Promise<Array<any>> {
    return new Promise(async (resolve, reject) => {
      try {
        let holders: any = [];

        let response = await this.restService
          .call(`tokens/${tokenId}/balances`);

        holders = holders.concat(response.balances);

        while (response.links.next) {
          if(timeout) {
            await new Promise(resolve => setTimeout(resolve, timeout));
          }

          let next = lodash.get(response.links.next.split("?"), 1);

          response = await this.restService
            .call(`tokens/${tokenId}/balances?${next}`);

          holders = holders.concat(response.balances);
        }

        resolve(holders);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
 * Get array of NFT holders by tokenId
 * @param {string} tokenId 
 * @returns {Array}
 */
  getAllNftHolders(tokenId: string, timeout?: number): Promise<Array<any>> {
    return new Promise(async (resolve, reject) => {
      try {
        let holders: any = [];

        let response = await this.restService
          .call(`tokens/${tokenId}/nfts`);

        holders = holders.concat(response.nfts);

        while (response.links.next) {
          if(timeout) {
            await new Promise(resolve => setTimeout(resolve, timeout));
          }
          
          let next = lodash.get(response.links.next.split("?"), 1);

          response = await this.restService
            .call(`tokens/${tokenId}/nfts?${next}`);

          holders = holders.concat(response.nfts);
        }

        resolve(holders);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
* Get array of NFT for a given wallet
* @param {string} walletId 
* @returns {Array}
*/
  getAllNftForHolder(walletId: string): Promise<Array<any>> {
    return new Promise(async (resolve, reject) => {
      try {
        let nfts: any = [];

        let response = await this.restService
          .call(`accounts/${walletId}/nfts`);

          nfts = nfts.concat(response.nfts);

        while (response.links.next) {
          let next = lodash.get(response.links.next.split("?"), 1);

          response = await this.restService
            .call(`accounts/${walletId}/nfts?${next}`);

            nfts = nfts.concat(response.nfts);
        }

        resolve(nfts);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Get array of holders from walletId
   * @param {string} tokenId 
   * @param {string} walletId 
   * @returns {Array}
   */
  getAllHoldersFromWallet(tokenId: string, walletId: string): Promise<Array<any>> {
    return new Promise(async (resolve, reject) => {
      try {
        let holders: any = [];

        let response = await this.restService
          .call(`tokens/${tokenId}/balances?account.id=gt:${walletId}`);

        holders = holders.concat(response.balances);

        while (response.links.next) {
          let next = lodash.get(response.links.next.split("?"), 1);

          response = await this.restService
            .call(`tokens/${tokenId}/balances?${next}`);

          holders = holders.concat(response.balances);
        }

        resolve(holders);
      } catch (error) {
        reject(error);
      }
    });
  }
}