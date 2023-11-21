import { Router } from 'express';
import { validate } from '../../Middlewares/validateReq';
import {
    OTPEmailValidationRules,
    loginValidationRules,
    signUpValidationRules,
    refreshTokenValidationRules,
    resetPasswordValidationRules
} from '../../Middlewares/Auth/auth.middlewares';
import {
    activateUserAccount,
    forgotPassword,
    login,
    refreshToken,
    resendOTP,
    resetPassword,
    signUp
} from '../../Controllers/Auth/auth.controllers';

const router = Router();

router.post('/signup', signUpValidationRules(), validate, signUp);
router.post('/signIn', loginValidationRules(), validate, login);
router.post('/resendOTP', OTPEmailValidationRules(), validate, resendOTP);
router.patch(
    '/resetPassword',
    resetPasswordValidationRules(),
    validate,
    resetPassword
);
router.post(
    '/forgotPassword',
    OTPEmailValidationRules(),
    validate,
    forgotPassword
);
router.get(
    '/refreshToken',
    refreshTokenValidationRules(),
    validate,
    refreshToken
);
router.post(
    '/activateAccount',
    OTPEmailValidationRules(),
    validate,
    activateUserAccount
);

export default router;
