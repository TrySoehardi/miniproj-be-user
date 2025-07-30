import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function requestValidate(dtoClass: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const sources: Record<string, any> = {
            body: req.body,
            query: req.query,
            params: req.params,
        };

        const detectedSource = Object.entries(sources).find(
            ([, value]) => value && Object.keys(value).length > 0
        );

        if (!detectedSource) {
            return res.status(400).json({ error: "Request cant be empty" });
        }

        const [sourceName, dataToValidate] = detectedSource;


        const dtoObject = plainToInstance(dtoClass, dataToValidate);


        const errors = await validate(dtoObject, {
            skipMissingProperties: false,
            whitelist: true,
            forbidNonWhitelisted: true,
        });

        if (errors.length > 0) {
            const messages = errors
                .map((err) => Object.values(err.constraints || {}).join(", "))
                .join("; ");
            return res.status(400).json({
                error: `Validation failed on ${sourceName}: ${messages}`,
            });
        }

        (req as any).validated = dtoObject;

        next();
    };
}
