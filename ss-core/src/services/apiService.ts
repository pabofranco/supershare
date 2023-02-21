import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { IapiOptions } from '../interfaces/IapiOptions';
import { Irouter } from '../interfaces/Irouter';

class APIService {
    public server: express.Application;
    public host: string;
    public port: number;

    constructor(options: IapiOptions, routes: Irouter[]) {
        this.server = express();
        this.port = options.port;
        this.host = options.host;

        this.configureServer();
        this.configureRoutes(routes);
    }

    private configureServer(): void {
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: false }));
        this.server.use(cookieParser());
        this.server.use(cors());
    }

    private configureRoutes(routes: Irouter[]): void {
        routes.forEach((route: Irouter) => {
            this.server.use(route.basePath, route.router);
        });
    }

    public startServer() {
        this.server.listen(this.port, this.host, () => {
            console.log(`API online at http://${this.host}:${this.port}/api/v1`);
        });
    }
}

export default APIService;
