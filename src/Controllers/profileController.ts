import * as db from "../Models/index";
import { sequelize } from "../config/dbConfig";
import { Request, Response } from "express";
import { logger } from "../config/pino";
import bcrypt, { genSaltSync } from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import {
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePhoneNumber,
} from "../Validators/UserHandler";
import { validationResult } from "express-validator";

cloudinary.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.Cloud_Key,
  api_secret: process.env.API_Secret,
});

export const getUserOrders = async (
  req: Request & { userID: Number },
  res: Response
) => {
  try {
    const userID = req.userID;
    logger.info("Request to get all orders is received for user");
    console.log(userID)
    if (!userID) {
      logger.error("User not found");
      return res.status(404).json({ error: "User not found" });
    }
    const orders = await db.order.findAll({ where: { userID: userID } });
    logger.info("Request to get all orders is successful");
    res.status(200).json(orders);
  } catch (error) {
    // Handle errors and send appropriate error response
    logger.error("Error getting Orders");
    res.status(error.status).json({ error: error.message });
  }
};

export const getUserAddresses = async (
  req: Request & { userID: Number },
  res: Response
) => {
  try {
    const userID = req.userID;
    logger.info("Request to get all orders is received");
    if (!userID) {
      logger.error("User not found");
      return res.status(404).json({ error: "User not found" });
    }
    const addresses = await db.address.findAll({ where: { userID: userID } });
    logger.info("Request to get all orders is successful");
    res.status(200).json(addresses);
  } catch (error) {
    // Handle errors and send appropriate error response
    logger.error("Error getting Addresses");
    res.status(error.status).json({ error: error.message });
  }
};

export const changePassword = async (
  req: Request & { userID: Number },
  res: Response
) => {
  try {
    const current = req.body.currentPassword;
    const newPassword = req.body.newPassword;
    const userID = req.userID;

    const user = await db.User.findByPk(Number(userID));
    if (!user) {
      logger.error("User not found");
      return res.status(404).json({ error: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(current, user.password);
    if (!isPasswordCorrect) {
      logger.error("Wrong password!");
      return res.status(400).json({ error: "Wrong password!" });
    }
    const salt = genSaltSync(10);
    const hash = bcrypt.hashSync(newPassword, salt);
    user.password = hash;
    await user.save();
    logger.info("Password changed successfully");
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    // Handle errors and send appropriate error response
    logger.error("Error Changing Password");
    res.status(error.status).json({ error: error.message });
  }
};

export const uploadPhoto = async (
  req: Request & { userID: Number },
  res: Response
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const result = await cloudinary.uploader.upload(req.file.path);
    const userID = req.userID;
    const user = await db.User.findByPk(Number(userID));
    if (!user) {
      logger.error("User not found");
      return res.status(404).json({ error: "User not found" });
    }
    user.image = result.secure_url;
    await user.save();
    logger.info("Image uploaded and URL saved successfully");
    res.status(200).json({ imageURL: result.secure_url });
  } catch (error) {
    // Handle errors and send appropriate error response
    logger.error("Error changing photo");
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getDetails = async (
  req: Request & { userID: Number },
  res: Response
) => {
  try {
    const userID = req.userID;
    const user = await db.User.findByPk(Number(userID), {
      attributes: { exclude: ["password"] }, // Exclude the password field from the result
    });
    if (!user) {
      logger.error("User not found");
      return res.status(404).json({ error: "User not found" });
    }
    logger.info("Request to get user details is successful");
    res.status(200).json(user);
    res.status(200).json();
  } catch (error) {
    // Handle errors and send appropriate error response
    logger.error("Error getting details for user");
    res.status(error.status).json({ error: error.message });
  }
};
export const updateDetails = async (
  req: Request & { userID: Number },
  res: Response
) => {
  try {
    const userID = req.userID;
    const { firstName, lastName, phoneNumber, email } = req.body;
    const errors = [];
    if (!email || email.trim() === "") {
      logger.error("Email is required");
      errors.push("Email is required");
    }

    if (!validateEmail(email)) {
      logger.error("Invalid email");
      errors.push("Invalid email");
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

    if (errors.length > 0) {
      logger.error("Update failed:", errors.join(", "));
      return res.status(400).json({ errors });
    }
    const user = await db.User.findByPk(Number(userID), {
      attributes: { exclude: ["password"] }, // Exclude the password field from the result
    });
    if (!user) {
      logger.error("User not found");
      return res.status(404).json({ error: "User not found" });
    }

    // Update user details
    user.firstName = firstName;
    user.lastName = lastName;
    user.phoneNumber = phoneNumber;
    user.email = email;

    await user.save();
    logger.info("User profile updated successfully");
    res
      .status(200)
      .json({ message: "User profile updated successfully", user: user });
  } catch (error) {
    // Handle errors and send appropriate error response
    logger.error("Error Updating profile");
    res.status(error.status).json({ error: error.message });
  }
};
