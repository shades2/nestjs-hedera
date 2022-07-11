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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountBalance = void 0;
const swagger_1 = require("@nestjs/swagger");
const token_balance_class_1 = require("./token_balance.class");
class AccountBalance {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], AccountBalance.prototype, "hbars", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: token_balance_class_1.TokenBalance, isArray: true }),
    __metadata("design:type", Array)
], AccountBalance.prototype, "tokens", void 0);
exports.AccountBalance = AccountBalance;
