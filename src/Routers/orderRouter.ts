import express from "express";
import { verifyToken } from "../Controllers/userController";

const router = express.Router();
import { validatePersonalInfo } from "../Validators/orderValidator";
import * as orderController from "../Controllers/orderController";

router.post(
  "/",
  verifyToken,
  validatePersonalInfo,
  orderController.createOrder
);
export default router;
