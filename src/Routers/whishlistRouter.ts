import express from "express";
import {whishListController} from "../Controllers/whishListController";


export const whishListRouter=express.Router();
whishListRouter.post("/toggle",whishListController.toggleWhishListProducts);
whishListRouter.get("/:userId",whishListController.getWhishListByUserId);
