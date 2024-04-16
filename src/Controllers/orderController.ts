import * as db from "../Models/index";
import { sequelize } from "../config/dbConfig";
import { Request, Response } from "express";

import orderServices from "../Services/orderServices";
import productServices from "../Services/productServices";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const transaction = await sequelize.transaction();

    const { firstName, lastName, email, phoneNumber } = req.body

    const { street, state, city, pinCode } = req.body
    const orderItems = req.body.orderItems
    if(!orderItems){
        return res.status(400).json({error: "Invalid Input"});
      }
      let grandTotal = 0

    res.status(200).json();
  } catch (error) {
    // Handle errors and send appropriate error response
    console.log("Error creating order", error);
    res.status(error.status).json({ error: error.message });
  }
};
