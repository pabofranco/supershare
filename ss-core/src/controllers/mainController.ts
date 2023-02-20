import { Request, Response } from 'express';
import { Icontroller } from '../interfaces/Icontroller';

class MainController implements Icontroller {
    name = 'MainController';

    indexRoute(_: Request, response: Response): Response {
        return response.status(200).json({ status: 'ok', message: 'online' });
    }
}

export default MainController;
