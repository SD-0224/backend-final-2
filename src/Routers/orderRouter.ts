import express from "express"
const router = express.Router();

import * as orderController from "../Controllers/orderController"


router.post('/:userID', orderController.createOrder);
export default router;
