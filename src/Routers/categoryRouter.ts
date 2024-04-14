import express from "express"
const router = express.Router();

import * as categoryController from "../Controllers/categoryController"


router.get('/', categoryController.getAllCategories);
export default router;
