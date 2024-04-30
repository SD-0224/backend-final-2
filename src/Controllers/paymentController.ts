import { Request, Response } from "express";
import stripe from "stripe";
import dotenv from "dotenv";
import { logger } from "../config/pino";
import { StripePaymentProcessor } from "../Payment/StripePaymentProcessor";
dotenv.config();
const stripeProcessor = new StripePaymentProcessor();
export const paymentController = {
  payWithUPI: async (req: Request, res: Response) => {
    try {
      const { amount, apiURI } = req.body;
      const success = await stripeProcessor.payWithUPI(amount, apiURI);
      res.json({ success });
    } catch (error) {
      logger.error("failed payment");
      res.sendStatus(400).json({ error: "Failed payment " });
    }
  },
  payWithAmazon: async (req: Request, res: Response) => {
    try {
      const { amount, amazonToken } = req.body;
      const success = await stripeProcessor.payWithAmazonPay(
        amount,
        amazonToken
      );
      res.json({ success });
    } catch (error) {
      logger.error("Failed payment", error);
      res.json({ error: "failed payment " });
    }
  },
  payWithApple: async (req: Request, res: Response) => {
    try {
      const { amount, appleToken } = req.body;
      const success = await stripeProcessor.payWithApplePay(amount, appleToken);
      res.json({ success });
    } catch (error) {
      logger.error("Failed payment", error);
      res.json({ error: "failed payment " });
    }
  },
  payWithGoogle: async (req: Request, res: Response) => {
    try {
      const { amount, googleToken } = req.body;
      const success = await stripeProcessor.payWithApplePay(
        amount,
        googleToken
      );
    } catch (error) {
      logger.error("Failed payment", error);
      res.json({ error: "Failed Payment " });
    }
  },
  payWithCreditOrDebitCard: async (req: Request, res: Response) => {
    try {
      const { amount, creditToken } = req.body;
      const success = await stripeProcessor.payWithCreditOrDebitCArd(
        amount,
        creditToken
      );
    } catch (error) {
      logger.error("Failed payment", error);
      res.json({ error: "Failed Payment " });
    }
  },
  payWithPhonePe: async (req: Request, res: Response) => {
    try {
      const { amount, phoneToken } = req.body;
      const success = await stripeProcessor.payWithPhonePe(amount, phoneToken);
    } catch (error) {
      logger.error("Failed payment", error);
      res.json({ error: "Failed Payment " });
    }
  },
  payWithPayTm: async (req: Request, res: Response) => {
    try {
      const { amount, payTmToken } = req.body;
      const success = await stripeProcessor.payWithPayTm(amount, payTmToken);
    } catch (error) {
      logger.error("Failed payment", error);
      res.json({ error: "Failed Payment " });
    }
  },
};