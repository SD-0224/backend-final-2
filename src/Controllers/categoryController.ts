import * as db from "../Models/index";
import { sequelize } from "../config/dbConfig";
import { Request, Response } from "express";

import categoryServices from "../Services/categoryServices";

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const brands = await categoryServices.getAllCategories();
    res.status(200).json(brands);
  } catch (error) {
    // Handle errors and send appropriate error response
    console.log("Error getting categories", error);
    res.status(error.status).json({ error: error.message });
  }
};
