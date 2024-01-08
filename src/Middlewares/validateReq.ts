import { Request, NextFunction, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { userRepository } from '../Repositories/Users/user.repository';
import HttpStatusCode from '../Utils/httpStatusCodes/httpStatusCode';
import AppError from '../Utils/Errors/appError';
import Utilities from '../Utils/helpers';

const util = new Utilities();
const statusCode = new HttpStatusCode();

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const resultErrors = [];
    errors
        .array()
        .map((err: any) => resultErrors.push({ [err.path]: err.msg }));

    resultErrors.push({ message: 'Action unsuccessful' });
    resultErrors.push({ success: false });
    const errorObject = Object.assign({}, ...resultErrors);
    return res.status(422).json(errorObject);
};

export const authenticate = async (
    req: any,
    res: Response,
    next: NextFunction
) => {
    try {
        let token;
        if (!req.headers.authorization) {
            return res.status(statusCode.unauthorized()).json({
                message:
                    'please provide an authorization header to gain access',
                success: false
            });
        }
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            return res.status(statusCode.unauthorized()).json({
                message: 'Invalid authorization header',
                success: false
            });
        }
        const decoded = (await util.verifyJWT(token)) as JwtPayload;
        if (decoded.expired === true) {
            return next(
                new AppError(
                    'Expired token please login',
                    statusCode.accessForbidden()
                )
            );
        }
        const currentUser = await userRepository.findUserById(
            decoded.payload.user_id
        );
        if (!currentUser) {
            return res.status(statusCode.unauthorized()).json({
                message: 'the user belongs to the token no longer exist.',
                success: false
            });
        }
        req.user = currentUser;
        next();
    } catch (error) {
        return next(
            new AppError(
                `something went wrong here is the error ${error}`,
                statusCode.internalServerError()
            )
        );
    }
};
