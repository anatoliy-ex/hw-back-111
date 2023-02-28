import express, {NextFunction, Request, Response} from 'express';
import {  body,  validationResult } from 'express-validator';

export const videosValidator =
    [

        body('title').isString().isLength({ min: 0, max: 40}),
        body('author').isString().isLength({max: 20}),
        body('availableResolutions').isString().isEmpty(),
        body('minAgeRestriction').toInt().isLength({min: 1, max: 18}),
        body('canBeDownloaded').isBoolean(),
    ];

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) =>
{
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