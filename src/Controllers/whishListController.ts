import { wishList } from "../Models/wishlist";
import { Product } from "../Models/product";
import { User } from "../Models/user";
import { Request, Response } from "express";
import { whitelist } from "validator";

export const whishListController = {
  toggleWhishListProducts: async (req: Request&{userID:Number}, res: Response) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        // logger.error("Token not found in cookies");
        return res.status(401).json({ error: "Unauthorized: Token not found" });
      }
      const { userID, productID } = req.body;
      if (!userID) {
        // logger.error("Unauthorized: User can't create the order ");
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
        await ItemExisted.destroy();
        res.json({ message: "Item already exits" });
      } else {
        //Add Items to the list
        await wishList.create( { userID, productID });
        res.status(201).json({message:"Item added successfully to whishList"})
      }
    } catch (error) {
      console.log("error",error);
      
      res.status(500).json({ error: "Internal server error" });
    }
  },
  getWhishListByUserId:async(req:Request&{userID:Number},res:Response)=>{
try {
    const {userId}=req.params;
    const userWishList=await wishList.findAll({where:{userID:userId}});
    res.status(200).json({message:"Whish list of items returned successfully",userWishList},);
} catch (error) {
    res.status(500).json({error:"Internal service error"});
}
  }
};
