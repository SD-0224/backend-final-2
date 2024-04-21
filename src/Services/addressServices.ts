import { options } from "joi";
import * as db from "../Models/index";
import { sequelize } from "../config/dbConfig";

const getAddress = async (addressData: any) : Promise<any> => {
  try {
    await db.address.findOne({
      where: addressData,
    });
  } catch (error) {
    console.log("error in address getting", error);
    throw new Error("Error finding address");
  }
};

const createAddress = async function (
  addressData: any,
  transaction?: any
): Promise<any> {
  try {
    return await db.address.create(addressData, { transaction });
  } catch (error) {
    console.log("error in address creating", error);
    throw new Error("Error create address");
  }
};

const addressServices = {
  createAddress,
  getAddress,
};

export default addressServices;
