"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (_, res) => {
    return res.status(200).json({ status: 'ok', message: 'online' });
});
module.exports = router;
//# sourceMappingURL=main.js.map