import { body, param } from 'express-validator';

export const userIdValidationRules = () => {
    return [
        param('userId')
            .trim()
            .notEmpty()
            .withMessage('User ID is required')
            .isString()
            .withMessage('User ID must be a string')
    ];
};

export const userEmailValidationRules = () => {
    return [
        body('email')
            .trim()
            .notEmpty()
            .withMessage('Email is required')
            .isString()
            .withMessage('Email must be a string')
    ];
};

export const updateUserValidationRules = () => {
    return [
        body('email').isEmail().withMessage('Invalid email address'),
        body('firstName').notEmpty().withMessage('First name is required'),
        body('lastName').notEmpty().withMessage('Last name is required'),
        body('occupation').notEmpty().withMessage('Occupation is required'),
        body('state').notEmpty().withMessage('State is required'),
        body('city').notEmpty().withMessage('City is required'),
        body('gender')
            .isIn(['Male', 'Female', 'Other'])
            .withMessage('Invalid gender'),
        body('phoneNumber')
            .isMobilePhone([])
            .withMessage('Invalid phone number'),
        body('bio').optional().isString().withMessage('Bio must be a string'),
        body('address')
            .optional()
            .isString()
            .withMessage('Address must be a string')
    ];
};
