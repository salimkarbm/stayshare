import { Router } from 'express';
import { validate, authenticate } from '../../Middlewares/validateReq';
import { userIdValidationRules } from '../../Middlewares/Users/user.middlewares';
import {
    viewProfile,
    getUsers,
    getUser,
    updateUser
} from '../../Controllers/Users/user.controllers';
import Media from '../../Utils/Media/media';

const media = new Media();
const router = Router();

router.route('/').get(validate, authenticate, getUsers);

router
    .route('/:userId')
    .get(userIdValidationRules(), validate, authenticate, getUser)
    .patch(media.upload.single('image'), validate, authenticate, updateUser);

router
    .route('/profile/:userId')
    .get(userIdValidationRules(), validate, authenticate, viewProfile);

export default router;
