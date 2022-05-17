"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtsModule = void 0;
const common_1 = require("@nestjs/common");
const hts_service_1 = require("./hts.service");
const hts_rest_service_1 = require("./hts-rest.service");
const client_module_1 = require("../client/client.module");
const rest_module_1 = require("../rest/rest.module");
let HtsModule = class HtsModule {
};
HtsModule = __decorate([
    (0, common_1.Module)({
        imports: [client_module_1.ClientModule, rest_module_1.RestModule, client_module_1.ClientModule],
        controllers: [],
        providers: [hts_service_1.HtsService, hts_rest_service_1.HtsRestService],
        exports: [hts_service_1.HtsService, hts_rest_service_1.HtsRestService]
    })
], HtsModule);
exports.HtsModule = HtsModule;
