import * as db from "../Models/index";
import { sequelize } from "../config/dbConfig";
import { Request, Response } from "express";

import productServices from "../Services/productServices";
import { validationResult } from "express-validator";

export const getProductsByCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    // Extract category ID from route parameter
    const catID = req.params.category;

    // Extract page and limit from query parameters, with default values if not provided
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    // Validate the inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Find category by ID in the database
    const category = await db.category.findByPk(catID);

    // If category not found, return 404 response
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    // Define options for querying products
    const options = {
      where: { categoryID: catID },
      order: [["title", "ASC"]], // Sorting products by title in ascending order
    };

    // Count total number of products for the category
    const count = await productServices.countProducts(options);

    // Retrieve products based on options, page, and limit
    const products = await productServices.getProducts(
      options,
      Number(page),
      Number(limit)
    );

    // Return products and count in the response
    return res.status(200).json({
      products,
      count,
    });
  } catch (error) {
    // Handle errors and send appropriate error response
    console.log("Error getting products by cat", error);
    res.status(error.status).json({ error: error.message });
  }
};

export const getProductsByBrand = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    // Extract brand ID from route parameter
    const branID = req.params.brand;

    // Extract page and limit from query parameters, with default values if not provided
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    // Validate the inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Find brand by ID in the database
    const brand = await db.brand.findByPk(branID);

    // If brand not found, return 404 response
    if (!brand) {
      return res.status(404).json({
        message: "Brand not found",
      });
    }

    // Define options for querying products
    const options = {
      where: { brandID: branID },
      order: [["title", "ASC"]], // Sorting products by title in ascending order
    };

    // Count total number of products for the brand
    const count = await productServices.countProducts(options);

    // Retrieve products based on options, page, and limit
    const products = await productServices.getProducts(
      options,
      Number(page),
      Number(limit)
    );

    // Return products and count in the response
    return res.status(200).json({
      products,
      count,
    });
  } catch (error) {
    // Handle errors and send appropriate error response
    console.log("Error getting products by brand", error);
    res.status(error.status).json({ error: error.message });
  }
};
export const getProductsByArrival = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    // Retrieve products based on options, page, and limit
    // Return products and count in the response
  } catch (error) {
    // Handle errors and send appropriate error response

    console.log("Error getting products by trendy", error);
    res.status(error.status).json({ error: error.message });
  }
};

export const getProductsByTrendy = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
  } catch (error) {
    console.log("Error getting products by trendy", error);
    res.status(error.status).json({ error: error.message });
  }
};
