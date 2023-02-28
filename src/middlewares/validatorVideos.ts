import {NextFunction, Request, Response} from 'express';
import {  body,  validationResult } from 'express-validator';


export const videosValidator =
    [
        body('title').isString().trim().isLength({ min: 0, max: 40}),
        body('author').isString().isLength({max: 20}),
        body('availableResolutions').isArray(),
        body('minAgeRestriction').toInt().custom(val =>
        {
            return val.toInt() >= 1 && val.toInt() <= 18;
        }),
    ];

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) =>
{
    const errors = validationResult(req);

    if(!errors.isEmpty())
    {
        const errorsOccurred = errors.array({onlyFirstError: true}).map(e => {
            return {
                message: e.msg,
                field: e.param
            }
        })
        res.status(400).json({errorsMessages: errorsOccurred})
    }
    else
    {
        next();
    }
}