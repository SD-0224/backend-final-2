import express from "express"
const router = express.Router();
import * as productController from "../Controllers/productController"
import { validateGetByCategoryParams, validateGetByBrandsParams } from "../Validators/productValidator";


router.get('/brand/:brand', validateGetByBrandsParams, productController.getProductsByBrand);
router.get('/category/:category',validateGetByCategoryParams, productController.getProductsByCategory);
router.get('/new', productController.getProductsByArrival);
router.get('/trendy', productController.getProductsByTrendy);
router.get('/handpicked/:category', productController.getProductsHandpicked);

export default router;

