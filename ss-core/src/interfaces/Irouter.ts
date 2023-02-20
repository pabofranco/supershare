import { Router } from 'express';
import { Icontroller } from './Icontroller';
import { IdataController } from './IdataController';

export interface Irouter<T = unknown> {
    path: string,
    router: Router,
    controller: IdataController<T> | Icontroller,
    configureRoutes(): void,
}
