import Accommodation from '../../Models/Accommodations/accommodation.model';
import { IAccommodation } from '../../Models/interfaces/accomodation';

export class AccomodationRepository {
    static Accomodation = new Accommodation({});

    async addAccommodation(payload: IAccommodation): Promise<IAccommodation> {
        const accomodation: any = await Accommodation.create(payload);
        return accomodation as IAccommodation;
    }

    async getAccommodations(): Promise<IAccommodation> {
        const accomodations: any = await Accommodation.find();
        return accomodations as IAccommodation;
    }

    async getAccommodation(accommodationId: string): Promise<IAccommodation> {
        const accomodations: any =
            await Accommodation.findById(accommodationId);
        return accomodations as IAccommodation;
    }

    async updateAccommodation(
        accommodationId: string,
        payload: IAccommodation
    ): Promise<IAccommodation> {
        const accomodations: any = await Accommodation.findByIdAndUpdate(
            accommodationId,
            {
                status: payload.status,
                state: payload.state,
                city: payload.city,
                accommodationType: payload.accommodationType,
                accommodationName: payload.accommodationName,
                description: payload.description,
                whyListing: payload.whyListing,
                price: payload.price,
                address: payload.address,
                hostingPeriodFrom: payload.hostingPeriodFrom,
                hostingPeriodTo: payload.hostingPeriodTo,
                createdBy: payload.createdBy,
                $addToSet: {
                    gallery: { $each: payload.gallery },
                    accommodationRules: { $each: payload.accommodationRules }
                }
            },
            { new: true }
        );
        return accomodations as IAccommodation;
    }

    async deleteAllItemsInGallery(
        accommodationId: string
    ): Promise<IAccommodation | void> {
        const accommodation: any = await Accommodation.findByIdAndUpdate(
            accommodationId,
            {
                $set: {
                    gallery: []
                }
            },
            { new: true }
        );

        return accommodation as IAccommodation;
    }

    async deleteSomeItemsFromGallery(
        accommodationId: string,
        itemsToDelete: string[]
    ): Promise<IAccommodation | void> {
        const accommodation: any = await Accommodation.findByIdAndUpdate(
            accommodationId,
            {
                $pull: {
                    gallery: { imageId: { $in: itemsToDelete } }
                }
            },
            { new: true }
        );

        return accommodation as IAccommodation;
    }
}

export const accomodationRepository = new AccomodationRepository();
