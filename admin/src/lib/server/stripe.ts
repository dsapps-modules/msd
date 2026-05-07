import Stripe from "stripe";

const STRIPE_API_VERSION = "2022-11-15";

export function getServerStripeClient(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured.");
  }

  return new Stripe(secretKey, {
    //@ts-ignore Stripe's type package can lag behind supported pinned versions.
    apiVersion: STRIPE_API_VERSION,
  });
}
