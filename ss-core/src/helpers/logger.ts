import winston from 'winston';

var consoleLogger: winston.Logger;

export const logger = {
    init: () => {
        consoleLogger = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            defaultMeta: { service: 'SuperShare' },
            transports: [
                new winston.transports.Console(),
            ],
        });
    },
    info:  (message: string) => consoleLogger.log('info', message),
    warn:  (message: string) => consoleLogger.log('warn', message),
    error: (message: string) => consoleLogger.log('error', message),
};
