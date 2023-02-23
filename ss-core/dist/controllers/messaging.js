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
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const services_1 = require("../services");
class MessagingController {
    createQueue(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // validate params
                const { queue } = request.body;
                if (!queue)
                    throw new Error('Invalid queue name provided');
                if (!(yield services_1.Messaging.createQueue(queue)))
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
                yield services_1.Messaging.removeQueue(id);
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
                const { error, message } = helpers_1.validationHelper.validateQueueMessage(request.body);
                if (error)
                    throw new Error(message);
                const { id, queue, data } = request.body;
                if (!services_1.Messaging.publish(queue, data, id))
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
//# sourceMappingURL=messaging.js.map