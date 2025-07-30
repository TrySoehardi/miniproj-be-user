import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { AuthenticationDTO } from '../DTO/authenticationDto';
import { BadRequestError } from '../error/badRequestError';

export async function signUp(req: Request, res: Response, next: NextFunction) {
    const di = req.di;
    try {
        const validateBody = (req as any).validated as AuthenticationDTO
        const result = await di.authenticationService.signUp(validateBody);
        return res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

export async function signIn(req: Request, res: Response, next: NextFunction) {
    const di = req.di;
    try {
        const validateBody = (req as any).validated as AuthenticationDTO
        const result = await di.authenticationService.signIn(validateBody);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}
