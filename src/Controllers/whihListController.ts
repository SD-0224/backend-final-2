import { wishList } from "../Models/wishlist";
import { Product } from "../Models/product";
import { User } from "../Models/user";
import { Request, Response } from "express";
import { whitelist } from "validator";

export const whishListController = {
  toggleWhishListProducts: async (req: Request, res: Response) => {
    const { userID, productID } = req.body;
    try {
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
        await wishList.create({ where: { userID, productID } });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
  getWhishListByUserId:async(req:Request,res:Response)=>{
try {
    const {userId}=req.params;
    const userWishList=await wishList.findAll({where:{userId}});
    res.status(200).json({message:"Whish list of items returned successfully",userWishList});
} catch (error) {
    res.status(500).json({error:"Internal service error"});
}
  }
};
