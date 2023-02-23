import { Router } from 'express';

export interface Irouter {
    basePath: string,
    router: Router,
    controller: unknown,
    configureRoutes(): void,
}
