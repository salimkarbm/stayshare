import { Schema, model } from 'mongoose';

const AccommodationSchema = new Schema(
    {
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        accommodationName: {
            type: String,
            required: [true, 'Please provide an accomodation name']
        },
        state: {
            type: String
        },
        city: {
            type: String
        },
        description: {
            type: String,
            required: [true, 'Please provide a description of the accomodation']
        },
        whyListing: {
            type: String,
            required: [
                true,
                'Please provide reason to which are providing this accomadation'
            ]
        },
        accommodationType: {
            type: String,
            enum: [
                'Single Room',
                'Studio',
                'Apartment',
                'Flat',
                'Bungalow',
                'Duplex',
                'Mansion'
            ],
            required: [
                true,
                'Choose a type from the following list of accomodation: 1. Single Room, 2. Studio, 3. Apartment, 4. Flat, 5. Bungalow, 6. Duplex, 7. Mansion'
            ],
            default: 'Single Room'
        },
        accommodationRules: [String],
        price: {
            type: Number,
            default: 0.0,
            required: true
        },
        status: {
            type: String,
            default: 'available',
            enum: ['available', 'occupied']
        },
        hostingPeriodFrom: {
            type: String,
            required: true
        },
        hostingPeriodTo: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: [true, 'Please provide accomodation address']
        },
        gallery: [Object]
        // imageOne: {
        //     type: String
        // },
        // imageOneId: {
        //     type: String
        // },
        // imageTwo: {
        //     type: String
        // },
        // imageTwoId: {
        //     type: String
        // },
        // imageTree: {
        //     type: String
        // },
        // imageThreeId: {
        //     type: String
        // },
        // imageFour: {
        //     type: String
        // },
        // imageFourId: {
        //     type: String
        // },
        // imageFive: {
        //     type: String
        // },
        // imageFiveId: {
        //     type: String
        // }
    },
    { timestamps: true }
);

export default model('Accommodation', AccommodationSchema);
