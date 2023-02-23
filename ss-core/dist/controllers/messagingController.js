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
const validationHelper_1 = require("../helpers/validationHelper");
const messagingService_1 = __importDefault(require("../services/messagingService"));
class MessagingController {
    createQueue(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // validate params
                const { queue } = request.body;
                if (!queue)
                    throw new Error('Invalid queue name provided');
                if (!(yield messagingService_1.default.createQueue(queue)))
                    throw new Error(`Error while creating queue ${queue}`);
                return response.status(200);
            }
            catch (ex) {
                const { message } = ex;
                return response.status(500).json({ error: true, message });
            }
        });
    }
    removeQueue(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // validate params
                const { id } = request.body;
                if (!id)
                    throw new Error('Invalid id provided');
                yield messagingService_1.default.removeQueue(id);
                return response.status(200);
            }
            catch (ex) {
                const { message } = ex;
                return response.status(500).json({ error: true, message });
            }
        });
    }
    publishMessage(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // validate params
                const { error, message } = validationHelper_1.validationHelper.validateQueueMessage(request.body);
                if (error)
                    throw new Error(message);
                const { id, queue, data } = request.body;
                if (!messagingService_1.default.publish(queue, data, id))
                    throw new Error(`Error publishing message ${data} from ${id} to queue: ${queue}`);
                return response.status(200);
            }
            catch (ex) {
                const { message } = ex;
                return response.status(500).json({ error: true, message });
            }
        });
    }
}
exports.default = new MessagingController();
//# sourceMappingURL=messagingController.js.map