// const { validator } = require("sequelize/types/utils/validator-extras");
import validate from "validate";
import validator, { trim } from "validator";

//Validate an Email format
export const validateEmail = (email: string) => {
  return validator.isEmail(email);
};

// Validate Password
export const validatePassword = (password: string) => {
  //Use regular  expression to validate the password
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return passwordRegex.test(password);
};

export const validateFirstName = (firstName: String) => {
  const trimmedFirstName: string = firstName.trim();
  const validFormat: boolean =
    /^[a-zA-Z]+$/.test(trimmedFirstName) &&
    trimmedFirstName.length >= 3 &&
    trimmedFirstName.length <= 10;
  return validFormat;
};
export const validateLastName = (lastName: String) => {
  const trimmedLastName: string = lastName.trim();

  const validFormat: boolean =
    /^[a-zA-Z]+$/.test(trimmedLastName) &&
    trimmedLastName.length >= 3 &&
    trimmedLastName.length <= 10;
  return validFormat;
};
export const validatePhoneNumber = (phoneNumber: string): boolean => {
  const PhonePattern: RegExp = /^{10}d/;
  return PhonePattern.test(phoneNumber);
};
