import { NextResponse } from "next/server";
import { getFortuneResultForRequest } from "@/lib/result-lookup";
import { getSiteUrl } from "@/lib/site";
import { getStripe } from "@/lib/stripe";
import { insertPayment, setCheckoutSession } from "@/lib/store";

export async function POST(request: Request) {
  const formData = await request.formData();
  const resultId = String(formData.get("resultId") ?? "");
  const result = await getFortuneResultForRequest(resultId);

  if (!result) {
    return NextResponse.redirect(new URL("/fortune?error=not-found", request.url), { status: 303 });
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.redirect(new URL(`/result/${result.id}/premium?error=stripe-unconfigured`, request.url), {
      status: 303,
    });
  }

  const siteUrl = getSiteUrl(request.url);
  const lineItem = process.env.STRIPE_PRICE_ID
    ? {
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1,
      }
    : {
        price_data: {
          currency: "jpy",
          product_data: {
            name: "未来分岐 深掘り鑑定",
          },
          unit_amount: 980,
        },
        quantity: 1,
      };

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [lineItem],
    success_url: `${siteUrl}/result/${result.id}/premium?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/result/${result.id}`,
    metadata: {
      resultId: result.id,
      fortune_result_id: result.id,
    },
  });

  await setCheckoutSession(result.id, session.id);
  await insertPayment({
    fortune_result_id: result.id,
    stripe_session_id: session.id,
    provider: "stripe",
    provider_payment_id: session.id,
    amount: 980,
    currency: "jpy",
    status: "created",
  });

  if (!session.url) {
    return NextResponse.redirect(new URL(`/result/${result.id}/premium?error=session`, request.url), { status: 303 });
  }

  return NextResponse.redirect(session.url, { status: 303 });
}
