import { wishList } from "../Models/wishlist";
import { Product } from "../Models/product";
import { User } from "../Models/user";
import { Request, Response } from "express";
import { whitelist } from "validator";
import { logger } from "../config/pino";
import { sequelize } from "../config/dbConfig";
export const whishListController = {
  toggleWhishListProducts: async (
    req: Request & { userID: Number },
    res: Response
  ) => {
    try {
      const { productID } = req.body;
      const userID = req.userID;
      if (!userID) {
        logger.error(
          "Unauthorized: User can't add whishList Items to the list  "
        );
        return res
          .status(401)
          .json({ error: "Unauthorized: User does not have permission" });
      }
      //Check if the Items already are exists in the list
      const ItemExisted = await wishList.findOne({
        where: { userID, productID },
      });

      //Remove the Item from the list if it exists
      if (ItemExisted) {
        logger.info("Removing existing Items  from the list");
        await ItemExisted.destroy();
        res.json({ message: "Item removed from wishlist" });
      } else {
        //Add Items to the list
        await wishList.create({ userID, productID });
        res
          .status(201)
          .json({ message: "Item added successfully to whishList" });
      }
    } catch (error) {
      logger.error("Internal server error", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  getWhishListByUserId: async (
    req: Request & { userID: Number },
    res: Response
  ) => {
    try {
      const userID = req.userID;
      logger.info(`Get the list of favorites items for the user ${userID}`);
      const userWishList = await wishList.findAll({
        attributes: [
          "productID",
          "userID",
          [
            sequelize.literal(
              "(SELECT imgPath FROM images WHERE images.productID = wishList.productID AND images.imageIndex = 1)"
            ),
            "imgPath",
          ],
        ],
        where: { userID: userID },
        include: [{ model: Product, as: "product" }],
      });
      logger.info("Whish list of items returned successfully");
      res.status(200).json({
        userWishList,
      });
    } catch (error) {
      logger.error("Internal service error", error);
      console.log(error)
      res.status(500).json({ error: "Internal service error" });
    }
  },
};
