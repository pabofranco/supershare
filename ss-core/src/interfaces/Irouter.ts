import { Router } from 'express';
import { Icontroller } from './Icontroller';

export interface Irouter{
    basePath: string,
    router: Router,
    controller: Icontroller,
    configureRoutes(): void,
}
