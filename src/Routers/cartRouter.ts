import express from "express";
import {cartController}
 from "../Controllers/cartController";


 const cartRouter=express.Router();

 cartRouter.get("/:id",cartController.getCartByUserId);
 cartRouter.post("/:userID/:productID", cartController.addItemsToCart);
 cartRouter.delete("/",cartController.deleteItemsFromCart);
 cartRouter.delete("/clear",cartController.clearCart);
 cartRouter.put("/inc",cartController.increasedQty);
 cartRouter.put("/dec",cartController.decreasedQty);

 export default cartRouter;
