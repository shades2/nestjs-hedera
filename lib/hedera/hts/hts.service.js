"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtsService = void 0;
const sdk_1 = require("@hashgraph/sdk");
const common_1 = require("@nestjs/common");
const client_service_1 = require("../client/client.service");
let HtsService = class HtsService {
    constructor(clientService) {
        this.clientService = clientService;
        this.logger = new common_1.Logger("HTS Service");
    }
    associateToken(accountId, tokenId, keys) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const transaction = yield new sdk_1.TokenAssociateTransaction()
                        .setAccountId(accountId)
                        .setTokenIds([tokenId])
                        .freezeWith(this.clientService.getClient());
                    let signTx = null;
                    if (keys instanceof sdk_1.PrivateKey) {
                        signTx = yield transaction.sign(keys);
                    }
                    else {
                        for (let i = 0; i < keys.length; i++) {
                            signTx = yield transaction.sign(keys[i]);
                        }
                        ;
                    }
                    const txResponse = yield signTx.execute(this.clientService.getClient());
                    const receipt = yield txResponse.getReceipt(this.clientService.getClient());
                    resolve(receipt.status);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    dissociateToken(accountId, tokenId, keys) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const transaction = yield new sdk_1.TokenDissociateTransaction()
                        .setAccountId(accountId)
                        .setTokenIds([tokenId])
                        .freezeWith(this.clientService.getClient());
                    let signTx = null;
                    if (keys instanceof sdk_1.PrivateKey) {
                        signTx = yield transaction.sign(keys);
                    }
                    else {
                        for (let i = 0; i < keys.length; i++) {
                            signTx = yield transaction.sign(keys[i]);
                        }
                        ;
                    }
                    const txResponse = yield signTx.execute(this.clientService.getClient());
                    const receipt = yield txResponse.getReceipt(this.clientService.getClient());
                    resolve(receipt.status);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    pauseToken(tokenId, pauseKey) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const transaction = new sdk_1.TokenPauseTransaction()
                        .setTokenId(tokenId)
                        .freezeWith(this.clientService.getClient());
                    const signTx = yield transaction.sign(pauseKey);
                    const txResponse = yield signTx.execute(this.clientService.getClient());
                    const receipt = yield txResponse.getReceipt(this.clientService.getClient());
                    resolve(receipt.status);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    unpauseToken(tokenId, pauseKey) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const transaction = new sdk_1.TokenUnpauseTransaction()
                        .setTokenId(tokenId)
                        .freezeWith(this.clientService.getClient());
                    const signTx = yield transaction.sign(pauseKey);
                    const txResponse = yield signTx.execute(this.clientService.getClient());
                    const receipt = yield txResponse.getReceipt(this.clientService.getClient());
                    resolve(receipt.status);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    mintNftToken(tokenId, CID, supplyKey) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const transaction = new sdk_1.TokenMintTransaction()
                        .setTokenId(tokenId)
                        .addMetadata(Buffer.from(CID));
                    if (supplyKey) {
                        transaction.freezeWith(this.clientService.getClient());
                        let signTx = null;
                        if (supplyKey instanceof sdk_1.PrivateKey) {
                            signTx = yield transaction.sign(supplyKey);
                        }
                        else {
                            for (let i = 0; i < supplyKey.length; i++) {
                                signTx = yield transaction.sign(supplyKey[i]);
                            }
                            ;
                        }
                        const txResponse = yield signTx.execute(this.clientService.getClient());
                        const receipt = yield txResponse.getReceipt(this.clientService.getClient());
                        resolve(receipt);
                    }
                    else {
                        // if no key has been provided, we return the transasction to be wrapped
                        // into a scheduled transaction to allow multisig threshold mechanism...
                        resolve(transaction);
                    }
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    getNftInfo(tokenId, serialNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let nftId = new sdk_1.NftId(tokenId, serialNumber);
                    let nftInfos = yield new sdk_1.TokenNftInfoQuery()
                        .setNftId(nftId)
                        .execute(this.clientService.getClient());
                    resolve(nftInfos);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    transferHbar(amount, from, to, memo, key) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    // Creating a transaction...
                    const transaction = new sdk_1.TransferTransaction()
                        .addHbarTransfer(from, new sdk_1.Hbar(-amount))
                        .addHbarTransfer(to, new sdk_1.Hbar(amount));
                    if (memo) {
                        transaction.setTransactionMemo(memo);
                    }
                    if (key) {
                        transaction.freezeWith(this.clientService.getClient());
                        // signing the transaction with the sender key...
                        let signTx = yield transaction.sign(key);
                        // Submitting the transaction to a Hedera network...
                        const txResponse = yield signTx.execute(this.clientService.getClient());
                        // Requesting the receipt of the transaction...
                        const receipt = yield txResponse.getReceipt(this.clientService.getClient());
                        // Resolving the transaction consensus status...
                        resolve({
                            status: receipt.status,
                            transaction_id: txResponse.transactionId
                        });
                    }
                    else {
                        // if no key has been provided, we return the transasction to be wrapped
                        // into a scheduled transaction to allow multisig threshold mechanism...          
                        resolve(transaction);
                    }
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    transferToken(tokenId, from, to, amount, tokenDecimals, memo, key) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    // Creating the transfer transaction...
                    const transaction = yield new sdk_1.TransferTransaction()
                        .addTokenTransfer(tokenId, from, Number(-amount * (10 ** tokenDecimals)))
                        .addTokenTransfer(tokenId, to, Number(amount * (10 ** tokenDecimals)));
                    if (memo) {
                        transaction.setTransactionMemo(memo);
                    }
                    if (key) {
                        transaction.freezeWith(this.clientService.getClient());
                        // signing the transaction with the sender key...
                        let signTx = yield transaction.sign(key);
                        // Submitting the transaction to a Hedera network...
                        const txResponse = yield signTx.execute(this.clientService.getClient());
                        // Requesting the receipt of the transaction...
                        const receipt = yield txResponse.getReceipt(this.clientService.getClient());
                        // Resolving the transaction consensus status...
                        resolve({
                            status: receipt.status,
                            transaction_id: txResponse.transactionId
                        });
                    }
                    else {
                        // if no key has been provided, we return the transasction to be wrapped
                        // into a scheduled transaction to allow multisig threshold mechanism...
                        resolve(transaction);
                    }
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    transferNftToken(tokenId, from, to, serialNumber, key) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    // Creating the transfer transaction...
                    const transaction = yield new sdk_1.TransferTransaction()
                        .addNftTransfer(new sdk_1.NftId(tokenId, serialNumber), from, to);
                    if (key) {
                        transaction.freezeWith(this.clientService.getClient());
                        // signing the transaction with the sender key...
                        let signTx = yield transaction.sign(key);
                        // Submitting the transaction to a Hedera network...
                        const txResponse = yield signTx.execute(this.clientService.getClient());
                        // Requesting the receipt of the transaction...
                        const receipt = yield txResponse.getReceipt(this.clientService.getClient());
                        // Resolving the transaction consensus status...
                        resolve({
                            status: receipt.status,
                            transaction_id: txResponse.transactionId
                        });
                    }
                    else {
                        // if no key has been provided, we return the transasction to be wrapped
                        // into a scheduled transaction to allow multisig threshold mechanism...
                        resolve(transaction);
                    }
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
};
HtsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_service_1.ClientService])
], HtsService);
exports.HtsService = HtsService;
