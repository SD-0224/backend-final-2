import express from "express";
import { verifyToken } from "../Controllers/userController";
import {paymentController} from "../Controllers/paymentController";
export const paymentRouter=express.Router();

paymentRouter.post('/payWithUPI',verifyToken,paymentController.payWithUPI);
  
  paymentRouter.post('/payWithAmazon',verifyToken,paymentController.payWithAmazon);
  
  paymentRouter.post('/payWithApple',verifyToken,paymentController.payWithApple);
  
  paymentRouter.post('/payWithGoogle',verifyToken,paymentController.payWithGoogle);
  
  paymentRouter.post('/payWithCreditOrDebitCard',verifyToken,paymentController.payWithCreditOrDebitCard);
  
  paymentRouter.post('/payWithPhonePe',verifyToken,paymentController.payWithPhonePe);
  
  paymentRouter.post('/payWithPayTm',verifyToken,paymentController.payWithPayTm);
  