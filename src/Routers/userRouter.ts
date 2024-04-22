import express from "express";
import passport from "../config/passport";
import { register, registerNewUser,loginUser } from "../Controllers/userController";

export const userRouter = express.Router();



//Route for register new user
userRouter.post("/register", register);
userRouter.get("/login", loginUser);


