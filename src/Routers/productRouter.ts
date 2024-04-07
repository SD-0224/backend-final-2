import express from "express"
const router = express.Router();
import * as productController from "../Controllers/productController"
import { validateGetByCategoryParams, validateGetByBrandsParams } from "../Validators/productValidator";


router.get('/brand/:brand', validateGetByBrandsParams, productController.getProductsByBrand);
router.get('/category/:category',validateGetByCategoryParams, productController.getProductsByCategory);
router.get('/new',);
router.get('/trendy',);

export default router;

