// const { validator } = require("sequelize/types/utils/validator-extras");
import validate from "validate";
import validator  from "validator";

//Validate an Email format
 export const validateEmail=(email:string)=>{
    return validator.isEmail(email);
}

// Validate Password 
export const validatePassword=(password:string)=>{
    //Use regular  expression to validate the password
const passwordRegex=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
}

export const validateUserName=(username:String)=>{
return username.length>0 && username.length<=15;
}

