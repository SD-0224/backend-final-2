import express from "express";
import { cartController } from "../Controllers/cartController";
import {verifyToken} from "../Controllers/userController";
const cartRouter = express.Router();

cartRouter.get("/:userId", cartController.getCartByUserId);
cartRouter.post("/add/:userID/:productID", verifyToken, cartController.addItemsToCart);
cartRouter.delete("/",verifyToken, cartController.deleteItemsFromCart);
cartRouter.delete("/clear",verifyToken, cartController.clearCart);
cartRouter.put("/inc/:user",verifyToken, cartController.increasedQty);
cartRouter.put("/dec/:user", verifyToken,cartController.decreasedQty);
cartRouter.post("/sync/:user", verifyToken,cartController.syncCart);

export default cartRouter;
