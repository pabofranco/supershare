import { Request, Response } from 'express';
import { validationHelper } from 'helpers';
import { IqueueMessage } from 'interfaces';
import { Messaging } from 'services';

class MessagingController {
    public async createQueue(request: Request, response: Response): Promise<Response> {
        try {
            // validate params
            const { queue } = request.body;
            if (!queue) throw new Error('Invalid queue name provided');

            if (!await Messaging.createQueue(queue))
                throw new Error(`Error while creating queue ${queue}`);

            return response.status(200).json({ message: 'Queue created successfully' });
        } catch(ex) {
            const { message } = ex as Error;
            return response.status(500).json({ error: true, message });
        }
    }

    public async removeQueue(request: Request, response: Response): Promise<Response> {
        try {
            // validate params
            const { id } = request.body;
            if (!id) throw new Error('Invalid id provided');

            await Messaging.removeQueue(id);

            return response.status(200).json({ message: 'Queue removed successfully' });
        } catch(ex) {
            const { message } = ex as Error;
            return response.status(500).json({ error: true, message });
        }
    }

    public async publishMessage(request: Request, response: Response): Promise<Response> {
        try {
            // validate params
            const { error, message } = validationHelper.validateQueueMessage(request.body);
            if (error) throw new Error(message);

            const { id, queue, data } = request.body as IqueueMessage;
            if (!Messaging.publish(queue, data, id))
                throw new Error(`Error publishing message ${data} from ${id} to queue: ${queue}`);

            return response.status(200).json({ message: 'Message published successfully' });
        } catch(ex) {
            const { message } = ex as Error;
            return response.status(500).json({ error: true, message });
        }
    }
}

export default new MessagingController();
