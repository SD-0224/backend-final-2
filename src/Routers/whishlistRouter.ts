import express from "express";
import {whishListController} from "../Controllers/whishListController";
import {verifyToken} from "../Controllers/userController";


export const whishListRouter=express.Router();
whishListRouter.post("/toggle",verifyToken,whishListController.toggleWhishListProducts);
whishListRouter.get("/:userId",verifyToken,whishListController.getWhishListByUserId);
