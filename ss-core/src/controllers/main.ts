import { Request, Response } from 'express';

class MainController {
    healthCheck(_: Request, response: Response): Response {
        return response.status(200).json({ status: 'ok', message: 'online' });
    }

    describeTable(req: Request, response: Response): Response {
        const { table } = req.params;
        return response.status(200).json({ error: false, data: `Table: ${table}`});
    }
}

export default new MainController();
