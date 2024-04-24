import { User } from "../Models/user";
import bcrypt, { genSaltSync } from "bcrypt";
import generateFakeSecretKey from "../Utils/helper";
import {
  validateEmail,
  validatePassword,
  validateFirstName,
  validateLastName,
  validatePhoneNumber,
} from "../Validators/UserHandler";
import { Request, Response } from "express";
import { logger } from "../config/pino";
const jwt = require("jsonwebtoken");
//Generate fake secret key
const secretKey = generateFakeSecretKey();

export const registerNewUser = async (userData: any) => {
  const { email, password, googleId, phoneNumber, lastName, firstName } =
    userData;
  const errors = [];
  try {
    if (!email || email.trim() === "") {
      logger.error("Email is required");
      errors.push("Email is required");
    }

    if (!password || password.trim() === "") {
      logger.error("Password is required");
      errors.push("Password is required");
    }

    if (!validateEmail(email)) {
      logger.error("Invalid email");
      errors.push("Invalid email");
    }

    if (!validatePassword(password)) {
      logger.error("Invalid password");
      errors.push("Invalid password");
    }
    if (!validateFirstName(firstName)) {
      logger.error("Invalid First Name");
      errors.push("Invalid First Name");
    }
    if (!validateLastName(lastName)) {
      logger.error("Invalid last name");
      errors.push("Invalid last name");
    }
    if (!validatePhoneNumber(phoneNumber)) {
      logger.error("Invalid phone Number");
      errors.push("Invalid phone Number");
    }

    // Hashing the password before storing in the db
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const existenceUser = await User.findOne({ where: { email: email } });
    if (existenceUser !== null) {
      errors.push("Email is already registered");
    }
    // Create a new user
    if (errors.length > 0) {
      return { errors };
    }
    const newUser = await User.create({
      email: email,
      password: hash,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      googleId: googleId || null,
    });
    const { password: _, ...UserInfo } = newUser.toJSON();
    return { errors, UserInfo };
  } catch (error) {
    logger.error("Error while registering new user:");
    return { errors: ["Error while registering new user"], UserInfo: null };
  }
};

//Create new user from existing account
export const register = async (req: any, res: any) => {
  try {
    const { errors, UserInfo } = await registerNewUser(req.body);
    if (errors.length > 0) {
      logger.error("Registration failed:", errors.join(", "));
      return res.status(400).json({ errors });
    } else {
      logger.info(`New user: ${UserInfo.email} registered successfully`);
      logger.info("New user registration successful");
      const token: string = jwt.sign(
        { userId: UserInfo.userID }, 
        secretKey,
        { expiresIn: "1d" }
      );
      res.cookie("token", token, { httpOnly: true });

      return res.status(201).json({ user: UserInfo, token });
    }
  } catch (error) {
    logger.error("Error registering user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;
    logger.info(`Attempting login user by an email${email}`);
    const errors = [];
    if (!email)
      {
        logger.error("Invalid email");
        errors.push("Email is required");

      }
      if (!password)
        {
          logger.error("Invalid password");
          errors.push("password is required");
  
        }
    let user:any;
    if (validateEmail(email)) {
      user = await User.findOne({ where: { email: email } });
    } else {
      logger.error("Invalid email");
      errors.push("Invalid email");
    }

    if (!user) {
      logger.error("User not found");
      errors.push("User not found");
      if (errors.length > 0)
        {
          logger.error("Login failed:", errors.join(", "));
  
         return res.status(400).json({errors})
        }
  
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      logger.error("Wrong password!");
      errors.push("Password not correct");
      
    }
    if (errors.length > 0)
      {
        logger.error("Login failed:", errors.join(", "));

       return res.status(400).json({errors})
      }

  
    logger.info("successful Login ");
    const { password: _, ...userWithoutPassword } = user.toJSON();

    const token: string = jwt.sign(
      { userId: user.userID }, 
      secretKey,
      { expiresIn: "1d" }
    );
    console.log("secretKey", secretKey);
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ user: userWithoutPassword, token });
  } catch (error) {
    logger.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Middleware to verify JWT token

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  // console.log("value of token");
  logger.info("token",token);
  if (!token) {
      return res.status(401).json({ error: "Unauthorized: Token is missing" });
  }
  try {
      const decoded = jwt.verify(token, secretKey);
      req.userID = decoded.userId; // Set req.userID to decoded userId
      next();
  } catch (error) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};


export const logOutUser=async(req:Request,res:Response)=>{
  try {
    res.cookie("token","",{expires:new Date(0),httpOnly:true});
    logger.info("Log out for the user is successful");
    res.status(200).json({message:"Log out successfully"});
     
  } catch (error) {
    logger.error("Failed log out ",error);
    res.status(500).json({error:"Internal server error"});
  }

}