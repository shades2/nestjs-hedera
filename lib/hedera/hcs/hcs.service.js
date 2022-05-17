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
exports.HcsService = void 0;
const sdk_1 = require("@hashgraph/sdk");
const common_1 = require("@nestjs/common");
const client_service_1 = require("../client/client.service");
let HcsService = class HcsService {
    constructor(clientService) {
        this.clientService = clientService;
        this.logger = new common_1.Logger("HCS Service");
        // HCS Service
    }
    // Create topic...
    createTopic(adminKey, submitKey, memo) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                // creating the transaction...
                const transaction = new sdk_1.TopicCreateTransaction();
                let txResponse = null;
                // setting the admin key, if any...
                if (adminKey) {
                    transaction.setAdminKey(adminKey);
                }
                // setting the submit key, if any...
                if (submitKey) {
                    transaction.setSubmitKey(submitKey);
                }
                // setting the topic memo, if any...
                if (memo) {
                    transaction.setTopicMemo(memo);
                }
                // freezing the transaction...
                transaction.freezeWith(this.clientService.getClient());
                // if there is an admin key, transaction must be signed...
                if (adminKey) {
                    const signTx = yield transaction.sign(adminKey);
                    txResponse = yield signTx.execute(this.clientService.getClient());
                }
                // otherwise, we can just execute it...
                else {
                    txResponse = yield transaction.execute(this.clientService.getClient());
                }
                // finally, fetching the topicId from the response...
                const receipt = yield txResponse.getReceipt(this.clientService.getClient());
                resolve(receipt.topicId);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    // Update topic...
    updateTopic(topicId, currentAdminKey, adminKey, submitKey, memo) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                // creating the transaction...
                const transaction = new sdk_1.TopicUpdateTransaction().setTopicId(topicId);
                let txResponse = null;
                // setting the new admin key, if any...
                if (adminKey) {
                    transaction.setAdminKey(adminKey);
                }
                // setting the new submit key, if any...
                if (submitKey) {
                    transaction.setSubmitKey(submitKey);
                }
                // setting the new topic memo, if any...
                if (memo) {
                    transaction.setTopicMemo(memo);
                }
                // freezing the transaction...
                transaction.freezeWith(this.clientService.getClient());
                // if the transaction has got an admin key, we must use it to sign...
                if (currentAdminKey) {
                    let signTx = yield transaction.sign(currentAdminKey);
                    // if there is a new admin key, we must use it to double sign it...
                    if (adminKey) {
                        signTx = yield signTx.sign(adminKey);
                    }
                    // executing the transaction, after signatures...
                    txResponse = yield signTx.execute(this.clientService.getClient());
                }
                // otherwise we can just sign the transaction...
                else {
                    txResponse = yield transaction.execute(this.clientService.getClient());
                }
                // fetching the status of the executed transaction...
                const receipt = yield txResponse.getReceipt(this.clientService.getClient());
                resolve(receipt.status);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    // Delete topic...
    deleteTopic(topicId, adminKey) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                // creating the transaction, and freezing it...
                const transaction = new sdk_1.TopicDeleteTransaction()
                    .setTopicId(topicId)
                    .freezeWith(this.clientService.getClient());
                // signing the transaction with admin key...
                const signTx = yield transaction.sign(adminKey);
                // fetching response...
                const txResponse = yield signTx.execute(this.clientService.getClient());
                const receipt = yield txResponse.getReceipt(this.clientService.getClient());
                // resolving status...
                resolve(receipt.status);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    // Get topic info...
    topicInfo(topicId) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const transaction = new sdk_1.TopicInfoQuery().setTopicId(topicId);
                const info = yield transaction.execute(this.clientService.getClient());
                resolve(info);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    // Submit Message...
    submitMessage(topicId, message, submitKey) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                let txResponse = null;
                // creating the transaction, setting topic and message...
                const transaction = new sdk_1.TopicMessageSubmitTransaction()
                    .setTopicId(topicId)
                    .setMessage(message);
                // freezing the transaction...
                transaction.freezeWith(this.clientService.getClient());
                // if there is an submit key, transaction must be signed...
                if (submitKey) {
                    const signTx = yield transaction.sign(submitKey);
                    txResponse = yield signTx.execute(this.clientService.getClient());
                }
                // otherwise, we can just execute it...
                else {
                    txResponse = yield transaction.execute(this.clientService.getClient());
                }
                // finally, fetching the status...
                const receipt = yield txResponse.getReceipt(this.clientService.getClient());
                resolve((_a = receipt.topicSequenceNumber) === null || _a === void 0 ? void 0 : _a.toString());
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    // Get topic message...
    getMessages(topicId, callback, start, end, limit) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                // creating the transaction...
                const transaction = new sdk_1.TopicMessageQuery()
                    .setTopicId(topicId);
                if (start !== undefined) {
                    transaction.setStartTime(start);
                }
                if (end !== undefined) {
                    transaction.setEndTime(end);
                }
                if (limit !== undefined) {
                    transaction.setLimit(limit);
                }
                let subscription = transaction.subscribe(this.clientService.getClient(), null, (message) => callback(message));
                resolve(subscription);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
};
HcsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_service_1.ClientService])
], HcsService);
exports.HcsService = HcsService;
