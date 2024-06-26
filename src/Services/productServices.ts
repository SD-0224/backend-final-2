import * as db from "../Models/index";
import { sequelize } from "../config/dbConfig";

interface QueryOptions {
  where?: any;
  order?: any;
  having?: any;
  transaction?: any;
  lock?: any;
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

    const products = db.Product.findAll({
      where: options.where,
      attributes: [
        "productID",
        "title",
        "subTitle",
        "price",
        "discount",
        "slug",
        [sequelize.literal('(SELECT name FROM brand WHERE brand.brandID = products.brandID LIMIT 1)'), 'brandName'],
        [sequelize.literal('(SELECT slug FROM brand WHERE brand.brandID = products.brandID LIMIT 1)'), 'brand-slug'],
        [sequelize.literal('(SELECT name FROM category WHERE category.categoryID = products.categoryID LIMIT 1)'), 'category'],
        [sequelize.literal('(SELECT slug FROM category WHERE category.categoryID = products.categoryID LIMIT 1)'), 'category-slug'],

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
    const productCount = await db.Product.count({
      where: options.where,
    });
    return productCount;
  } catch (error) {
    // Log and handle any errors that occur during the database operation
    console.error("Error fetching product count:", error);
    throw new Error("Failed to fetch product count");
  }
};

const getProductById = async (id:number, options?:QueryOptions) =>
  {
    try
    {
      const Product = await db.Product.findOne({
        attributes: [
          "productID",
          "title",
          "subTitle",
          "description",
          "price",
          "discount",
          "quantity",
          "arrival",
          "slug",
          [sequelize.literal('(SELECT name FROM brand WHERE brand.brandID = products.brandID LIMIT 1)'), 'brand'],
          [sequelize.literal('(SELECT slug FROM brand WHERE brand.brandID = products.brandID LIMIT 1)'), 'brand-slug'],
          [sequelize.literal('(SELECT name FROM category WHERE category.categoryID = products.categoryID LIMIT 1)'), 'category'],
          [sequelize.literal('(SELECT slug FROM category WHERE category.categoryID = products.categoryID LIMIT 1)'), 'category-slug'],
          [sequelize.fn('COALESCE', sequelize.fn('AVG', sequelize.col('reviews.rating')), 0), 'avgReview'],
          [sequelize.fn('COUNT', sequelize.col("reviews.rating")), 'reviewsCount'],
        ],
  
        include: [
          {
            model: db.images,
            attributes: ['imageID', 'imgPath', 'imageIndex'],
            required: false
          },
          {
            model: db.review,
            attributes: [], as: "reviews",
            required: false
          }
        ],
        where: {
          productID: id
        },
        group: ['productID', 'imageID'],
        subQuery: false
  
      });
      return Product;
    }
    catch (error)
    {
      console.error("Error fetching product:", error);
      throw new Error("Failed to fetch product");
    }
  }

  const updateProduct = async (productId: number, quantityToDecrease: number, transaction?: any) => {
    try {
      const product = await db.Product.findOne({
        where: {
          productID: productId
        },
        transaction // Pass the transaction object to the findOne operation
      });
  
      if (!product) {
        throw new Error(`Product with ID ${productId} not found`);
      }
  
      // Decrease the quantity by the specified amount

      if (quantityToDecrease < 0) {
        throw new Error(`Quantity cannot be negative`);
      }
  
      // Update the product with the new quantity, passing the transaction object
      await db.Product.update(
        { quantity: quantityToDecrease },
        {
          where: {
            productID: productId
          },
          transaction // Pass the transaction object to the update operation
        }
      );
    } catch (error) {
      console.error("Error updating product:", error);
      throw new Error("Failed to update product");
    }
  };
  
const productServices = {
  getProducts,
  countProducts,
  getProductById,
  updateProduct,
};


export default productServices;
