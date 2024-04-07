import * as db from "../Models/index";
import { sequelize } from "../config/dbConfig";
import { Request, Response } from "express";

import brandServices from "../Services/brandServices";

export const getAllBrands = async (req: Request, res: Response) => {
  try {
    const brands = await brandServices.getAllBrands();
    res.status(200).json(brands);
  } catch (error) {
    // Handle errors and send appropriate error response
    console.log("Error getting brands", error);
    res.status(error.status).json({ error: error.message });
  }
};
