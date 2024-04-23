import express from "express"
import {verifyToken} from "../Controllers/userController";

const router = express.Router();

import * as orderController from "../Controllers/orderController"


router.post('/:userID', verifyToken,orderController.createOrder);
export default router;
