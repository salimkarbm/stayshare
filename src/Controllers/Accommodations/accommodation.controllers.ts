import { Request, Response, NextFunction } from 'express';
import { IAccommodation } from '../../Models/interfaces/accomodation';
import AppError from '../../Utils/Errors/appError';
import { accomodationService } from '../../Services/Accommodations/accommodation.services';
import HttpStatusCode from '../../Utils/httpStatusCodes/httpStatusCode';

import logger from '../../Utils/Logger/index';

const statusCode = new HttpStatusCode();

export const addAccommodation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const accomodation: IAccommodation | void =
            await accomodationService.addAccommodation(req, next);
        return res.status(statusCode.created()).json({
            status: 'success',
            message: 'Accomodation created successfully',
            data: {
                accomodation
            }
        });
    } catch (err) {
        logger.error(err);
        return next(
            new AppError(
                `something went wrong here is the error ${err}`,
                statusCode.internalServerError()
            )
        );
    }
};

export const getAccommodations = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const accomodation: IAccommodation[] | void =
            await accomodationService.getAccommodations(req, next);
        return res.status(statusCode.ok()).json({
            status: 'success',
            message: 'Accomodations fetch successfully',
            resuilt: accomodation?.length,
            data: {
                accomodation
            }
        });
    } catch (err) {
        logger.error(err);
        return next(
            new AppError(
                `something went wrong here is the error ${err}`,
                statusCode.internalServerError()
            )
        );
    }
};

export const getAccommodation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const accomodation: IAccommodation | void =
            await accomodationService.getAccommodation(req, next);
        return res.status(statusCode.ok()).json({
            status: 'success',
            message: 'Accomodation fetch successfully',
            data: {
                accomodation
            }
        });
    } catch (err) {
        logger.error(err);
        return next(
            new AppError(
                `something went wrong here is the error ${err}`,
                statusCode.internalServerError()
            )
        );
    }
};

export const updateAccommodation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const accomodation: IAccommodation | void =
            await accomodationService.updateAccommodation(req, next);
        return res.status(statusCode.ok()).json({
            status: 'success',
            message: 'Accomodation updated successfully',
            data: {
                accomodation
            }
        });
    } catch (err) {
        logger.error(err);
        return next(
            new AppError(
                `something went wrong here is the error ${err}`,
                statusCode.internalServerError()
            )
        );
    }
};

export const deleteAllItemsInGallery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const accomodation: IAccommodation | void =
            await accomodationService.deleteAllItemsInGallery(req, next);
        return res.status(statusCode.ok()).json({
            status: 'success',
            message: 'Gallery deleted successfully',
            data: {
                accomodation
            }
        });
    } catch (err) {
        logger.error(err);
        return next(
            new AppError(
                `something went wrong here is the error ${err}`,
                statusCode.internalServerError()
            )
        );
    }
};

export const deleteSomeItemsFromGallery = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const accomodation: IAccommodation | void =
            await accomodationService.deleteSomeItemsFromGallery(req, next);
        return res.status(statusCode.ok()).json({
            status: 'success',
            message: 'Items deleted successfully',
            data: {
                accomodation
            }
        });
    } catch (err) {
        logger.error(err);
        return next(
            new AppError(
                `something went wrong here is the error ${err}`,
                statusCode.internalServerError()
            )
        );
    }
};
