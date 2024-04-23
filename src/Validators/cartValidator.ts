import { body, param, query, ValidationChain } from 'express-validator';


export const validateProductInfo = [
    param('productID').isNumeric().withMessage('Product ID must be an integer'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
  ];

  export const validateCartDefault = [
    body('productId').isInt().withMessage('Product ID must be an integer'),
  ];

  export  const validateItemFields = [
    body('cartItems').isArray().withMessage('Cart items must be an array'),
    body('cartItems.*.productID').isInt({ min: 1 }).withMessage('Product ID must be a positive integer'),
    body('cartItems.*.productQuantity').isInt({ min: 1 }).withMessage('Product quantity must be an integer'),
    body('cartItems.*.productPrice').isFloat({ min: 0 }).withMessage('Product price must be a positive float'),
    body('cartItems.*.productDiscount').isFloat({ min: 0, max: 1 }).withMessage('Product discount must be a float between 0 and 1'),
    body('cartItems.*.productTitle').notEmpty().isString().withMessage('Product title must be a string'),
    body('cartItems.*.productSubtitle').notEmpty().isString().withMessage('Product subtitle must be a string'),
  ]