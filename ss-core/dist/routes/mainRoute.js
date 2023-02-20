"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
exports.router = (0, express_1.Router)()
    .get('/', (_, res) => {
    return res.status(200).json({ status: 'ok', message: 'online' });
});
//# sourceMappingURL=mainRoute.js.map