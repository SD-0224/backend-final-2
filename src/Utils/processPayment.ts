// stripeSingleton.ts

import Stripe from "stripe";
import { logger } from "../config/pino";
import dotenv from "dotenv";
dotenv.config();
class StripeSingleton {
  private static instance: Stripe | null = null;

  private constructor() {} // Private constructor to prevent instantiation

  public static getInstance(): Stripe {
    if (!StripeSingleton.instance) {
      StripeSingleton.instance = new Stripe(process.env.Stripe_API_Key || "sk_test_51PB0qOExyylvHUrWhr4L7NceK9WSr8C8SAMhSu2Jqe6k6cepaxOxzL5dX4S7BttxBB9OgRIH75NfXZL7sFjV2g2u00ozoHfF1V");
    }
    return StripeSingleton.instance;
  }

//   public static async payWithVisaCard(
//     amount: number,
//     visaToken: string
//   ): Promise<boolean> {
//     try {
//       const stripe = StripeSingleton.getInstance();
//       const paymentIntent = await stripe.paymentIntents.create({
//         amount,
//         currency: "usd",
//         payment_method: visaToken,
//         confirm: true,
        
//       });
//       return true;
//     } catch (error) {
//       logger.error("Visa Card Pay failed payment:", error);
//       return false;
//     }
//   }
}

export default StripeSingleton;
