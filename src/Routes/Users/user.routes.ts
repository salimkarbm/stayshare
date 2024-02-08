import { Router } from 'express';
import { validate, authenticate } from '../../Middlewares/validateReq';
import {
    userIdValidationRules,
    changePasswordValidationRules
} from '../../Middlewares/Users/user.middlewares';
import {
    viewProfile,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    deActivateUser,
    changePassword,
    getUserAccommodations
} from '../../Controllers/Users/user.controllers';
import Media from '../../Utils/Media/media';

const media = new Media();
const router = Router();

router.route('/').get(validate, authenticate, getUsers);

router.patch(
    '/changePassword',
    changePasswordValidationRules(),
    validate,
    authenticate,
    changePassword
);

router.get('/accommodations', validate, authenticate, getUserAccommodations);

router
    .route('/:userId')
    .get(userIdValidationRules(), validate, authenticate, getUser)
    .patch(media.upload.single('image'), validate, authenticate, updateUser)
    .delete(userIdValidationRules(), validate, authenticate, deleteUser);

router
    .route('/profile/:userId')
    .get(userIdValidationRules(), validate, authenticate, viewProfile);

router
    .route('/deActivate/:userId')
    .patch(userIdValidationRules(), validate, authenticate, deActivateUser);

export default router;
