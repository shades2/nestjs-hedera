"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TransactionsModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsModule = void 0;
const common_1 = require("@nestjs/common");
const transactions_service_1 = require("./transactions.service");
const transactions_rest_service_1 = require("./transactions-rest.service");
const client_module_1 = require("../client/client.module");
const rest_module_1 = require("../rest/rest.module");
let TransactionsModule = TransactionsModule_1 = class TransactionsModule {
    static forRoot(operator, mirrorNode, network) {
        return {
            module: TransactionsModule_1,
            imports: [
                client_module_1.ClientModule.forRoot(operator, network),
                rest_module_1.RestModule.forRoot(mirrorNode)
            ],
            providers: [transactions_service_1.TransactionsService, transactions_rest_service_1.TransactionsRestService],
            exports: [transactions_service_1.TransactionsService, transactions_rest_service_1.TransactionsRestService]
        };
    }
};
TransactionsModule = TransactionsModule_1 = __decorate([
    (0, common_1.Module)({})
], TransactionsModule);
exports.TransactionsModule = TransactionsModule;
