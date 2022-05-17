"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartNode = void 0;
const axios_1 = __importDefault(require("axios"));
class SmartNode {
    constructor() {
        this.nodes = {
            testnet: [
                {
                    "operator": "0.0.34754823",
                    "publicKey": "302a300506032b6570032100326271f17a2ddce3ba55abc4d157783157d59e05c3b271f464b53ff22450aa57",
                    "url": "https://testnet-sn1.hbarsuite.network"
                },
                {
                    "operator": "0.0.34754827",
                    "publicKey": "302a300506032b6570032100c86ea8a5aee8538c2c25c6cd66e91790c9c7b05614210ee3687b895697801956",
                    "url": "https://testnet-sn2.hbarsuite.network"
                },
                {
                    "operator": "0.0.34754830",
                    "publicKey": "302a300506032b65700321009f898d1c0a80847542080aab6a7fcf3480281cf772c5f274a445cd7bd0b5a0ba",
                    "url": "https://testnet-sn3.hbarsuite.network"
                },
                {
                    "operator": "0.0.34754833",
                    "publicKey": "302a300506032b65700321004b62d79fa8a48cdfec1eadf720414cafd9565496bc4493fa3bbba040e11a3cc2",
                    "url": "https://testnet-sn4.hbarsuite.network"
                }
            ],
            mainnet: []
        };
    }
    getNode(network) {
        return this.nodes[network][Math.floor(Math.random() * this.nodes[network].length)];
    }
    loadLaunchpads(network) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let node = this.getNode(network);
                    let response = yield axios_1.default.get(`${node.url}/tokens/launchpad`);
                    response.data.forEach((data) => {
                        data.image = `${node.url}/${data.image}`;
                    });
                    resolve({
                        function: 'loadLaunchpads',
                        node: node,
                        data: response.data
                    });
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    loadPools(network) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let node = this.getNode(network);
                    let response = yield axios_1.default.get(`${node.url}/pools/list`);
                    resolve({
                        function: 'loadPools',
                        node: node,
                        data: response.data
                    });
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    createPool(network, pool) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let node = this.getNode(network);
                    let response = yield axios_1.default.post(`${node.url}/pools/create`, pool, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    resolve({
                        function: 'createPool',
                        node: node,
                        data: response.data
                    });
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    getAccountInfos(network, accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let node = this.getNode(network);
                    let response = yield axios_1.default.get(`${node.url}/hedera/accounts/info?accountId=${accountId}`);
                    resolve({
                        function: 'getAccountInfos',
                        node: node,
                        data: response.data
                    });
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    getAccountBalance(network, accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let node = this.getNode(network);
                    let response = yield axios_1.default.get(`${node.url}/hedera/accounts/balance?accountId=${accountId}`);
                    resolve({
                        function: 'getAccountInfos',
                        node: node,
                        data: response.data
                    });
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    loadTokens(network) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let node = this.getNode(network);
                    let response = yield axios_1.default.get(`${node.url}/tokens/list`);
                    response.data.forEach((data) => {
                        data.image = `${node.url}/${data.image}`;
                    });
                    resolve({
                        function: 'loadTokens',
                        node: node,
                        data: response.data
                    });
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    calculatePoolPrice(network, amount, baseTokenId, swapTokenId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let node = this.getNode(network);
                    let response = yield axios_1.default.get(`${node.url}/pools/price?amount=${amount}&baseToken=${baseTokenId}&swapToken=${swapTokenId}`);
                    resolve({
                        function: 'calculatePoolPrice',
                        node: node,
                        data: response.data
                    });
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
}
exports.SmartNode = SmartNode;
