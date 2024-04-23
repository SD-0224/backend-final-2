import { body, param, query, ValidationChain } from 'express-validator';

export const validatePersonalInfo: ValidationChain[]  = [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('phoneNumber').notEmpty().withMessage('Invalid phone number'),
    body('street').notEmpty().withMessage('Street address is required'),
    body('state').notEmpty().withMessage('State is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('postalCode').notEmpty().withMessage('Postal code is required'),
  ];
  
