import express from "express";
import passport from "../config/passport";
export const authRouter = express.Router();
//Route for initiating Google OAuth authentication
authRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

//Callback route after Google
authRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);
