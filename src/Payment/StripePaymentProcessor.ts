import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
import { PaymentProcessor } from "./PaymentProcessor";
import { logger } from "../config/pino";
export class StripePaymentProcessor implements PaymentProcessor {
  private stripe: Stripe;
  constructor() {
    this.stripe = new Stripe(process.env.Stripe_API_Key as string, {
      apiVersion: "2024-04-10",
    });
  }
  async payWithUPI(amount: number, upiId: string): Promise<boolean> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency: "usd",
        payment_method_types: ["upi"],
        payment_method: upiId,
        confirm: true,
      });
      return paymentIntent.status === "succeeded";
    } catch (error) {
      logger.error("UPI Pay payment failed:", error);
      return false;
    }
  }

  async payWithAmazonPay(
    amount: number,
    amazonPayToken: string
  ): Promise<boolean> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency: "usd",
        payment_method_types: ["amazon_pay"],
        payment_method: amazonPayToken,
        confirm: true,
      });
      return paymentIntent.status === "succeeded";
    } catch (error) {
      logger.error("Amazon Pay payment failed:", error);
      return false;
    }
  }

  async payWithCreditOrDebitCArd(
    amount: number,
    cardToken: string
  ): Promise<boolean> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency: "usd",
        payment_method_types: ["card"],
        payment_method: cardToken,
        confirm: true,
      });
      return paymentIntent.status === "succeeded";
    } catch (error) {
      logger.error("Credit card Pay credit or debit card failed:", error);
      return false;
    }
  }
  async payWithApplePay(
    amount: number,
    applePayToken: string
  ): Promise<boolean> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency: "usd",
        payment_method_types: ["apple-pay"],
        payment_method: applePayToken,
        confirm: true,
      });
      return paymentIntent.status === "succeeded";
    } catch (error) {
      logger.error("Apple Pay failed payment:", error);
      return false;
    }
  }
  async payWithGooglePay(
    amount: number,
    googlePayToken: string
  ): Promise<boolean> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency: "usd",
        payment_method_types: ["google-pay"],
        payment_method: googlePayToken,
        confirm: true,
      });
      return paymentIntent.status === "succeeded";
    } catch (error) {
      logger.error("Google Pay failed payment:", error);
      return false;
    }
  }
  async payWithPayTm(amount: number, payTmToken: string): Promise<boolean> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency: "usd",
        payment_method_types: ["pay-tm"],
        payment_method: payTmToken,
        confirm: true,
      });
      return paymentIntent.status === "succeeded";
    } catch (error) {
      logger.error("PayTm Pay failed payment:", error);
      return false;
    }
  }
  async payWithPhonePe(amount: number, phonePeToken: string): Promise<boolean> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency: "usd",
        payment_method_types: ["phone-pe"],
        payment_method: phonePeToken,
        confirm: true,
      });
      return paymentIntent.status === "succeeded";
    } catch (error) {
      logger.error("PhonePe Pay failed payment:", error);
      return false;
    }
  }
}
