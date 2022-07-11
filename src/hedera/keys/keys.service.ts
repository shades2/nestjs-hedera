import { Injectable, Logger } from '@nestjs/common';
import { PrivateKey, KeyList, PublicKey } from '@hashgraph/sdk';
import { IPrivateKeyList } from '../../types/interfaces/private-key-list.types';

/**
 * Injectable
 */
@Injectable()
export class KeysService {

  /**
   * Logger Service
   */
  protected logger: Logger = new Logger("Keys Service");


  /**
   * KeyService class
   */
  constructor() {
  }

  /**
   * Generate Private Key
   * @returns {PrivateKey}
   */
  generateKey(): Promise<PrivateKey> {
    return new Promise(async(resolve, reject) => {
      try {
        const key = await PrivateKey.generateED25519();
        resolve(key);
      } catch(error) {
        reject(error);
      }
    });
  }

  /**
   * Generate a list of Keys
   * @param {string} publicKeys 
   * @param {number} length 
   * @param {number} threshold 
   * @returns {IPrivateKeyList} 
   */
  generateKeyList(
    publicKeys?: string[],
    length?: number,
    threshold?: number
  ): Promise<IPrivateKeyList> {
    return new Promise(async(resolve, reject) => {
      try {
        let publicKeyList: any = [];
        // if an array of keys is provided, we use it...
        if(publicKeys) {
          publicKeys.forEach(key => {
            publicKeyList.push(PublicKey.fromString(key));
          });

          resolve({
            privateKeys: [], 
            keyList: new KeyList(publicKeyList, threshold? threshold : null)
          });          
        }
        // otherwise, we generate the keys we need...
        else {
          let privateKeys: any = [];

          if(length) {
            [...Array(length).keys()].forEach(() => {
              let key = PrivateKey.generateED25519();
              privateKeys.push(key);
              publicKeyList.push(key.publicKey);
            });

            resolve({
              privateKeys: privateKeys, 
              keyList: new KeyList(publicKeyList, threshold? threshold : null)
            });
          } else {
            resolve({
              privateKeys: [], 
              keyList: new KeyList([])
            });
          }
        }
      } catch(error) {
        reject(error);
      }
    });
  }
}
