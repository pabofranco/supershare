"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MainController {
    constructor() {
        this.name = 'MainController';
    }
    indexRoute(_, response) {
        return response.status(200).json({ status: 'ok', message: 'online' });
    }
}
exports.default = MainController;
//# sourceMappingURL=mainController.js.map