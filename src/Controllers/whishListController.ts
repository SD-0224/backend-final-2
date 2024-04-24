import { wishList } from "../Models/wishlist";
import { Product } from "../Models/product";
import { User } from "../Models/user";
import { Request, Response } from "express";
import { whitelist } from "validator";
import {logger}from "../config/pino";
export const whishListController = {
  toggleWhishListProducts: async (req: Request&{userID:Number}, res: Response) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        logger.error("Token not found in cookies");
        return res.status(401).json({ error: "Unauthorized: Token not found" });
      }
      const { userID, productID } = req.body;
      if (!userID) {
        logger.error("Unauthorized: User can't add whishList Items to the list  ");
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
        res.json({ message: "Item already exits" });
      } else {
        //Add Items to the list
        await wishList.create( { userID, productID });
        res.status(201).json({message:"Item added successfully to whishList"})
      }
    } catch (error) {
      logger.error("Internal server error" ,error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  getWhishListByUserId:async(req:Request&{userID:Number},res:Response)=>{
try {
    const {userId}=req.params;
    logger.info(`Get the list of favorites items for the user ${userId}`);
    const userWishList=await wishList.findAll({where:{userID:userId}});
    logger.info("Whish list of items returned successfully");
    res.status(200).json({message:"Whish list of items returned successfully",userWishList},);
} catch (error) {
  logger.error("Internal service error",error)
    res.status(500).json({error:"Internal service error"});
}
  }
};
