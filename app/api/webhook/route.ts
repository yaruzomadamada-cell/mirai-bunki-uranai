import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { insertPayment, markResultPaid } from "@/lib/store";

export async function POST(request: Request) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !webhookSecret) {
    return NextResponse.json({ error: "Stripe webhook is not configured" }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const body = await request.text();
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid webhook payload";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const resultId = session.metadata?.resultId ?? session.metadata?.fortune_result_id;

    if (resultId) {
      await markResultPaid(resultId, session.id);
      await insertPayment({
        fortune_result_id: resultId,
        stripe_session_id: session.id,
        provider: "stripe",
        provider_payment_id: session.id,
        amount: session.amount_total ?? 980,
        currency: session.currency ?? "jpy",
        status: session.payment_status ?? "paid",
      });
    }
  }

  return NextResponse.json({ received: true });
}
