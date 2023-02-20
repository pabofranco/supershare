import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { IapiOptions } from '../interfaces/IapiOptions';
import { Irouter } from '../interfaces/Irouter';

class APIService {
    public server: express.Application;
    public host: string;
    public port: number;

    constructor(options: IapiOptions, controllers: Irouter[]) {
        this.server = express();
        this.port = options.port;
        this.host = options.host;
        this.configureServer();
        this.initializeRoutes(controllers);
    }

    private configureServer(): void {
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: false }));
        this.server.use(cookieParser());
        this.server.use(cors());
    }

    private initializeRoutes(controllers: Irouter[]): void {
        controllers.forEach((controller: Irouter) => {
            this.server.use(controller.path, controller.router);
        });
    }

    public startServer() {
        this.server.listen(this.port, this.host, () => {
            console.log(`API online at http://${this.host}:${this.port}`);
        });
    }
}

export default APIService;
