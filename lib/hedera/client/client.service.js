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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const common_1 = require("@nestjs/common");
const sdk_1 = require("@hashgraph/sdk");
const event_emitter_1 = require("@nestjs/event-emitter");
let ClientService = class ClientService {
    constructor(operator, network) {
        this.operator = operator;
        this.network = network;
        this.logger = new common_1.Logger("Client Service");
        // Create our connection to the Hedera network...
        this.client = this.generateNewClient();
    }
    generateNewClient() {
        if (this.network == 'testnet') {
            this.client = sdk_1.Client.forTestnet();
        }
        else {
            this.client = sdk_1.Client.forMainnet();
        }
        this.client.setOperator(this.operator.accountId, this.operator.privateKey);
        return this.client;
    }
    getClient() {
        return this.client;
    }
    getNodeOperator() {
        return this.operator;
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('client.invalid_node_operator'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClientService.prototype, "generateNewClient", null);
ClientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('operator')),
    __param(1, (0, common_1.Inject)('network')),
    __metadata("design:paramtypes", [Object, String])
], ClientService);
exports.ClientService = ClientService;
