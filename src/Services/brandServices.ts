import * as db from "../Models/index";


const getAllBrands = async () =>
    {
        try {
            const brands = await db.brand.findAll();
            return brands;
        } catch (error) {
            console.log(error);
        }
    }
const brandServices = {
    getAllBrands,

};

export default brandServices;