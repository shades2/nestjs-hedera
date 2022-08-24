# HSuite - Hedera for NestJS
An hedera-js-sdk wrapper for NestJS.

## Installation
If you use npm, you shall run:
```bash
npm install @hsuite/nestjs-hedera
```
instead, if you use yarn:
```bash
yarn add @hsuite/nestjs-hedera
```

## Import into your AppModule
First you need to import the HederaModule into your app.module.ts.
You can use the forRoot method in order to pass the needed variables to create the Hedera Client and to connect to a Mirror Node, like this:
```js
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HederaModule } from '@hsuite/nestjs-hedera/lib';

@Module({
  imports: [
    HederaModule.forRoot({
      operators: [
          {
            accountId: 'YOUR_OPERATOR_ACCOUNT_ID', 
            privateKey: 'YOUR_OPERATOR_PRIVATE_KEY'
          }
        ], 
        mirrorNode: {
          url: 'https://mainnet-public.mirrornode.hedera.com'
        }, 
        network: 'mainnet'
      }),
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
```

You can also use NestJS ConfigService, to protect your keys by calling the forRootAsync method, like this:
```js
HederaModule.forRootAsync({
  imports: [ConfigModule],
  useExisting: ConfigService,
  useFactory: async (configService: ConfigService) => ({
    operators: configService.get<Array<Operator>>(`operators`),
    mirrorNode: configService.get<MirrorNode>(`mirrorNode`),
    network: configService.get<string>('network')
  }),
}),
```
## Usage
Once imported, you can then import the service you need, and use it.
For example:
```js
import { Injectable } from '@nestjs/common';
import { KeysService } from '@hsuite/nestjs-hedera/lib/hedera/keys/keys.service';
import { HcsService } from '@hsuite/nestjs-hedera/lib/hedera/hcs/hcs.service';
import { HfsService } from '@hsuite/nestjs-hedera/lib/hedera/hfs/hfs.service';
import { AccountsService } from '@hsuite/nestjs-hedera/lib/hedera/accounts/accounts.service';
import { TransactionsRestService } from '@hsuite/nestjs-hedera/lib/hedera/transactions/transactions-rest.service';
import { TopicId, PrivateKey } from '@hashgraph/sdk';

@Injectable()
export class AppService {
  constructor(
    private keysService: KeysService,
    private hcsService: HcsService,
    private hfsService: HfsService,
    private transactionsService: TransactionsRestService,
    private accountsService: AccountsService
  ) {
    // creating an hedera account...
    this.accountsService.createAccount(1, 1).then(account => {
      console.log("account generated", account.key.toString());
      // generating a new private key...
      this.keysService.generateKey().then(key => {
        // updating the account with the new generated private key...
        this.accountsService.updateAccount(
          account.accountId, 
          PrivateKey.fromString(account.key.toString()),
          key).then(response => {
            console.log(response);
          }).catch(error => {
            console.error(error);
          });
      }).catch(error => {
        console.error(error);
      });
    }).catch(error => {
      console.error(error);
    })

    // fetching latest transactions from mirror node for a given accountId...
    this.transactionsService.getLatestTransactions('YOUR_ACCOUNT_ID_HERE').then(response => {
      console.log(response);
    }).catch(error => {
      console.error(error);
    });

    // subscribing to a HCS Topic...
    this.hcsService.getMessages(
      TopicId.fromString('YOUR_HCS_TOPIC_ID_HERE'),
      async(message) => {
        let hcsMessage = JSON.parse(Buffer.from(message.contents).toString());
        console.log(hcsMessage);
      }
      ).then(() => {
        console.log("subscribed");
      }).catch(error => {
        console.error(error);
      })

    // creating an HFS file...
    this.hfsService.create(
      PrivateKey.fromString('YOUR_PRIVATE_KEY_HERE'),
      'YOUR_CONTENT_HERE'
    ).then((response) => {
      console.log(response);
    }).catch(error => {
      console.error(error);
    })
  }
}
```