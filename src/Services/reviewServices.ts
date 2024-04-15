import { options } from "joi";
import * as db from "../Models/index";
import { sequelize } from "../config/dbConfig";
import { ReviewAttributes } from "../Models/review";

interface QueryOptions {
    where?: any;
    order?: any;
    include?: any;
  }
const getReviews = async (options?:QueryOptions) =>
    {
        try {
            return await db.review.findAll({
                where : options.where,
                include: options.include,
                order: options.order
              });
        }  catch (error)
        {
          console.error("Error getting rating product:", error);
          throw new Error("Failed to rate product");
    
        }
    }

const addReview = async (review:any) =>
    {
        try
        {
            return await db.review.create(review);
        }
        catch (error)
    {
      console.error("Error rating product:", error);
      throw new Error("Failed to rate product");

    }
    }
const updateReview = async (review:any , where:any) =>
    {
        try{
            return await db.review.update(review,{
                where: where
              })
        }
        catch (error)
        {
          console.error("Error updating rating product:", error);
          throw new Error("Failed to rate product");
    
        }
    }
const reviewServices = {
    getReviews,
    addReview,
    updateReview,
};

export default reviewServices;