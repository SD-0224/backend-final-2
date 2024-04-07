import express from "express"
const router = express.Router();
import * as productController from "../Controllers/productController"



router.get('/brand/:brand', productController.getProductsByBrand);
router.get('/category/:category', productController.getProductsByCategory);
router.get('/new',);
router.get('/trendy',);

export default router;

