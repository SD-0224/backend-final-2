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
): Promise<any>=> {
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
    });
    return products;
  } catch (err) {
    console.log("error, fetching database for products", err);
  }
};

const countProducts = async (options:QueryOptions) =>
    {
        console.log("Fetching products from the database...");
        try {
        const products = await db.product.count({
            where: options.where,
            
        });
        return products;
      } catch (err) {
        console.log("error, fetching database for products", err);
      }
  
    }
const productServices = {
    getProducts,
    countProducts,
};

export default productServices;
