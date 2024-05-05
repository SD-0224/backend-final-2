
import { Request, Response } from "express";
import { logger } from "../config/pino";
import categoryServices from "../Services/categoryServices";

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    logger.info("Getting all categories ");
    const brands = await categoryServices.getAllCategories();
    logger.info("Categories retrieved successfully");
    res.status(200).json(brands);
  } catch (error) {
    // Handle errors and send appropriate error response
    logger.error("Error getting categories", error);
    res.status(error.status).json({ error: error.message });
  }
};
