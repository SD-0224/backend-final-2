import express from "express";
import { cartController } from "../Controllers/cartController";
import {verifyToken} from "../Controllers/userController";
import {validateCartDefault, validateItemFields, validateProductInfo} from "../Validators/cartValidator"
const cartRouter = express.Router();
cartRouter.get("/:userId", cartController.getCartByUserId);
cartRouter.post("/add/:userID/:productID", verifyToken, validateProductInfo, cartController.addItemsToCart);
cartRouter.delete("/", verifyToken,validateCartDefault, cartController.deleteItemsFromCart);
cartRouter.delete("/clear", verifyToken, cartController.clearCart);
cartRouter.put("/inc/:user",verifyToken, validateCartDefault, cartController.increasedQty);
cartRouter.put("/dec/:user", verifyToken, validateCartDefault, cartController.decreasedQty);
cartRouter.post("/sync/:user", verifyToken,validateItemFields, cartController.syncCart);

export default cartRouter;
