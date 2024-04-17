import { options } from "joi";
import * as db from "../Models/index";
import { sequelize } from "../config/dbConfig";


const getAllCategories = async () =>
    {
        try {
            const categories = await db.category.findAll();
            return categories;
        } catch (error) {
            console.log(error);
        }
    }




const orderServices = {
    

};

export default orderServices;