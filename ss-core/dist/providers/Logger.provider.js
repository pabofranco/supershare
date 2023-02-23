"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
class Logger {
    constructor() {
        this.logger = winston_1.default.createLogger({
            level: 'info',
            format: winston_1.default.format.json(),
            defaultMeta: { service: 'SuperShare' },
            transports: [
                new winston_1.default.transports.Console(),
            ],
        });
    }
    info(message) { this.logger.log('info', message); }
    warn(message) { this.logger.log('warn', message); }
    error(message) { this.logger.log('error', message); }
}
exports.default = new Logger();
//# sourceMappingURL=Logger.provider.js.map