import { IDI } from "../interface/Idi";
import { Request, Response, NextFunction } from "express";
import { theDi } from "../DI/index";
// import getUUID from "../../lib/utils/uuid";

declare module "express-serve-static-core" {
    interface Request {
        di: IDI;
    }
}

export async function state(req: Request, res: Response, next: NextFunction) {
    req.di = theDi;
    // getUUID
    await next();
}