export default interface IAccommodation {
    id?: string;
    createdAt?: string;
    readonly length?: number;
    accommodationName: string;
    description: string;
    whyListing: string;
    accomodationType: string;
    accomodationRules: string[];
    price: number;
    state: string;
    city: string;
    status: 'active' | 'inactive';
    hostingPeriodTo: string;
    hostingPeriodFrom: string;
    address: string;
}
