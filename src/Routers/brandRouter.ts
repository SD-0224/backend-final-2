import express from "express";
const router = express.Router();

import * as brandController from "../Controllers/brandController";

router.get("/", brandController.getAllBrands);
export default router;
