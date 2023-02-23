import winston from 'winston';

class Logger {
    logger: winston.Logger;

    constructor() {
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            defaultMeta: { service: 'SuperShare' },
            transports: [
                new winston.transports.Console(),
            ],
        });
    }

        info(message: string)  { this.logger.log('info', message); }
        warn(message: string)  { this.logger.log('warn', message); }
        error(message: string) { this.logger.log('error', message); }
}

export default new Logger();
