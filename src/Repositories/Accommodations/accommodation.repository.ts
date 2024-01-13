import Accommodation from '../../Models/Accommodations/accommodation.model';
import IAccomodation from '../../Models/interfaces/accomodation';

export class AccomodationRepository {
    static Accomodation = new Accommodation({});

    async addAccommodation(payload: IAccomodation): Promise<IAccomodation> {
        const accomodation: any = await Accommodation.create(payload);
        return accomodation as IAccomodation;
    }

    async getAccommodations(): Promise<IAccomodation> {
        const accomodations: any = await Accommodation.find();
        return accomodations as IAccomodation;
    }
}

export const accomodationRepository = new AccomodationRepository();
