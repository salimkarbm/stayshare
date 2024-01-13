import { Request, NextFunction } from 'express';
import IAccomodation from '../../Models/interfaces/accomodation';
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
    ): Promise<IAccomodation | void> {
        const { id } = req.user;
        if (id) {
            const filesArray = req.files ? Object.values(req.files).flat() : [];
            if (filesArray.length > 0) {
                const imageFiles = filesArray.map(async (image) => {
                    return mediaImage.cloudinaryUpload(image.path);
                });
                const images = await Promise.all(imageFiles);
                const payload = {
                    ...req.body,
                    createdBy: id,
                    accommodationRules: JSON.parse(req.body.accomodationRules),
                    imageOne: images[0]?.secure_url,
                    imageOneId: images[0]?.public_id,
                    imageTwo: images[1]?.secure_url,
                    imageTwoId: images[1]?.public_id,
                    imageThree: images[2]?.secure_url,
                    imageThreeId: images[2]?.public_id,
                    imageFour: images[3]?.secure_url,
                    imageFourId: images[3]?.public_id,
                    imageFive: images[4]?.secure_url,
                    imageFiveId: images[4]?.public_id
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
    ): Promise<IAccomodation | void> {
        const accommodations = await accomodationRepository.getAccommodations();
        return accommodations;
    }
}

export const accomodationService = new AccomodationService();
