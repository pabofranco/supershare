"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
class APIService {
    constructor(options, controllers) {
        this.server = (0, express_1.default)();
        this.port = options.port;
        this.host = options.host;
        this.configureServer();
        this.initializeRoutes(controllers);
    }
    configureServer() {
        this.server.use(express_1.default.json());
        this.server.use(express_1.default.urlencoded({ extended: false }));
        this.server.use((0, cookie_parser_1.default)());
        this.server.use((0, cors_1.default)());
    }
    initializeRoutes(controllers) {
        controllers.forEach((controller) => {
            this.server.use(controller.path, controller.router);
        });
    }
    startServer() {
        this.server.listen(this.port, this.host, () => {
            console.log(`API online at http://${this.host}:${this.port}`);
        });
    }
}
exports.default = APIService;
//# sourceMappingURL=apiService.js.map