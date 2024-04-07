import * as db from "../Models/index";
import { sequelize } from "../config/dbConfig";
import { Request, Response } from "express";

import productServices from "../Services/productServices";

export const getProductsByCategory = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const catID = req.params.category;
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    console.log(page, limit);
    const category = await db.category.findByPk(catID);
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }
    const options = {
      where: { categoryID: catID },
      order: [["title", "ASC"]], // ASC for ascending order (alphabetical)
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
    console.log("Error getting products by cat", error);
    res.status(error.status).json({ error: error.message });
  }
};

export const getProductsByBrand = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const branID = req.params.brand;
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const brand = await db.brand.findByPk(branID);
    if (!brand) {
      return res.status(404).json({
        message: "Category not found",
      });
    }
    const options = {
      where: { brandID: branID },
      order: [["title", "ASC"]], // ASC for ascending order (alphabetical)
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
    console.log("Error getting products by brand", error);
    res.status(error.status).json({ error: error.message });
  }
};
export const getProductsByTrendy = async(req: Request, res: Response): Promise<any> => 
{
    try
    {
        
    }
    catch(error){
        console.log("Error getting products by trendy", error);
        res.status(error.status).json({ error: error.message });
    }

}