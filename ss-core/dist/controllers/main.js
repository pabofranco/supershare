"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MainController {
    healthCheck(_, response) {
        return response.status(200).json({ status: 'ok', message: 'online' });
    }
    describeTable(req, response) {
        const { table } = req.params;
        return response.status(200).json({ error: false, data: `Table: ${table}` });
    }
}
exports.default = new MainController();
//# sourceMappingURL=main.js.map