import express from "express";
import { cartController } from "../Controllers/cartController";
import {validateCartDefault, validateItemFields, validateProductInfo} from "../Validators/cartValidator"
const cartRouter = express.Router();

cartRouter.get("/:userId", cartController.getCartByUserId);
cartRouter.post("/add/:userID/:productID", validateProductInfo, cartController.addItemsToCart);
cartRouter.delete("/", validateCartDefault, cartController.deleteItemsFromCart);
cartRouter.delete("/clear", cartController.clearCart);
cartRouter.put("/inc/:user",validateCartDefault, cartController.increasedQty);
cartRouter.put("/dec/:user",validateCartDefault, cartController.decreasedQty);
cartRouter.post("/sync/:user", validateItemFields, cartController.syncCart);

export default cartRouter;
