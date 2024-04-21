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

 const slug = req.params.category;
logger.info(`Get the product by category ${slug}`);

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
    const category = await db.category.findOne({where:{"slug": slug}});
    // If category not found, return 404 response
    if (!category) {
      logger.error("Category not found");
      return res.status(404).json({
        message: "Category not found",
      });
    }

    // Define options for querying products
    const options = {
      where: { categoryID: category.categoryID },
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
    logger.info(`Product retrieved successfully`);
    return res.status(200).json({
      products,
      count,
    });

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

    const slug = req.params.brand;
logger.info(`Get ProductsByBrand ${slug}`)
    // Extract page and limit from query parameters, with default values if not provided
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    // Validate the inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error("Product By Brand Validation returned error",errors);
      return res.status(400).json({ errors: errors.array() });
    }

    // Find brand by ID in the database

    const brand = await db.brand.findOne({where:{"slug": slug}});
logger.info(`Brand by ID:${brand.brandID}`);

    // If brand not found, return 404 response
    if (!brand) {
      logger.error("Brand not found");
      return res.status(404).json({
        message: "Brand not found",
      });
    }

    // Define options for querying products
    const options = {
      where: { brandID: brand.brandID },
      order: [["title", "ASC"]], // Sorting products by title in ascending order
    };

    // Count total number of products for the brand
    const count = await productServices.countProducts(options);

    logger.info("Total products count"+ count);
    // Retrieve products based on options, page, and limit
    const products = await productServices.getProducts(
      options,
      Number(page),
      Number(limit)
    );

    // Return products and count in the response
    logger.info("Get Products By brand retrieved successfully",products);
    return res.status(200).json({
      products,
      count,
    });
  } catch (error) {
    // Handle errors and send appropriate error response
    logger.error("Error getting products by brand", error)
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
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
    logger.debug(`Count of Products by arrival: ${count}`);
    // Retrieve products based on options, page, and limit
    const products = await productServices.getProducts(
      options,
      Number(page),
      Number(limit)
    );

    //Log the retrieved products
    logger.debug(`Products retrieved :${products}`);
    // Return products and count in the response
    return res.status(200).json({
      products,
      count,
    });
  } catch (error) {
    // Handle errors and send appropriate error response
    logger.error("Error getting products by trendy", error)
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
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
logger.info("Total product count"+ count);
    const products = await productServices.getProducts(
      options,
      Number(page),
      Number(limit)
    );
    logger.info("Total products retrieved by trendy successfully",products);
    return res.status(200).json({
      products,
      count,
    });
  } catch (error) {
    logger.error("Error getting products by trendy", error)
    res.status(error.status).json({ error: error.message });
  }
};


export const getProductsHandpicked = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const slug = req.params.category;
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error("Products Handpicked Validation Error",errors);
      return res.status(400).json({ errors: errors.array() });
    }
    const category = await db.category.findOne({where:{"slug": slug}});

    // If category not found, return 404 response
    if (!category) {
      logger.error("Category not found",errors);
      return res.status(404).json({
        message: "Category not found",
      });
    }
    const options = {
      where: {
        categoryID: category.categoryID,
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
logger.info("The total number of products", count);
    const products = await productServices.getProducts(
      options,
      Number(page),
      Number(limit)
    );
    logger.info("Retrieved all the products successfully");
    return res.status(200).json({
      products,
      count,
    });
  } catch (error) {
    logger.error("Error getting products by handpicked", error)
    res.status(error.status).json({ error: error.message });
  }
};

export const searchProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const searchInput = req.query.search;
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
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
    const slug = req.params.product;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (!slug) {
      return res.status(400).json({ error: "slug for product required" });
    }
    const prod = await db.Product.findOne({where: {"slug":slug}})
    if (!prod)
      {
        return res.status(404).json({
          message: "Product not found",
        });
      }
    const product = await productServices.getProductById(Number(prod.productID));
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
    const slug = req.params.product;
    const userID = req.body.userID;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const existProduct = await db.Product.findOne({where: {"slug":slug}})


    if (!existProduct) {
      return res.status(400).json({ error: "product not found" });
    }

    const options = {
      where: {
        userID: userID,
        productID: existProduct.productID,
      },
    };

    const existRate = await reviewServices.getReviews(options);
    if (existRate.length === 0) {
      await reviewServices.addReview({
        userID: userID,
        rating: review,
        productID: existProduct.productID,
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
          productID: existProduct.productID,
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
    const slug = req.params.product;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (!slug) {
      return res.status(400).json({ error: "Invalid Product" });
    }
    const existProduct = await db.Product.findOne({where: {"slug":slug}})


    if (!existProduct) {
      return res.status(400).json({ error: "product not found" });
    }
    const count = await db.review.count({
      where: {
        productID: existProduct.productID,
      },
    });

    const options = {
      where: {
        productID: existProduct.productID,
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
export const getProductsByDiscount = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {

    //Extract discount from Query
    const discount = Number(req.query.discount) || 0.15;

    // Extract page and limit from query parameters, with default values if not provided
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    // Define options for querying products
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const options = {
      where: {
        discount: {
          [Op.gte]: discount,
        }
      },
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