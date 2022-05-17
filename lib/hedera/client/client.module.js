"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ClientModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientModule = void 0;
const common_1 = require("@nestjs/common");
const client_service_1 = require("./client.service");
let ClientModule = ClientModule_1 = class ClientModule {
    static forRoot(operators, network) {
        return {
            module: ClientModule_1,
            providers: [
                {
                    provide: 'operators',
                    useValue: operators,
                },
                {
                    provide: 'network',
                    useValue: network
                },
                client_service_1.ClientService,
            ],
            exports: [client_service_1.ClientService]
        };
    }
};
ClientModule = ClientModule_1 = __decorate([
    (0, common_1.Module)({})
], ClientModule);
exports.ClientModule = ClientModule;
