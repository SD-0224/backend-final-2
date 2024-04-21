import { CartItem } from "../Models/cartItem";
import { Cart } from "../Models/cart";
import * as db from "../Models/index";
import { sequelize } from "../config/dbConfig";
import { Request, Response } from "express";
import { Product } from "../Models/product";
import { logger } from "../config/pino";
//Get cart by userId and create a new cart objet
export const cartController = {
  getCartByUserId: async (req: Request, res: Response) => {
    try {
      let userId = req.params.userId;
      logger.info(`Request received to get cart for ${userId} `);

      const cartItems = await CartItem.findAll({
        where: { userID: userId },
        include: [{ model: Product }],
      });
      logger.info(`Cart Item retrieved successfully for ${userId} `);

      if (cartItems.length === 0) {
        logger.info(`Cart is empty for user ${userId}`);
        return res.status(404).json({ error: "Cart is empty" });
      }
      res.json(cartItems);
    } catch (error) {
      logger.error("Error fetching the catItems");
      res.status(500).json({ error: "Internal server error" });
    }
  },
  addItemsToCart: async (req: Request, res: Response) => {
    try {
      const userId = req.params.userID;
      logger.info(`Checking if ${userId} exists in the cart `);
      const productId = req.params.productID;
      const { quantity } = req.body;

      // Check if the user exists
      const user = await db.User.findByPk(userId);
      if (!user) {
        logger.error(`User ${userId} not found`);
        return res.status(404).json({ error: "User not found" });
      }
      //Checks if the product already exists
      const productItem = await db.Product.findByPk(productId);
      logger.info("Product already exists" + productItem);
      if (!productItem) {
        logger.error(`Product ${productId} not found`);
        return res.status(404).json({ error: "Product not found" });
      }
      logger.info(`Product ${productId} found: ${JSON.stringify(productItem)}`);

      // Create or find the cart based on the userID
      let cart = await Cart.findOne({ where: { userID: userId } });

      if (!cart) {
        logger.error(
          `Cart not found for user ${userId},please create new one `
        );
        try {
          cart = await Cart.create({ userID: userId });
          logger.info(`Cart created successfully`);
        } catch (error) {
          logger.error("Error creating cart for the user");
          return res.status(500).json({ error: "Error creating cart" });
        }
      }

      // Create the cart item
      try {
        await db.CartItem.create({
          userID: cart.userID,
          cartID: cart.cartID,
          productID: productId,
          productQuantity: quantity,
        });
        logger.info("Cart created successfully");
      } catch (error) {
        logger.error(
          `Error creating cart item for user ${userId}: ${error.message}`
        );
        return res.status(500).json({ error: "Error creating cart item" });
      }

      res.json({
        message: `Adding ${productId} to cart for the user ${userId}`,
        product: {
          title: productItem.title,
          subtle: productItem.subTitle,
          quantity: productItem.quantity,
          price: productItem.price,
          subtotal: productItem.price * quantity,
        },
      });
      logger.info(`Adding ${productId} to cart for the user ${userId}`);
    } catch (error) {
      logger.error("Internal server Error", error);
      res.status(500).json({ error: "Internal server Error" });
    }
  },
  deleteItemsFromCart: async (req: Request, res: Response) => {
    try {
      const { userId, productId } = req.body;
      logger.info(`deleting ${productId} from ${userId}`);
      await CartItem.destroy({ where: { userId, productId } });
      logger.info(`Deleted ${productId} from ${userId} successfully `);
      return res.json({ message: `Item deleted from the  cart for ${userId}` });
    } catch (error) {
      logger.error("Error deleting item from the cart", error);
      res.json({ error: "Internal server Error" });
    }
  },
  clearCart: async (req: Request, res: Response) => {
    try {
      let userId = req.body.userId;
      logger.info(`Clearing ${userId} from the cart`);
      const deletedCount = await CartItem.destroy({
        where: { userID: userId },
      });
      logger.info(`Deleted ${deletedCount} from the cart`);
      if (deletedCount > 0) {
        logger.info(`Cart cleared successfully for user${userId}`);
        return res.json({
          message: `Cart cleared successfully for user${userId}`,
        });
      } else {
        logger.error(`There is no ${userId} found in the cart`);
        return res.json({ message: ` No cartItem found  for ${userId}` });
      }
    } catch (error) {
      logger.error("Internal server Error", error);
      res.json({ error: "Internal server Error" });
    }
  },
  increasedQty: async (req: Request, res: Response) => {
    try {
      const { productId } = req.body;
      const productItem = await Product.findByPk(productId);
      if (!productItem) {
        return res.status(404).json({ error: "Product not found" });
      }
      //Update the quantity by increment 1 ;
      productItem.quantity += 1;
      await productItem.save();
      res.status(200).json({ message: "product updated successfully" });
    } catch (error) {
      res.json({ error: "Internal server Error" });
    }
    // res.send({ message: "increased quantity of items to cart " });
  },
  decreasedQty: async (req: Request, res: Response) => {
    try {
      const { productId } = req.body;
      const productItem = await Product.findByPk(productId);
      if (!productItem) {
        return res.status(404).json({ error: "Product not found" });
      }
      //Check when decreasing the quantity of items to cart doesn't go below to 0
      if (productItem.quantity > 0) {
        productItem.quantity -= 1;
        //Update the quantity by decrement 1 ;

        await productItem.save();
        res.status(200).json({ message: "product updated successfully" });
      }
    } catch (error) {
      res.json({ error: "Internal server Error" });
    }
  },
};
