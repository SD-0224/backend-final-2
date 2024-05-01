import express from "express";
import { cartController } from "../Controllers/cartController";
import { verifyToken } from "../Controllers/userController";
import {
  validateCartDefault,
  validateItemFields,
  validateProductInfo,
} from "../Validators/cartValidator";
const cartRouter = express.Router();
cartRouter.get("/", verifyToken, cartController.getCartByUserId);
cartRouter.post(
  "/add/:productID",
  verifyToken,
  validateProductInfo,
  cartController.addItemsToCart
);
cartRouter.delete(
  "/",
  verifyToken,
  validateCartDefault,
  cartController.deleteItemsFromCart
);
cartRouter.delete("/clear", verifyToken, cartController.clearCart);
cartRouter.put(
  "/inc/",
  verifyToken,
  validateCartDefault,
  cartController.increasedQty
);
cartRouter.put(
  "/dec/",
  verifyToken,
  validateCartDefault,
  cartController.decreasedQty
);
cartRouter.post(
  "/sync/",
  verifyToken,
  validateItemFields,
  cartController.syncCart
);

export default cartRouter;
