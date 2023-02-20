"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
var consoleLogger;
exports.logger = {
    init: () => {
        consoleLogger = winston_1.default.createLogger({
            level: 'info',
            format: winston_1.default.format.json(),
            defaultMeta: { service: 'SuperShare' },
            transports: [
                new winston_1.default.transports.Console(),
            ],
        });
    },
    info: (message) => consoleLogger.log('info', message),
    warn: (message) => consoleLogger.log('warn', message),
    error: (message) => consoleLogger.log('error', message),
};
//# sourceMappingURL=logger.js.map