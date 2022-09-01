"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.HcsRestService = void 0;
const common_1 = require("@nestjs/common");
const rest_service_1 = require("../rest/rest.service");
const lodash = __importStar(require("lodash"));
/**
 * Injectable
 */
let HcsRestService = class HcsRestService {
    /**
     * Transaction Rest Service
     * @param {RestService} restService
     */
    constructor(restService) {
        this.restService = restService;
    }
    getLatestMessages(topicId) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield this.restService
                    .call(`topics/${topicId}/messages?order=desc`);
                resolve(response);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    getLatestMessagesFromTimestamp(topicId, timestamp) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let messages = [];
                let response = yield this.restService
                    .call(`topics/${topicId}/messages?order=desc&timestamp=gte:${timestamp}.000000000`);
                messages = messages.concat(response.messages);
                let retry = false;
                let timeout = 0;
                while (response.links.next || retry) {
                    if (timeout) {
                        yield new Promise(resolve => setTimeout(resolve, timeout));
                    }
                    let next = lodash.get(response.links.next.split("?"), 1);
                    try {
                        response = yield this.restService
                            .call(`topics/${topicId}/messages?${next}`);
                        messages = messages.concat(response.messages);
                        retry = false;
                    }
                    catch (error) {
                        timeout += 100;
                        retry = true;
                    }
                }
                resolve(messages);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
};
HcsRestService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [rest_service_1.RestService])
], HcsRestService);
exports.HcsRestService = HcsRestService;
