import { body, param, query, ValidationChain } from "express-validator";

// Define validation middleware for the route parameters and query parameters
export const validateGetByCategoryParams: ValidationChain[] = [
  param("category").notEmpty().isString(),
  query("page").optional().isInt({ min: 1 }).toInt(),
  query("limit").optional().isInt({ min: 1, max: 100 }).toInt(),
];

export const validateGetByBrandsParams: ValidationChain[] = [
  param("brand").notEmpty().isString(),
  query("page").optional().isInt({ min: 1 }).toInt(),
  query("limit").optional().isInt({ min: 1, max: 100 }).toInt(),
];

export const validatedefaultParams: ValidationChain[] = [
  query("page").optional().isInt({ min: 1 }).toInt(),
  query("limit").optional().isInt({ min: 1, max: 100 }).toInt(),
];

export const validaterelatedParams: ValidationChain[] = [
  query("brand").isString(),
  query("category").isString(),
  query("page").optional().isInt({ min: 1 }).toInt(),
  query("limit").optional().isInt({ min: 1, max: 100 }).toInt(),
];
export const validateSearchParams: ValidationChain[] = [
  query("search").notEmpty().isString(),
  query("page").optional().isInt({ min: 1 }).toInt(),
  query("limit").optional().isInt({ min: 1, max: 100 }).toInt(),
];

export const validateSpecificParams: ValidationChain[] = [
  param("product").notEmpty().isString(),
];

export const validateReviewParams: ValidationChain[] = [
  body("review").notEmpty().isInt({ min: 1, max: 5 }),
  param("product").notEmpty().isString(),
];

export const validateQuantityParams: ValidationChain[] = [
  query("quantity").optional().isInt({ min: 1, max: 100 }),
  query("page").optional().isInt({ min: 1 }).toInt(),
  query("limit").optional().isInt({ min: 1, max: 100 }).toInt(),
];

export const validateDiscountParams: ValidationChain[] = [
  query("discount").optional().isFloat({ min: 0, max: 1 }),
  query("page").optional().isInt({ min: 1 }).toInt(),
  query("limit").optional().isInt({ min: 1, max: 100 }).toInt(),
];
