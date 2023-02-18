import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (_: Request, res: Response): Response => {
    return res.status(200).json({ status: 'ok', message: 'online' });
});

module.exports = router;