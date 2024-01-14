import { Router } from 'express';
import { validate, authenticate } from '../../Middlewares/validateReq';
import {
    accommodationIdValidationRules,
    accommodationValidationRules
} from '../../Middlewares/Accommodations/accommodation.middlewares';
import {
    addAccommodation,
    getAccommodations,
    getAccommodation
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
    .get(accommodationIdValidationRules(), validate, getAccommodation);

export default router;
