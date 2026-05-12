import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getFortuneResult, insertPayment, setCheckoutSession } from "@/lib/store";

export async function POST(request: Request) {
  const formData = await request.formData();
  const resultId = String(formData.get("resultId") ?? "");
  const result = await getFortuneResult(resultId);

  if (!result) {
    return NextResponse.redirect(new URL("/fortune?error=not-found", request.url), { status: 303 });
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.redirect(new URL(`/result/${result.id}/premium?error=stripe-unconfigured`, request.url), {
      status: 303,
    });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin;
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
      fortune_result_id: result.id,
    },
  });

  await setCheckoutSession(result.id, session.id);
  await insertPayment({
    fortune_result_id: result.id,
    stripe_session_id: session.id,
    amount: 980,
    currency: "jpy",
    status: "created",
  });

  if (!session.url) {
    return NextResponse.redirect(new URL(`/result/${result.id}/premium?error=session`, request.url), { status: 303 });
  }

  return NextResponse.redirect(session.url, { status: 303 });
}
