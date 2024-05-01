// stripeSingleton.ts

import Stripe from "stripe";
import { logger } from "../config/pino";

class StripeSingleton {
  private static instance: Stripe | null = null;

  private constructor() {} // Private constructor to prevent instantiation

  public static getInstance(): Stripe {
    if (!StripeSingleton.instance) {
      StripeSingleton.instance = new Stripe(process.env.Stripe_API_Key, {});
    }
    return StripeSingleton.instance;
  }

  public static async payWithVisaCard(
    amount: number,
    visaToken: string
  ): Promise<boolean> {
    try {
      const stripe = StripeSingleton.getInstance();
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        payment_method_types: ["visa"],
        payment_method: visaToken,
        confirm: true,
      });
      return paymentIntent.status === "succeeded";
    } catch (error) {
      logger.error("Visa Card Pay failed payment:", error);
      return false;
    }
  }
}

export default StripeSingleton;
