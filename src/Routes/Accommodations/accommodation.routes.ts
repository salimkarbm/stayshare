import { Router } from 'express';
import { validate, authenticate } from '../../Middlewares/validateReq';
import {
    accommodationIdValidationRules,
    accommodationValidationRules,
    updateAccommodationValidationRules
} from '../../Middlewares/Accommodations/accommodation.middlewares';
import {
    addAccommodation,
    getAccommodations,
    getAccommodation,
    updateAccommodation
} from '../../Controllers/Accommodations/accommodation.controllers';
import Media from '../../Utils/media/media';

const image = new Media();
const router = Router();

router
    .route('/')
    .post(
        image.upload.array('images'),
        accommodationValidationRules(),
        validate,
        authenticate,
        addAccommodation
    )
    .get(validate, getAccommodations);

router
    .route('/:accommodationId')
    .get(accommodationIdValidationRules(), validate, getAccommodation)
    .patch(
        image.upload.array('images'),
        updateAccommodationValidationRules(),
        validate,
        authenticate,
        updateAccommodation
    );

export default router;
