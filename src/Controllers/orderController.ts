import * as db from "../Models/index";
import { sequelize } from "../config/dbConfig";
import { Request, Response } from "express";

import orderServices from "../Services/orderServices";
import productServices from "../Services/productServices";
import addressServices from "../Services/addressServices";
import { validationResult } from "express-validator";
import { logger } from "../config/pino";
import StripeSingleton from "../Utils/processPayment";

export const createOrder = async (
  req: Request & { userID: Number },
  res: Response
) => {
  const transaction = await sequelize.transaction();
  //Define the payment method for the order
  const paymentMethod = req.body.paymentMethod;
  try {
    // Validate the inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error("Validation error occurred  ", errors);
      return res.status(400).json({ errors: errors.array() });
    }
    const { firstName, lastName, email, phoneNumber } = req.body;
    const { street, state, city, postalCode } = req.body;

    const userID = req.userID;
    if (!userID) {
      logger.error("Unauthorized: User can't create the order ");
      return res
        .status(401)
        .json({ error: "Unauthorized: User does not have permission" });
    }
    let existingAddress = await addressServices.getAddress({
      userID,
      street,
      state,
      city,
      postalCode,
    });

    if (!existingAddress) {
      existingAddress = await addressServices.createAddress(
        {
          userID,
          street,
          state,
          city,
          postalCode,
        },
        transaction
      );
    }

    const addressID = existingAddress.addressID;
    const cart = await db.Cart.findOne({ where: { userID: userID } });
    const orderItems = await db.CartItem.findAll({
      where: { cartID: cart.cartID },
    });
    logger.info("Get all order Items form the cart successfully");
    if (!orderItems) {
      logger.error("Invalid error");
      return res.status(400).json({ error: "Invalid Input" });
    }
    let grandTotal = 0;
    await Promise.all(
      orderItems.map(async (element: any) => {
        const productExist = await productServices.getProductById(
          element.productID,
          {
            transaction: transaction,
            lock: true,
          }
        );

        if (!productExist || productExist.quantity == 0) {
          logger.error("product doesn't exist");
          return res.status(400).json({ error: `product doesn't exist` });
        }
        grandTotal += element.subTotal;
      })
    );
    const amount = grandTotal * 100; // Convert grand total to cents (Stripe requires amounts in smallest currency unit)
    const token = req.body.visaToken as string;
    await StripeSingleton.payWithVisaCard(amount, token); 
    let status = "pending";
    const newOrder = await orderServices.createOrder(
      {
        userID,
        firstName,
        lastName,
        email,
        phoneNumber,
        addressID,
        grandTotal,
        status,
      },
      transaction
    );
    logger.info("Create new order successfully");
    const orderID = newOrder.orderID;
    await Promise.all(
      orderItems.map(async (element) => {
        const productExist = await productServices.getProductById(
          element.productID,
          {
            transaction: transaction,
            lock: true,
          }
        );
        await orderServices.createOrderItems(element, orderID, transaction);
        let productID = element.productID;
        let newQuantity = productExist.quantity - element.productQuantity;
        await productServices.updateProduct(
          productID,
          newQuantity,
          transaction
        );
      })
    );
    await db.CartItem.destroy({
      where: { cartID: cart.cartID },
    });
    await transaction.commit();
    logger.info("Delete the the cart content");
    return res.status(200).json(newOrder);
  } catch (error) {
    await transaction.rollback();
    logger.error("Error creating order", error);
    return res.status(500).json({ error: error.message });
  }
};