import express from "express";
const router = express.Router();
import * as productController from "../Controllers/productController";
import {
  validateGetByCategoryParams,
  validateGetByBrandsParams,
  validatedefaultParams,
  validaterelatedParams,
  validateReviewParams,
  validateSearchParams,
  validateSpecificParams,
  validateDiscountParams,
  validateQuantityParams,
} from "../Validators/productValidator";
import { verifyToken } from "../Controllers/userController";

router.get(
  "/brand/:brand",
  validateGetByBrandsParams,
  productController.getProductsByBrand
);
router.get(
  "/category/:category",
  validateGetByCategoryParams,
  productController.getProductsByCategory
);
router.get(
  "/new",
  validatedefaultParams,
  productController.getProductsByArrival
);
router.get(
  "/trendy",
  validatedefaultParams,
  productController.getProductsByTrendy
);
router.get(
  "/handpicked/:category",
  validateGetByCategoryParams,
  productController.getProductsHandpicked
);
router.get("/search/", validateSearchParams, productController.searchProduct);
router.get(
  "/related",
  validaterelatedParams,
  productController.getRelatedProcuts
);
router.get(
  "/discount",
  validateDiscountParams,
  productController.getProductsByDiscount
);
router.get(
  "/limited",
  validateQuantityParams,
  productController.getProductByQuantity
);

router.get("/:product", validateSpecificParams, productController.getProduct);
router.post(
  "/rate/:product",
  verifyToken,
  validateReviewParams,
  productController.rateProduct
);

router.get(
  "/reviews/:product",
  validateSpecificParams,
  productController.getReviews
);

export default router;
