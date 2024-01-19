export interface IGallery {
    imageId: string;
    imageUrl: string;
}

export interface IAccommodation {
    id?: string;
    createdAt?: string;
    readonly length?: number;
    accommodationName: string;
    description: string;
    whyListing: string;
    accommodationType: string;
    accommodationRules: string[];
    price: number;
    state: string;
    city: string;
    status: 'active' | 'inactive';
    hostingPeriodTo: string;
    hostingPeriodFrom: string;
    address: string;
    gallery?: IGallery[];
    createdBy: string;
}
