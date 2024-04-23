import express from "express"
const router = express.Router();
import { validatePersonalInfo } from "../Validators/orderValidator"
import * as orderController from "../Controllers/orderController"


router.post('/:userID', validatePersonalInfo, orderController.createOrder);
export default router;
