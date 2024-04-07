import { param, query, ValidationChain } from 'express-validator';

// Define validation middleware for the route parameters and query parameters
export const validateGetByCategoryParams: ValidationChain[] = [
  param('category').isInt().toInt(),
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
];


export const validateGetByBrandsParams: ValidationChain[] = [
    param('brand').isInt().toInt(),
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
  ];
  