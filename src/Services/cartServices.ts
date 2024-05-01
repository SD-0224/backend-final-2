import * as db from "../Models/index";
import { sequelize } from "../config/dbConfig";
import { productAttributes } from "../Models/product";
import { logger } from "../config/pino";
import { cartItemAttributes } from "../Models/cartItem";

const getCartByUserId = async (userId: number): Promise<any> => {
  try {
    const cart = await db.Cart.findOne({ where: { userID: userId } });
    const cartItems = await db.CartItem.findAll({
      attributes: [
        "productID",
        "cartItemID",
        "cartID",
        "productTitle",
        "productSubtitle",
        "productPrice",
        "productDiscount",
        "productQuantity",
        "subTotal",
        [
          sequelize.literal(
            "(SELECT imgPath FROM images WHERE images.productID = cartItems.productID AND images.imageIndex = 1)"
          ),
          "imgPath",
        ],
      ],
      where: { cartID: cart.cartID },
    });
    return cartItems;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to get cart items');

  }
};

const syncCart = async (cartID: number, items: any) => {
  try {
    const addedItems = []; // Array to store added cart items   
    const deletedCount = await db.CartItem.destroy({
      where: { cartID: cartID},
    });
    for (const item of items) {
        // Create a new instance of CartItem model with item data
        const newCartItem = await db.CartItem.create({
          cartID: cartID,
          productID: item.productID,
          productQuantity: item.productQuantity,
          productPrice: item.productPrice,
          productDiscount: item.productDiscount,
          subTotal: item.subTotal,
          productTitle: item.productTitle,
          productSubtitle: item.productSubtitle,
          isOrdered: item.isOrdered
        });
        addedItems.push(newCartItem);
    }
    return addedItems;
  } catch (error) {
    console.error('Error adding cart items:', error);
    throw new Error('Failed to sync cart items');
  }
};

const addItemToCart = async (userId: number, quantity:number, productItem: productAttributes) => {
  try {
    let cart = await db.Cart.findOne({ where: { userID: userId } });
    if (!cart)
        {
            cart = await db.Cart.create({ userID: userId });
            logger.info(`Cart created successfully`);

        }
        const cartItem = await db.CartItem.create({
            cartID: cart.cartID,
            productID: productItem.productID,
            productQuantity: quantity,
            productPrice: productItem.price,
            productTitle: productItem.title,
            productSubtitle: productItem.subTitle,
            productDiscount: productItem.discount,
          });
    
    return cartItem;
  } catch (error) {
    logger.error("Error creating cartItem", error);
    console.log(error);
    throw new Error('Failed to add cart item');

  }
};


const cartServices = {
  getCartByUserId,
  addItemToCart,
  syncCart,
};

export default cartServices;
