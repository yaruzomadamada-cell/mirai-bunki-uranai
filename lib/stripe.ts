import "server-only";

import Stripe from "stripe";

let stripe: Stripe | null = null;

export function getStripe(): Stripe | null {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return null;
  }

  if (!stripe) {
    stripe = new Stripe(secretKey, {
      apiVersion: "2025-02-24.acacia",
    });
  }

  return stripe;
}
