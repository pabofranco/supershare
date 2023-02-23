import { Connection, Channel, connect, Options } from 'amqplib';
import { messaging } from '../config/Settings.json';
import { Logger } from 'providers';

class Messaging {
    private connection: Connection | null;
    private channel: Channel | null;
    private baseChannelOptions: Options.AssertQueue = {
        durable: true,
        exclusive: false,
        autoDelete: false,
    };

    constructor() {
        this.connection = null;
        this.channel = null;
    }

    async start(): Promise<void> {
        try {
            Logger.info('Initializing Messaging Service...');

            const rabbitServer = `${messaging.connection.host}:${messaging.connection.port}`;
            const rabbitCredentials = `${messaging.administration.user}:${messaging.administration.password}`;
            const connectionString = `amqp://${rabbitCredentials}@${rabbitServer}`;

            this.connection = await connect(connectionString);
            this.channel = await this.connection.createChannel();

            Logger.info('Messaging Service initialized.');
        } catch(ex) {
            Logger.error(`Error while initializing Messaging Service: ${ex}`);
            setTimeout(async () => { this.start(); } , 5000);
        }
    }

    publish(queue: string, message: string, id: string): boolean {
        try {
            return this.channel?.sendToQueue(queue, Buffer.from(message), { userId: id }) || false;
        } catch(ex) {
            Logger.error(`Error while publishing message ${message}: ${ex}`);
            return false;
        }
    }

    createQueue(queue: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            try {
                this.channel?.assertQueue(queue, this.baseChannelOptions)
                    .then(() => resolve(true))
                    .catch((error) => { throw new Error(error); });
            } catch(ex) {
                Logger.error(`Error while creating queue ${queue}: ${ex}`);
                return reject(false);
            }
        });
    }

    removeQueue(queue: string): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                this.channel?.deleteQueue(queue)
                    .then(() => resolve())
                    .catch((error) => { throw new Error(error); });
            } catch(ex) {
                const reason = `Error while deleting queue ${queue}: ${ex}`;
                Logger.error(reason);
                return reject(reason);
            }
        });
    }
}

export default new Messaging();
