import { Request, Response } from 'express';
import { Icontroller } from '../interfaces/Icontroller';

class MainController implements Icontroller {
    name: string;

    constructor() {
        this.name = 'MainController';
    }

    healthCheck(_: Request, response: Response): Response {
        return response.status(200).json({ status: 'ok', message: 'online' });
    }
    describeTable(req: Request, response: Response): Response {
        const { table } = req.params;
        return response.status(200).json({ error: false, data: `Table: ${table}`});
    }
}

export default MainController;
