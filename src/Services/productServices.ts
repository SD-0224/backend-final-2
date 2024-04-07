import { options } from "joi";
import * as db from "../Models/index";
import { sequelize } from "../config/dbConfig";

interface QueryOptions {
  where: any;
  order?: any;
  having?: any;
}
/**
 * Retrieve products by category with pagination.
 * @param options Query options for filtering, ordering, and grouping.
 * @param page Page number for pagination.
 * @param pageSize Number of products per page.
 * @returns A promise that resolves to an array of products.
 */
const getProducts = async (
  options: QueryOptions,
  page: number,
  pageSize: number
): Promise<any> => {
  console.log("Fetching products from the database...");
  try {
    const products = db.product.findAll({
      where: options.where,
      attributes: [
        "productID",
        "title",
        "subTitle",
        "price",
        "categoryID",
        "discount",
        [sequelize.fn('COALESCE', sequelize.fn('AVG', sequelize.col('reviews.rating')), 0), 'avgReview'],
        [sequelize.fn('COUNT', sequelize.col('reviews.rating')), 'reviewCount'],
        [
          sequelize.literal(
            "(SELECT imgPath FROM images WHERE images.productID = products.productID AND images.imageIndex = 1)"
          ),
          "imgPath",
        ],
      ],
      include: [
        {
          model: db.review,
          attributes: [],
          as: "reviews",
          required: false,
        },
      ],
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: options.order,
      group: ["productID"],
      having: options.having,
      subQuery: false,

    });
    return products;
  } catch (err) {
    console.log("error, fetching database for products", err);
  }
};
/**
 * Count the number of products based on specified query options.
 * @param options Query options for filtering products.
 * @returns A promise that resolves to the count of products.
 */
const countProducts = async (options: QueryOptions): Promise<number> => {
  console.log("Fetching product count from the database...");
  try {
    // Count the number of products matching the provided options
    const productCount = await db.product.count({
      where: options.where,
    });
    return productCount;
  } catch (error) {
    // Log and handle any errors that occur during the database operation
    console.error("Error fetching product count:", error);
    throw new Error("Failed to fetch product count");
  }
};
const productServices = {
  getProducts,
  countProducts,
};

export default productServices;
