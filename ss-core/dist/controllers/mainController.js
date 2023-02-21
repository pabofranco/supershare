"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MainController {
    constructor() {
        this.name = 'MainController';
    }
    healthCheck(_, response) {
        return response.status(200).json({ status: 'ok', message: 'online' });
    }
    describeTable(req, response) {
        const { table } = req.params;
        return response.status(200).json({ error: false, data: `Table: ${table}` });
    }
}
exports.default = MainController;
//# sourceMappingURL=mainController.js.map