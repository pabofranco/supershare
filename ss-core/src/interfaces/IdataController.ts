import { Request, Response } from "express";
import { Icontroller } from "./Icontroller";

export interface IdataController extends Icontroller {
    insert(req: Request, res: Response): Promise<Response>,
    remove(req: Request, res: Response): Promise<Response>,
    update(req: Request, res: Response): Promise<Response>,
    list(req: Request, res: Response): Promise<Response>,
}
