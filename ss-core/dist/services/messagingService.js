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
const amqplib_1 = require("amqplib");
const Settings_json_1 = require("../config/Settings.json");
const loggerService_1 = __importDefault(require("./loggerService"));
class Messaging {
    constructor() {
        this.baseChannelOptions = {
            durable: true,
            exclusive: false,
            autoDelete: false,
        };
        this.connection = null;
        this.channel = null;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                loggerService_1.default.info('Initializing Messaging Service...');
                const rabbitServer = `${Settings_json_1.messaging.connection.host}:${Settings_json_1.messaging.connection.port}`;
                const rabbitCredentials = `${Settings_json_1.messaging.administration.user}:${Settings_json_1.messaging.administration.password}`;
                const connectionString = `amqp://${rabbitCredentials}@${rabbitServer}`;
                this.connection = yield (0, amqplib_1.connect)(connectionString);
                this.channel = yield this.connection.createChannel();
                loggerService_1.default.info('Messaging Service initialized.');
            }
            catch (ex) {
                loggerService_1.default.error(`Error while initializing Messaging Service: ${ex}`);
                setTimeout(() => __awaiter(this, void 0, void 0, function* () { this.start(); }), 5000);
            }
        });
    }
    publish(queue, message) {
        var _a;
        try {
            return ((_a = this.channel) === null || _a === void 0 ? void 0 : _a.sendToQueue(queue, Buffer.from(message))) || false;
        }
        catch (ex) {
            loggerService_1.default.error(`Error while publishing message ${message}: ${ex}`);
            return false;
        }
    }
    createQueue(queue) {
        return new Promise((resolve, reject) => {
            var _a;
            try {
                (_a = this.channel) === null || _a === void 0 ? void 0 : _a.assertQueue(queue, this.baseChannelOptions).then(() => resolve(true)).catch((error) => { throw new Error(error); });
            }
            catch (ex) {
                loggerService_1.default.error(`Error while creating queue ${queue}: ${ex}`);
                return reject(false);
            }
        });
    }
    removeQueue(queue) {
        return new Promise((resolve, reject) => {
            var _a;
            try {
                (_a = this.channel) === null || _a === void 0 ? void 0 : _a.deleteQueue(queue).then(() => resolve()).catch((error) => { throw new Error(error); });
            }
            catch (ex) {
                const reason = `Error while deleting queue ${queue}: ${ex}`;
                loggerService_1.default.error(reason);
                return reject(reason);
            }
        });
    }
}
exports.default = new Messaging();
//# sourceMappingURL=messagingService.js.map