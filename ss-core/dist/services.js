"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Messaging = exports.Database = exports.API = void 0;
const Api_service_1 = __importDefault(require("services/Api.service"));
exports.API = Api_service_1.default;
const Database_service_1 = __importDefault(require("services/Database.service"));
exports.Database = Database_service_1.default;
const Messaging_service_1 = __importDefault(require("services/Messaging.service"));
exports.Messaging = Messaging_service_1.default;
//# sourceMappingURL=services.js.map