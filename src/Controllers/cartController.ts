import { CartItem } from "../Models/cartItem";
import { Cart } from "../Models/cart";
import * as db from "../Models/index";
import { sequelize } from "../config/dbConfig";
import { Request, Response } from "express";
import { Product } from "../Models/product";
import { logger } from "../config/pino";

import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import cartServices from "../Services/cartServices";
//Get cart by userId and create a new cart objet
export const cartController = {
  getCartByUserId: async (req: Request & { userID: number }, res: Response) => {
    try {
      let userId = req.userID;

      if (!userId) {
        logger.error(`User not found`);
        return res.status(404).json({ error: "User not found" });
      }
      logger.info(`Request received to get cart for ${userId} `);
      const cart = await db.Cart.findOne({ where: { userID: userId } });
      if (!cart) {
        return res
          .status(200)
          .json({ message: "Cart is empty", cartItems: [] });
      }
      const cartItems = await cartServices.getCartByUserId(Number(userId));
      logger.info(`Cart Item retrieved successfully for ${userId} `);

      if (cartItems.length === 0) {
        logger.info(`Cart is empty for user ${userId}`);
        return res
          .status(200)
          .json({ message: "Cart is empty", cartItems: [] });
      }
      res.status(200).json(cartItems);
    } catch (error) {
      logger.error("Error fetching the catItems");
      res.status(500).json({ error: "Internal server error" });
    }
  },
  addItemsToCart: async (req: Request & { userID: number }, res: Response) => {
    try {
      const userId = req.userID;
      logger.info(`Checking if user with ID ${userId} exists in the cart`);

      logger.info(`Checking if ${userId} exists in the cart `);

      // Validate the inputs
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        logger.error("Validation error occurred  ", errors);
        return res.status(400).json({ errors: errors.array() });
      }
      const productId = req.params.productID;
      const { quantity } = req.body;
      // Check if the user exists
      const user = await db.User.findByPk(userId);

      logger.info(`User retrieved: ${JSON.stringify(user)}`);

      if (!user) {
        logger.error("Unauthorized: User not authenticated");
        return res
          .status(401)
          .json({ error: "Unauthorized: User not authenticated" });
      }

      //Checks if the product already exists
      const productItem = await db.Product.findByPk(productId);

      // Log product retrieval
      logger.info(`Product retrieved: ${JSON.stringify(productItem)}`);

      if (
        !productItem ||
        productItem.quantity == 0 ||
        productItem.quantity < quantity
      ) {
        logger.error(`Product ${productId} not found`);
        return res.status(404).json({ error: "Product not found" });
      }

      logger.info(`Product ${productId} found: ${JSON.stringify(productItem)}`);

      // Create or find the cart based on the userID
      let cart = await Cart.findOne({ where: { userID: userId } });

      if (!cart) {
        try {
          cart = await Cart.create({ userID: userId });
          logger.info(`Cart created successfully`);
        } catch (error) {
          logger.error("Error creating cart for the user");
          return res.status(500).json({ error: "Error creating cart" });
        }
      }

      // Check if cart item already exists
      const cartItemExist = await db.CartItem.findOne({
        where: { cartID: cart.cartID, productID: productId },
      });

      if (cartItemExist) {
        return res.status(404).json({ error: "Item already added" });
      }

      try {
        const cartItem = await db.CartItem.create({
          userID: cart.userID,
          cartID: cart.cartID,
          productID: productId,
          productQuantity: quantity,
          productPrice: productItem.price,
          productTitle: productItem.title,
          productSubtitle: productItem.subTitle,
          productDiscount: productItem.discount,
        });

        logger.info("Cart created successfully");
        res.status(200).json({
          message: `Adding ${productId} to cart for the user ${userId}`,
          cartItem: cartItem,
        });

        logger.info(`Adding ${productId} to cart for the user ${userId}`);
      } catch (error) {
        logger.error(
          `Error creating cart item for user ${userId}: ${error.message}`
        );
        return res.status(500).json({ error: "Error creating cart item" });
      }
    } catch (error) {
      logger.error("Internal server Error", error);
      res.status(500).json({ error: "Internal server Error" });
    }
  },

  deleteItemsFromCart: async (
    req: Request & { userID: Number },
    res: Response
  ) => {
    try {
      // Validate the inputs
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        logger.error("Validation error occurred  ", errors);
        return res.status(400).json({ errors: errors.array() });
      }
      const { productId } = req.body;
      const { userID } = req;
      if (!userID) {
        logger.error("Unauthorized: User can't delete items fom the cart");
        return res
          .status(401)
          .json({ error: "Unauthorized: User does not have permission" });
      }
      let cart = await db.Cart.findOne({ where: { userID: userID } });
      if (!cart) {
        logger.error(`Cart not found for user ${userID},please add items `);
        return res.status(404).json({ error: "Cart not found" });
      }
      logger.info(`deleting ${productId} from ${userID}`);
      const deletedItem = await CartItem.destroy({
        where: { cartID: cart.cartID, productID: productId },
      });
      logger.info(`Deleted ${productId} from ${userID} successfully `);
      if (!deletedItem) {
        return res.json({ message: `Item does not exist, no changes` });
      }
      return res.json({ message: `Item deleted from the  cart for ${userID}` });
    } catch (error) {
      logger.error("Error deleting item from the cart", error);
      res.json({ error: "Internal server Error" });
    }
  },
  clearCart: async (req: Request & { userID: Number }, res: Response) => {
    try {
      const { userID } = req;
      if (!userID) {
        logger.error("Unauthorized: User can't clear items fom the cart");
        return res
          .status(401)
          .json({ error: "Unauthorized: User does not have permission" });
      }
      let cart = await db.Cart.findOne({ where: { userID: userID } });
      if (!cart) {
        logger.error(`Cart not found for user ${userID},please add items `);
        return res.status(404).json({ error: "Cart not found" });
      }
      logger.info(`Clearing ${userID} from the cart`);
      const deletedCount = await CartItem.destroy({
        where: { cartID: cart.cartID },
      });
      logger.info(`Deleted ${deletedCount} from the cart`);

      logger.info(`Cart cleared successfully for user${userID}`);
      return res.json({
        message: `Cart cleared successfully for user${userID}`,
      });
    } catch (error) {
      logger.error("Internal server Error", error);
      res.json({ error: "Internal server Error" });
    }
  },
  increasedQty: async (req: Request & { userID: Number }, res: Response) => {
    try {
      const { userID } = req;
      if (!userID) {
        logger.error(
          "Unauthorized: User can't update qty of items fom the cart"
        );
        return res
          .status(401)
          .json({ error: "Unauthorized: User does not have permission" });
      }
      // Validate the inputs
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        logger.error("Validation error occurred  ", errors);
        return res.status(400).json({ errors: errors.array() });
      }
      let cart = await db.Cart.findOne({ where: { userID: userID } });
      if (!cart) {
        logger.error(`Cart not found for user ${userID},please add items `);
        return res.status(404).json({ error: "Cart not found" });
      }
      const { productId } = req.body;
      logger.info(`Increased quantity of product ${productId}`);
      const productItem = await CartItem.findOne({
        where: { productID: productId, cartID: cart.cartID },
      });
      if (!productItem) {
        logger.error(`Product ${productId} not found`);
        return res.status(404).json({ error: "Product not found" });
      }
      //Update the quantity by increment 1 ;
      productItem.productQuantity += 1;
      await productItem.save();
      logger.info("product updated successfully");

      res.status(200).json({ message: "product updated successfully" });
    } catch (error) {
      logger.error("Internal server Error", error);

      res.json({ error: "Internal server Error" });
    }
  },
  decreasedQty: async (req: Request & { userID: Number }, res: Response) => {
    try {
      // Validate the inputs
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        logger.error("Validation error occurred  ", errors);
        return res.status(400).json({ errors: errors.array() });
      }
      const { productId } = req.body;
      const { userID } = req;
      if (!userID) {
        logger.error("Unauthorized: User can't decreased items fom the cart");
        return res
          .status(401)
          .json({ error: "Unauthorized: User does not have permission" });
      }
      let cart = await db.Cart.findOne({ where: { userID: userID } });
      if (!cart) {
        logger.error(`Cart not found for user ${userID},please add items `);
        return res.status(404).json({ error: "Cart not found" });
      }
      logger.info(`Decreased quantity of product ${productId}`);
      const productItem = await CartItem.findOne({
        where: { productID: productId, cartID: cart.cartID },
      });
      if (!productItem) {
        logger.error(`Product ${productId} not found`);
        return res.status(404).json({ error: "Product not found" });
      }
      //Check when decreasing the quantity of items to cart doesn't go below to 0
      if (productItem.productQuantity > 0) {
        productItem.productQuantity -= 1;
        //Update the quantity by decrement 1 ;

        await productItem.save();
        logger.info("product updated successfully");
        res.status(200).json({ message: "product updated successfully" });
      }
    } catch (error) {
      logger.error("Internal server Error", error);
      return res.json({ error: "Internal server Error" });
    }
  },

  syncCart: async (req: Request & { userID: Number }, res: Response) => {
    const cartItems = req.body.cartItems;
    try {
      const { userID } = req;
      if (!userID) {
        logger.error("Unauthorized: User can't create the cat for the user");
        return res
          .status(401)
          .json({ error: "Unauthorized: User does not have permission" });
      }
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let cart = await db.Cart.findOne({ where: { userID: userID } });
      if (!cart) {
        try {
          cart = await Cart.create({ userID: userID });
          logger.info(`Cart created successfully`);
        } catch (error) {
          logger.error("Error creating cart for the user");
          return res.status(500).json({ error: "Error creating cart" });
        }
      }
      const addedItems = await cartServices.syncCart(cart.cartID, cartItems);
      return res.status(200).json({
        message: "Added items successfully with new cart",
        addedItems: addedItems,
      });
    } catch (error) {
      console.log(error);
      logger.error("Internal server Error", error);
      return res.json({ error: "Internal server Error" });
    }
  },
};
