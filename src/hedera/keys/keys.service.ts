import { Injectable, Logger } from '@nestjs/common';
import { PrivateKey, KeyList, PublicKey } from '@hashgraph/sdk';
import { PrivateKeyList } from '../../types/private-key-list.types';

@Injectable()
export class KeysService {
  protected logger: Logger = new Logger("Keys Service");

  constructor() {
    // KeyService Class
  }

  generateKey(): Promise<PrivateKey> {
    return new Promise(async(resolve, reject) => {
      try {
        const key = await PrivateKey.generate();
        resolve(key);
      } catch(error) {
        reject(error);
      }
    });
  }

  generateKeyList(
    publicKeys?: string[],
    length?: number,
    threshold?: number
  ): Promise<PrivateKeyList> {
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
              let key = PrivateKey.generate();
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