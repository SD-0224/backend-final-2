import * as db from "../Models/index";
import { sequelize } from "../config/dbConfig";
import { Request, Response } from "express";

import orderServices from "../Services/orderServices";
import productServices from "../Services/productServices";
import addressServices from "../Services/addressServices";

export const createOrder = async (req: Request, res: Response) => {
  const transaction = await sequelize.transaction();

  try {
    const { firstName, lastName, email, phoneNumber } = req.body

    const { street, state, city, postalCode } = req.body
    const userID = req.params.userID
    let existingAddress = await addressServices.getAddress({ userID, street, state, city, postalCode })
    if (!existingAddress) {
      existingAddress = await addressServices.createAddress({
        userID,
        street,
        state,
        city,
        postalCode,
      }, transaction)
    }
    const addressID = existingAddress.addressID;
    const orderItems = await db.CartItem.findAll({where:{"userID":userID}})
    if(!orderItems){
        return res.status(400).json({error: "Invalid Input"});
      }
      let grandTotal = 0;
      await Promise.all(orderItems.map(async (element: any) => {
        const productExist = await productServices.getProductById(element.productID, {
          transaction: transaction,
          lock: true
        })

        if (!productExist  ||  productExist.quantity ==0) return res.status(400).json({error: `product doesn't exist`})
        grandTotal += element.subTotal
      }))
      let isPaid = false;
      const newOrder = await orderServices.createOrder({
        userID,
        firstName,
        lastName,
        email,
        phoneNumber,
        addressID,
        grandTotal,
        isPaid,
      }, transaction)
      const orderID = newOrder.orderID
      await Promise.all(orderItems.map(async (element) => {
        const productExist = await productServices.getProductById(element.productID, {
          transaction: transaction,
          lock: true
        })
        await orderServices.createOrderItems(element, orderID, transaction)
        let productID = element.productID
        let newQuantity = productExist.quantity - element.productQuantity
        await productServices.updateProduct(productID, newQuantity, transaction)  
      }))
      await db.CartItem.destroy({
        where: { userID: userID },
      });
      await transaction.commit()
    res.status(200).json(newOrder);
  } catch (error) {
    await transaction.rollback()
    console.log("Error creating order", error);
    res.status(error.status).json({ error: error.message });
  }
};
