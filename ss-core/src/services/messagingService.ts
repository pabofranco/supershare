import { Connection, Channel, connect, Message, ConsumeMessage } from 'amqplib';
import { messaging } from '../config/Settings.json';
import { ICredentials } from '../interfaces/ICredentials';
import LoggerService, { Logger } from './loggerService';

class MessagingService {
    private logger: Logger = LoggerService.getInstance();
    private connection: Connection | null;
    private channel: Channel | null;
    private user: string;
    private password: string;

    constructor(credentials: ICredentials) {
        this.user = credentials.user;
        this.password = credentials.password;
        this.connection = null;
        this.channel = null;

        this.start();
    }

    async start(): Promise<void> {
        try {
            this.logger.info('Initializing Messaging Service...');

            const rabbitServer = `${messaging.connection.host}:${messaging.connection.port}`;
            const connectionString = `amqp://${this.user}:${this.password}@${rabbitServer}`;

            this.connection = await connect(connectionString);
            this.channel = await this.connection.createChannel();

            this.logger.info('Messaging Service initialized.');
        } catch(ex) {
            this.logger.error(`Error while initializing Messaging Service: ${ex}`);
        }
    }

    publish(queue: string, message: string): boolean {
        if (this.channel) {
            return this.channel.sendToQueue(queue, Buffer.from(message));
        }

        return false;
    }
}

export default MessagingService;