import { Router } from 'express';
import { Icontroller } from './Icontroller';

export interface Irouter {
    path: string,
    router: Router,
    controller: Icontroller,
    configureRoutes(): void,
}
