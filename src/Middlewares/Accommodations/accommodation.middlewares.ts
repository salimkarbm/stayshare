import { body, param } from 'express-validator';

export const accommodationIdValidationRules = () => {
    return [
        param('accommodationId')
            .notEmpty()
            .withMessage('Accommodation ID is required')
            .trim()
    ];
};

export const accommodationValidationRules = () => {
    return [
        body('accommodationName')
            .notEmpty()
            .withMessage('Accommodation name is required')
            .trim()
            .isString()
            .withMessage('Accommodation name must be a string')
            .isLength({ min: 2 })
            .withMessage(
                'Accommodation name must be a string length of more than 2 characters'
            ),
        body('description')
            .notEmpty()
            .withMessage('Description is required')
            .trim()
            .isString()
            .withMessage('Accommodation name must be a string'),
        body('whyListing')
            .notEmpty()
            .withMessage('Reason for listing is required')
            .trim()
            .isString()
            .withMessage('Accommodation name must be a string'),
        body('accommodationType')
            .notEmpty()
            .withMessage('Accommodation type is required')
            .trim()
            .isString()
            .withMessage('Accommodation name must be a string'),
        body('price')
            .notEmpty()
            .withMessage('Price is required')
            .isNumeric()
            .withMessage('Price must be a numeric value'),
        body('hostingPeriodFrom')
            .notEmpty()
            .withMessage('Hosting period is required'),
        body('hostingPeriodTo')
            .notEmpty()
            .withMessage('Hosting period is required'),
        body('state').notEmpty().withMessage('State is required').trim(),
        body('city').notEmpty().withMessage('city is required').trim(),
        body('address').notEmpty().withMessage('Address is required').trim()
    ];
};
