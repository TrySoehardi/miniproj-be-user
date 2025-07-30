import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../error/badRequestError";

export function errorCatcher(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err);
    if (err instanceof BadRequestError) {
        return res.status(err.status).json({ error: err.message });
    }
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ error: "Internal Server Error" });
}
