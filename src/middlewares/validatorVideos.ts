import {NextFunction, Request, Response} from 'express';
import {  body,  validationResult } from 'express-validator';

export const videosValidator =
    [
        body('title').isString().trim().isLength({ min: 0, max: 40}),
        body('author').isString().isLength({max: 20}),
        body('availableResolutions').isArray(),
        body('minAgeRestriction').toInt(),//custom validator,
        body('canBeDownloaded').optional().isBoolean(),
    ];

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) =>
{
    console.log("333")
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        res.send(400).json({errors: errors.array()})
    }
    else
    {
        next();
    }
}