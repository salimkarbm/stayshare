import { Request, NextFunction } from 'express';
import { IAccommodation } from '../../Models/interfaces/accomodation';
import AppError from '../../Utils/Errors/appError';
import HttpStatusCode from '../../Utils/httpStatusCodes/httpStatusCode';
import Media from '../../Utils/media/media';
import { accomodationRepository } from '../../Repositories/Accommodations/accommodation.repository';

const mediaImage = new Media();
const statusCode = new HttpStatusCode();

export default class AccomodationService {
    public async addAccommodation(
        req: Request,
        next: NextFunction
    ): Promise<IAccommodation | void> {
        const { id } = req.user;
        if (id) {
            const filesArray = req.files ? Object.values(req.files).flat() : [];
            if (filesArray.length > 0) {
                const imageFiles = filesArray.map(async (image) => {
                    const cloudinary: any = await mediaImage.cloudinaryUpload(
                        image.path
                    );
                    return {
                        imageId: cloudinary.public_id,
                        imageUrl: cloudinary.secure_url
                    };
                });
                const images = await Promise.all(imageFiles);
                const payload = {
                    ...req.body,
                    createdBy: id,
                    accommodationRules: JSON.parse(req.body.accomodationRules),
                    gallery: images
                };
                const accommodation =
                    await accomodationRepository.addAccommodation(payload);
                return accommodation;
            }
            return next(
                new AppError('please upload item image', statusCode.notFound())
            );
        }
        return next(
            new AppError(
                'You are not allowed to create accomodation!, please login to gain access',
                statusCode.accessForbidden()
            )
        );
    }

    public async getAccommodations(
        req: Request,
        next: NextFunction
    ): Promise<IAccommodation | void> {
        const accommodations = await accomodationRepository.getAccommodations();
        return accommodations;
    }

    public async getAccommodation(
        req: Request,
        next: NextFunction
    ): Promise<IAccommodation | void> {
        const { accommodationId } = req.params;
        const accommodation =
            await accomodationRepository.getAccommodation(accommodationId);
        if (!accommodation) {
            return next(
                new AppError('Accommodation not found', statusCode.notFound())
            );
        }
        return accommodation;
    }

    public async updateAccommodation(
        req: Request,
        next: NextFunction
    ): Promise<IAccommodation | void> {
        const { id } = req.user;
        const { accommodationId } = req.params;
        if (id) {
            const accommodation =
                await accomodationRepository.getAccommodation(accommodationId);
            const filesArray = req.files ? Object.values(req.files).flat() : [];
            if (filesArray.length > 0) {
                const imageFiles = filesArray.map(async (image) => {
                    const cloudinary: any = await mediaImage.cloudinaryUpload(
                        image.path
                    );
                    return {
                        imageId: cloudinary.public_id,
                        imageUrl: cloudinary.secure_url
                    };
                });
                const images = await Promise.all(imageFiles);
                const payload = {
                    status: req.body.status || accommodation.status,
                    state: req.body.state || accommodation.state,
                    city: req.body.city || accommodation.city,
                    accommodationType:
                        req.body.accommodationType ||
                        accommodation.accommodationType,
                    accommodationName:
                        req.body.accommodationName ||
                        accommodation.accommodationName,
                    description:
                        req.body.description || accommodation.description,
                    whyListing: req.body.whyListing || accommodation.whyListing,
                    price: req.body.price || accommodation.price,
                    address: req.body.address || accommodation.address,
                    hostingPeriodFrom:
                        req.body.hostingPeriodFrom ||
                        accommodation.hostingPeriodFrom,
                    hostingPeriodTo:
                        req.body.hostingPeriodTo ||
                        accommodation.hostingPeriodTo,
                    createdBy: id,
                    accommodationRules:
                        JSON.parse(req.body.accomodationRules) ||
                        accommodation.accommodationRules,
                    gallery: images || accommodation.gallery
                };
                const upddatedAccommodation =
                    await accomodationRepository.updateAccommodation(
                        accommodationId,
                        payload
                    );
                return upddatedAccommodation;
            }
            const payload = {
                status: req.body.status || accommodation.status,
                state: req.body.state || accommodation.state,
                city: req.body.city || accommodation.city,
                accommodationType:
                    req.body.accommodationType ||
                    accommodation.accommodationType,
                accommodationName:
                    req.body.accommodationName ||
                    accommodation.accommodationName,
                description: req.body.description || accommodation.description,
                whyListing: req.body.whyListing || accommodation.whyListing,
                price: req.body.price || accommodation.price,
                address: req.body.address || accommodation.address,
                hostingPeriodFrom:
                    req.body.hostingPeriodFrom ||
                    accommodation.hostingPeriodFrom,
                hostingPeriodTo:
                    req.body.hostingPeriodTo || accommodation.hostingPeriodTo,
                createdBy: id,
                accommodationRules:
                    JSON.parse(req.body.accommodationRules) ||
                    accommodation.accommodationRules
            };
            const upddatedAccommodation =
                await accomodationRepository.updateAccommodation(
                    accommodationId,
                    payload
                );
            return upddatedAccommodation;
        }
        return next(
            new AppError(
                'You are not allowed to create accomodation!, please login to gain access',
                statusCode.accessForbidden()
            )
        );
    }

    public async deleteAllItemsInGallery(
        req: Request,
        next: NextFunction
    ): Promise<IAccommodation | void> {
        const { id } = req.user;
        const { accommodationId } = req.params;
        if (id) {
            const accommodation =
                await accomodationRepository.getAccommodation(accommodationId);
            if (accommodation) {
                const gallery =
                    await accomodationRepository.deleteAllItemsInGallery(
                        accommodationId
                    );
                return gallery;
            }
            return next(
                new AppError('Accommodation not foundd', statusCode.notFound())
            );
        }
        return next(
            new AppError(
                'You are not allowed to create accomodation!, please login to gain access',
                statusCode.accessForbidden()
            )
        );
    }

    public async deleteSomeItemsFromGallery(
        req: Request,
        next: NextFunction
    ): Promise<IAccommodation | void> {
        const { id } = req.user;
        const { accommodationId } = req.params;
        const itemsToDelete = req.body.images;
        if (id) {
            const accommodation =
                await accomodationRepository.getAccommodation(accommodationId);
            if (accommodation) {
                const gallery =
                    await accomodationRepository.deleteSomeItemsFromGallery(
                        accommodationId,
                        itemsToDelete
                    );
                return gallery;
            }
            return next(
                new AppError('Accommodation not foundd', statusCode.notFound())
            );
        }
        return next(
            new AppError(
                'You are not allowed to create accomodation!, please login to gain access',
                statusCode.accessForbidden()
            )
        );
    }
}

export const accomodationService = new AccomodationService();
