import express from "express";
import { cartController } from "../Controllers/cartController";
import {verifyToken} from "../Controllers/userController";
const cartRouter = express.Router();

cartRouter.get("/:userId", cartController.getCartByUserId);
cartRouter.post("/add/:userID/:productID", verifyToken, cartController.addItemsToCart);
cartRouter.delete("/",verifyToken, cartController.deleteItemsFromCart);
cartRouter.delete("/clear", cartController.clearCart);
cartRouter.put("/inc/:user", cartController.increasedQty);
cartRouter.put("/dec/:user", cartController.decreasedQty);
cartRouter.post("/sync/:user", cartController.syncCart);

export default cartRouter;
