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

export const updateAccommodationValidationRules = () => {
    return [
        param('accommodationId')
            .notEmpty()
            .withMessage('Accommodation ID is required')
            .trim(),
        body('accommodationName')
            .optional()
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
            .optional()
            .trim()
            .isString()
            .withMessage('Accommodation name must be a string'),
        body('status')
            .optional()
            .trim()
            .isString()
            .withMessage('status name must be a string'),
        body('whyListing')
            .optional()
            .trim()
            .isString()
            .withMessage('Accommodation name must be a string'),
        body('accommodationType')
            .optional()
            .trim()
            .isString()
            .withMessage('Accommodation name must be a string'),
        body('price')
            .optional()
            .trim()
            .isNumeric()
            .withMessage('Price must be a numeric value'),
        body('hostingPeriodFrom').optional().trim(),
        body('hostingPeriodTo').optional().trim(),
        body('state')
            .optional()
            .trim()
            .isString()
            .withMessage('state must be a string'),
        body('city')
            .optional()
            .trim()
            .isString()
            .withMessage('city must be a string'),
        body('address')
            .optional()
            .trim()
            .isString()
            .withMessage('address must be a string')
    ];
};
