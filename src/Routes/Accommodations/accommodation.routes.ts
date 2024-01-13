import { Router } from 'express';
import { validate, authenticate } from '../../Middlewares/validateReq';
import { accommodationValidationRules } from '../../Middlewares/Accommodations/accommodation.middlewares';
import {
    addAccommodation,
    getAccommodations
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

export default router;
