import { CartItem } from "../Models/cartItem";
import{Cart}from "../Models/cart";
import * as db from "../Models/index";
import { sequelize } from "../config/dbConfig";
import { Request, Response } from "express";
import { Product } from "../Models/product";
//Get cart by userId and create a new cart objet
export const cartController = {
  getCartByUserId: async (req: Request, res: Response) => {
    try {
      let userId = req.params.userId;
      console.log("userId", userId);

      const cartItems = await CartItem.findAll({
        where: { userID: userId },
        include: [{ model: Product }],
      });
      if (cartItems.length === 0) {
        res.status(404).json({ error: "Cart is empty" });
      }
      res.json(cartItems);
      // res.send({ message: `Getting ${userId} from cart` });
    } catch (error) {
      console.log("Error fetching the catItems", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
   addItemsToCart : async (req: Request, res: Response) => {
    try {
        const userId = req.params.userID;
        const productId = req.params.productID;
        const { quantity } = req.body;
        
        // Debugging: Log the userId to verify it's correct
        console.log("userId:", userId);
        
        // Check if the user exists
        const user = await db.User.findByPk(userId);
        if (!user) {
            console.error("User not found for ID:", userId);
            return res.status(404).json({ error: "User not found" });
        }
        
        // Debugging: Log the product ID to verify it's correct
        console.log("Product ID:", productId);
        
        //Checks if the product already exists
        const productItem = await db.Product.findByPk(productId);
        if (!productItem) {
            console.error("Product not found for ID:", productId);
            return res.status(404).json({ error: "Product not found" });
        }
        
        // Debugging: Log the user and product information before creating the cart
        console.log("User:", user);
        console.log("Product:", productItem);
        
        // Create or find the cart
        let cart = await Cart.findOne({ where: { userID: userId } });
        if (!cart) {
            // Create the cart
            try {
                cart = await Cart.create({ userID: userId });
            } catch (error) {
                console.error("Error creating cart:", error);
                return res.status(500).json({ error: "Error creating cart" });
            }
        }
        
        // Debugging: Log the created cart
        console.log("Cart:", cart);
        
        // Create the cart item
        try {
            await db.CartItem.create({ userId: cart.userID, productId, productQuantity: quantity });
        } catch (error) {
            console.error("Error creating cart item:", error);
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
        
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: "Internal server Error" });
    }
},
  deleteItemsFromCart: async (req: Request, res: Response) => {
    try {
      const { userId, productId } = req.body;
      await CartItem.destroy({ where: { userId, productId } });
      res.json({ message: `Item deleted from the  cart for ${userId}` });
    } catch (error) {
      res.json({ error: "Internal server Error" });
    }
  },
  clearCart: async (req: Request, res: Response) => {
    try {
      let userId = req.params.userId;
      await CartItem.destroy({ where: { userId } });
      res.json({ message: `cart cleared for ${userId}` });
    } catch (error) {
      res.json({ error: "Internal server Error" });
    }
  },
  increasedQty: async (req: Request, res: Response) => {
    try {
      const { userId, productId } = req.body;
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
      const { userId, productId } = req.body;
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
