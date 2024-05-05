import { body, ValidationChain } from "express-validator";

export const validateAddress: ValidationChain[] = [
  body("street").notEmpty().withMessage("Street address is required"),
  body("state").notEmpty().withMessage("State is required"),
  body("city").notEmpty().withMessage("City is required"),
  body("postalCode").notEmpty().withMessage("Postal code is required"),
];
