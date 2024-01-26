import { Request, Response, NextFunction } from 'express';
import AppError from '../../Utils/Errors/appError';
import HttpStatusCode from '../../Utils/httpStatusCodes/httpStatusCode';
import { userService } from '../../Services/Users/user.services';
import logger from '../../Utils/Logger/index';

const statusCode = new HttpStatusCode();

export const viewProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const profile = await userService.viewProfile(req, next);
        return res.status(statusCode.ok()).json({
            status: 'success',
            message: 'Profile fetch successfully',
            date: {
                profile
            }
        });
    } catch (error) {
        logger.error("can't load profile", error);
        return next(
            new AppError(
                `something went wrong, here is the error ${error}`,
                statusCode.internalServerError()
            )
        );
    }
};

export const getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await userService.getUsers(req, next);

        return res.status(statusCode.ok()).json({
            status: 'success',
            message: 'Users fetched successfully',
            date: {
                users
            }
        });
    } catch (error) {
        logger.error("can't Fetched Users", error);
        return next(
            new AppError(
                `something went wrong, here is the error ${error}`,
                statusCode.internalServerError()
            )
        );
    }
};

export const getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await userService.getUser(req, next);

        return res.status(statusCode.ok()).json({
            status: 'success',
            message: 'User fetched successfully',
            date: {
                user
            }
        });
    } catch (error) {
        logger.error("can't Get User", error);
        return next(
            new AppError(
                `something went wrong, here is the error ${error}`,
                statusCode.internalServerError()
            )
        );
    }
};

export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await userService.updateUser(req, next);

        return res.status(statusCode.ok()).json({
            status: 'success',
            message: 'User updated successfully',
            date: {
                user
            }
        });
    } catch (error) {
        logger.error("can't Update User", error);
        return next(
            new AppError(
                `something went wrong, here is the error ${error}`,
                statusCode.internalServerError()
            )
        );
    }
};

export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await userService.deleteUser(req, next);

        return res.status(statusCode.ok()).json({
            status: 'success',
            message: 'User deleted successfully',
            date: {
                user
            }
        });
    } catch (error) {
        logger.error("can't Delete User", error);
        return next(
            new AppError(
                `something went wrong, here is the error ${error}`,
                statusCode.internalServerError()
            )
        );
    }
};

export const deActivateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await userService.deActivateUser(req, next);
        return res.status(statusCode.ok()).json({
            status: 'success',
            message: 'User de-Activate successfully',
            date: {
                user
            }
        });
    } catch (error) {
        logger.error("can't de-Activate User", error);
        return next(
            new AppError(
                `something went wrong, here is the error ${error}`,
                statusCode.internalServerError()
            )
        );
    }
};

export const changePassword = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user: any = await userService.changePassword(req, next);
        if (user) {
            return res.status(statusCode.ok()).json({
                status: 'success',
                message: 'passsword changed Successfully.',
                user
            });
        }
    } catch (err) {
        return next(
            new AppError(
                `something went wrong ${err}`,
                statusCode.internalServerError()
            )
        );
    }
};
