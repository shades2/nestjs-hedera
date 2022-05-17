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
exports.AccountsService = void 0;
const sdk_1 = require("@hashgraph/sdk");
const common_1 = require("@nestjs/common");
const client_service_1 = require("../client/client.service");
const keys_service_1 = require("../keys/keys.service");
let AccountsService = class AccountsService {
    constructor(clientService, keysService) {
        this.clientService = clientService;
        this.keysService = keysService;
        this.logger = new common_1.Logger("Accounts Service");
    }
    getInfo(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    // Creating the transaction...
                    const transaction = new sdk_1.AccountInfoQuery()
                        .setAccountId(accountId);
                    // Signing the transaction...
                    const accountInfo = yield transaction.execute(this.clientService.getClient());
                    // resolving the account's info...
                    resolve(accountInfo);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    getKeys(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const accountInfo = yield this.getInfo(accountId);
                    resolve(accountInfo.key);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    updateAccount(accountId, signKey, newKey, memo) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    // Creating the transaction...
                    const transaction = yield new sdk_1.AccountUpdateTransaction()
                        // setting single node accountId, as a workound for offline signature...
                        .setNodeAccountIds([new sdk_1.AccountId(6)])
                        .setAccountId(accountId);
                    if (memo) {
                        transaction.setAccountMemo(memo);
                    }
                    if (newKey) {
                        transaction.setKey(newKey);
                    }
                    transaction.freezeWith(this.clientService.getClient());
                    // Signing the transaction...
                    let signTx = yield transaction.sign(signKey);
                    if (newKey) {
                        signTx = yield signTx.sign(newKey);
                    }
                    // Signing the transaction with the client operator...
                    const txResponse = yield signTx.execute(this.clientService.getClient());
                    // Request the receipt of the transaction...
                    const receipt = yield txResponse.getReceipt(this.clientService.getClient());
                    // Get the transaction consensus status...
                    resolve(receipt.status);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    createAccount(balance, keysLength, keysThreshold) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let key = null;
                    if (keysLength > 1) {
                        key = yield this.keysService.generateKeyList(undefined, keysLength, keysThreshold);
                    }
                    else {
                        key = yield this.keysService.generateKey();
                    }
                    //Creating the transaction...
                    const transaction = new sdk_1.AccountCreateTransaction()
                        .setKey(keysLength > 1 ? key.keyList : key.publicKey)
                        .setInitialBalance(new sdk_1.Hbar(balance));
                    // Executing the transactions...
                    const txResponse = yield transaction.execute(this.clientService.getClient());
                    // Fetching the receipt...
                    const receipt = yield txResponse.getReceipt(this.clientService.getClient());
                    // resolving the accountId...
                    resolve({
                        accountId: receipt.accountId,
                        key: key
                    });
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    freezeAccount(accountId, tokenId, freezeKey) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const transaction = yield new sdk_1.TokenFreezeTransaction()
                        .setAccountId(accountId)
                        .setTokenId(tokenId)
                        .freezeWith(this.clientService.getClient());
                    const signTx = yield transaction.sign(sdk_1.PrivateKey.fromString(freezeKey));
                    const txResponse = yield signTx.execute(this.clientService.getClient());
                    const receipt = yield txResponse.getReceipt(this.clientService.getClient());
                    resolve({
                        status: receipt.status,
                        transaction_id: txResponse.transactionId.toString()
                    });
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    unfreezeAccount(accountId, tokenId, freezeKey) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const transaction = yield new sdk_1.TokenUnfreezeTransaction()
                        .setAccountId(accountId)
                        .setTokenId(tokenId)
                        .freezeWith(this.clientService.getClient());
                    const signTx = yield transaction.sign(sdk_1.PrivateKey.fromString(freezeKey));
                    const txResponse = yield signTx.execute(this.clientService.getClient());
                    const receipt = yield txResponse.getReceipt(this.clientService.getClient());
                    resolve({
                        status: receipt.status,
                        transaction_id: txResponse.transactionId.toString()
                    });
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    getQueryBalance(accountId, tokenId) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            try {
                const query = new sdk_1.AccountBalanceQuery()
                    .setAccountId(accountId);
                const response = yield query.execute(this.clientService.getClient());
                let balance = null;
                if (tokenId) {
                    balance = {
                        tokens: [{
                                tokenId: tokenId,
                                balance: ((_a = response.tokens) === null || _a === void 0 ? void 0 : _a._map.get(tokenId)) ? Number((_b = response.tokens._map.get(tokenId)) === null || _b === void 0 ? void 0 : _b.toString()) : 0,
                                decimals: ((_c = response.tokens) === null || _c === void 0 ? void 0 : _c._map.get(tokenId)) ? Number((_d = response.tokenDecimals) === null || _d === void 0 ? void 0 : _d._map.get(tokenId)) : 0
                            }],
                        hbars: response.hbars
                    };
                }
                else {
                    let tokens = new Array();
                    (_e = response.tokens) === null || _e === void 0 ? void 0 : _e._map.forEach((value, tokenId) => {
                        var _a, _b, _c, _d;
                        tokens.push({
                            tokenId: tokenId,
                            balance: ((_a = response.tokens) === null || _a === void 0 ? void 0 : _a._map.get(tokenId)) ? Number((_b = response.tokens._map.get(tokenId)) === null || _b === void 0 ? void 0 : _b.toString()) : 0,
                            decimals: ((_c = response.tokens) === null || _c === void 0 ? void 0 : _c._map.get(tokenId)) ? Number((_d = response.tokenDecimals) === null || _d === void 0 ? void 0 : _d._map.get(tokenId)) : 0
                        });
                    });
                    balance = {
                        tokens: tokens,
                        hbars: response.hbars
                    };
                }
                resolve(balance);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
};
AccountsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_service_1.ClientService,
        keys_service_1.KeysService])
], AccountsService);
exports.AccountsService = AccountsService;
