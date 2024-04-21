import * as db from "../Models/index";
import { sequelize } from "../config/dbConfig";
import { Request, Response } from "express";
import {logger} from "../config/pino";
import brandServices from "../Services/brandServices";

export const getAllBrands = async (req: Request, res: Response) => {
  try {
    logger.info("Request to get all bands is received")
    const brands = await brandServices.getAllBrands();
    logger.info("Request to get all brand is successful")
    res.status(200).json(brands);
  } catch (error) {
    // Handle errors and send appropriate error response
    logger.error("Error getting brands");
    res.status(error.status).json({ error: error.message });
  }
};
