import * as db from "../Models/index";
import { sequelize } from "../config/dbConfig";
import { Request, Response } from "express";
import FuzzySearch from "fuzzy-search";

import productServices from "../Services/productServices";
import { validationResult } from "express-validator";
import { Op } from "sequelize";
import brandServices from "../Services/brandServices";
import reviewServices from "../Services/reviewServices";
import {logger} from "../config/pino";
export const getProductsByCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    // Extract category ID from route parameter
    const cartID = req.params.category;
logger.info(`Get the product by category ${cartID}`);
    // Extract page and limit from query parameters, with default values if not provided
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    // Validate the inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error("Validation error occurred  ",errors);
      return res.status(400).json({ errors: errors.array() });
    }

    // Find category by ID in the database
    const category = await db.category.findByPk(cartID);

    // If category not found, return 404 response
    if (!category) {
      logger.error("Category not found");
      return res.status(404).json({
        message: "Category not found",
      });
    }

    // Define options for querying products
    const options = {
      where: { categoryID: cartID },
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
    logger.info(`Product retrieved successfully`);
  } catch (error) {
    // Handle errors and send appropriate error response
    logger.error("Error getting products by cat", error)
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
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const currentDate = new Date();
    const minimum = currentDate.setMonth(currentDate.getMonth() - 3);
    const options = {
      where: {
        arrival: {
          [Op.gt]: minimum,
        },
      },
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

    console.log("Error getting products by trendy", error);
    res.status(error.status).json({ error: error.message });
  }
};

export const getProductsByTrendy = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const options = {
      where: {
        productID: {
          [Op.in]: sequelize.literal(
            `(SELECT productID FROM reviews GROUP BY productID HAVING AVG(rating) >= 4.5)`
          ),
        },
      },
      order: [["title", "ASC"]], // Sorting products by title in ascending order

      having: sequelize.literal(`avgReview >= 4.5`),
    };
    const count = await productServices.countProducts(options);

    const products = await productServices.getProducts(
      options,
      Number(page),
      Number(limit)
    );
    return res.status(200).json({
      products,
      count,
    });
  } catch (error) {
    console.log("Error getting products by trendy", error);
    res.status(error.status).json({ error: error.message });
  }
};

export const getProductsHandpicked = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const catID = req.params.category;
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const options = {
      where: {
        categoryID: catID,
        productID: {
          [Op.in]: sequelize.literal(
            `(SELECT productID FROM reviews GROUP BY productID HAVING AVG(rating) >= 4.5 and price <100)`
          ),
        },
      },
      order: [["title", "ASC"]], // Sorting products by title in ascending order

      having: sequelize.literal(`avgReview >= 4.5 and price <100`),
    };
    const count = await productServices.countProducts(options);

    const products = await productServices.getProducts(
      options,
      Number(page),
      Number(limit)
    );
    return res.status(200).json({
      products,
      count,
    });
  } catch (error) {
    console.log("Error getting products by handpicked", error);
    res.status(error.status).json({ error: error.message });
  }
};

export const searchProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const searchInput = req.query.search;
    console.log(searchInput);
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const products = await productServices.getProducts({}, 1, 1000);

    const brands = await brandServices.getAllBrands();
    const combinedData = [
      ...products,
      ...brands.map((brand) => ({
        brandName: brand.name,
        imgPath: brand.imagePath,
      })),
    ];

    const searcher = new FuzzySearch(
      combinedData,
      ["title", "subTitle", "brandName"],
      {
        caseSensitive: false,
      }
    );
    const result = searcher.search(searchInput, { page: page, limit: limit });

    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = Number(page) * Number(limit);
    const paginatedResult = result.slice(startIndex, endIndex);
    const count = result.length;
    res.status(200).json({
      paginatedResult,
      count,
    });
  } catch (err) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export const getProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const productID = req.params.productID as string | undefined;
    console.log(productID);
    if (!productID) {
      return res.status(400).json({ error: "id for product required" });
    }

    const product = await productServices.getProductById(Number(productID));
    res.status(200).json({ product });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const rateProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const review = req.body.review;
    const productID = req.params.productID;
    console.log(req.body);
    const userID = req.body.userID;
    const existProduct = await productServices.getProductById(
      Number(productID)
    );

    if (!existProduct) {
      return res.status(400).json({ error: "product not found" });
    }

    const options = {
      where: {
        userID: userID,
        productID: productID,
      },
    };

    const existRate = await reviewServices.getReviews(options);
    if (existRate.length === 0) {
      await reviewServices.addReview({
        userID: userID,
        rating: review,
        productID: productID,
      });

      return res.status(200).json("Added Review!");
    } else {
      //existRate
      await reviewServices.updateReview(
        {
          rating: review,
        },
        {
          userID: userID,
          productID: productID,
        }
      );
      return res.status(200).json("Update Rate");
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getReviews = async (req: Request, res: Response): Promise<any> => {
  try {
    const productID = req.params.productID;

    if (!productID) {
      return res.status(400).json({ error: "Invalid Product" });
    }

    const count = await db.review.count({
      where: {
        productID: productID,
      },
    });

    const options = {
      where: {
        productID: productID,
      },
      include: [
        {
          model: db.User,
          attributes: ["firstName", "lastName"],
        },
      ],
      order: [["rating", "DESC"]],
    };

    const reviews = await reviewServices.getReviews(options);

    return res.status(200).json({
      totalCount: count,
      reviews: reviews,
    });
  } catch (error) {
    console.error(error);
    return res.status(error.status).json({ error: error.message });
  }
};
export const getRelatedProcuts = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    // Extract brand ID from route parameter
    const brandName = req.query.brand;
    const categoryName = req.query.category;
    // Extract page and limit from query parameters, with default values if not provided
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    console.log("brandName");
    // Validate the inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Find brand by ID in the database
    const brand = await db.brand.findOne({ where: { name: brandName } });
    const category = await db.category.findOne({
      where: { name: categoryName },
    });
    console.log(brand);
    // If brand not found, return 404 response
    if (!brand) {
      return res.status(404).json({
        message: "Brand not found",
      });
    }
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }
    // Define options for querying products
    const options = {
      where: {
        [Op.or]: { brandID: brand.brandID, categoryID: category.categoryID },
      },
      order: sequelize.literal("RAND()"), // Sorting products by title in ascending order
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
    console.log("Error getting related products", error);
    res.status(error.status).json({ error: error.message });
  }
};
