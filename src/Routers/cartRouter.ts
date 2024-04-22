import express from "express";
import { cartController } from "../Controllers/cartController";

const cartRouter = express.Router();

cartRouter.get("/:userId", cartController.getCartByUserId);
cartRouter.post("/add/:userID/:productID", cartController.addItemsToCart);
cartRouter.delete("/", cartController.deleteItemsFromCart);
cartRouter.delete("/clear", cartController.clearCart);
cartRouter.put("/inc/:user", cartController.increasedQty);
cartRouter.put("/dec/:user", cartController.decreasedQty);
cartRouter.post("/sync/:user", cartController.syncCart);

export default cartRouter;
