"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HfsModule = void 0;
const common_1 = require("@nestjs/common");
const hfs_service_1 = require("./hfs.service");
const client_module_1 = require("../client/client.module");
let HfsModule = class HfsModule {
};
HfsModule = __decorate([
    (0, common_1.Module)({
        imports: [client_module_1.ClientModule],
        controllers: [],
        providers: [hfs_service_1.HfsService],
        exports: [hfs_service_1.HfsService]
    })
], HfsModule);
exports.HfsModule = HfsModule;
