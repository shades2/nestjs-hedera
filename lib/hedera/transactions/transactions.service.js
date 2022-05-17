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
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const client_service_1 = require("../client/client.service");
const sdk_1 = require("@hashgraph/sdk");
let TransactionsService = class TransactionsService {
    constructor(clientService) {
        this.clientService = clientService;
        this.logger = new common_1.Logger("Transactions Service");
    }
    getTransactionQuery(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let transaction = new sdk_1.TransactionRecordQuery()
                        .setTransactionId(transactionId)
                        .setIncludeDuplicates(true);
                    let receipt = yield transaction.execute(this.clientService.getClient());
                    resolve(receipt);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    getTransactionReceipt(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let transaction = new sdk_1.TransactionReceiptQuery()
                        .setTransactionId(transactionId)
                        .setIncludeDuplicates(true)
                        .setIncludeChildren(true);
                    let receipt = yield transaction.execute(this.clientService.getClient());
                    resolve(receipt);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    signScheduledTransaction(scheduleId, key) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    // Creating the transaction...
                    const transaction = yield new sdk_1.ScheduleSignTransaction()
                        .setScheduleId(scheduleId)
                        .freezeWith(this.clientService.getClient())
                        .sign(key);
                    // Signing with the client operator key...
                    const txResponse = yield transaction.execute(this.clientService.getClient());
                    // Getting the receipt of the transaction...
                    const receipt = yield txResponse.getReceipt(this.clientService.getClient());
                    // Getting the transaction status...
                    resolve(receipt.status);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    createScheduledTransaction(transactionToSchedule) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    // Creating a schedule transaction...
                    let scheduledTransaction = new sdk_1.ScheduleCreateTransaction()
                        .setScheduledTransaction(transactionToSchedule);
                    // Signing with the client operator key and submit the transaction to a Hedera network...
                    let txResponse = yield scheduledTransaction.execute(this.clientService.getClient());
                    // Requesting the receipt of the transaction...
                    let receipt = yield txResponse.getReceipt(this.clientService.getClient());
                    // Geting the schedule ID...
                    let scheduleId = receipt.scheduleId;
                    resolve(scheduleId);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    getScheduledTrasaction(scheduleId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const query = new sdk_1.ScheduleInfoQuery()
                        .setScheduleId(scheduleId);
                    const info = yield query.execute(this.clientService.getClient());
                    resolve(info);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
};
TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_service_1.ClientService])
], TransactionsService);
exports.TransactionsService = TransactionsService;
