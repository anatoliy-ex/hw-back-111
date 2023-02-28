import {NextFunction, Request, Response} from 'express';
import {body, validationResult} from 'express-validator';

const titleValidation = body('title').isString().trim().notEmpty().isLength({min: 1, max: 40})


const minAgeRestrictionValidation = body('minAgeRestriction')
    .custom(v => {
        try {
            if (v !== null && typeof v !== 'number') {
                throw new Error()
            }
            if (v !== null) {
                if (v >= 1 && v <= 18) return true
                throw new Error()
            }
            return true
        } catch (e) {
            throw new Error()
        }
    })


const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorsOccurred = errors.array({onlyFirstError: true}).map(e => {
            return {
                message: e.msg,
                field: e.param
            }
        })
        res.status(400).json({errorsMessages: errorsOccurred})
    } else {
        next();
    }
}


export const createVideosValidator =
    [
        titleValidation,
        body('author').isString().isLength({max: 20}),
        body('availableResolutions').isArray().custom(val => {
            return true
        }),
        inputValidationMiddleware

    ];


export const updateVideosValidator =
    [
        ...createVideosValidator,
        minAgeRestrictionValidation,
        inputValidationMiddleware

    ];

const qualityCheck = (arr: string[], arr2: string[]) => {
    return arr.every((res: string) => arr2.includes(res))
}

