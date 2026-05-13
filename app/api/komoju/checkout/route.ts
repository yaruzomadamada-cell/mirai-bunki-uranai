import { NextResponse } from "next/server";
import { createKomojuCheckoutSession, getKomojuPrice, isKomojuEnabled } from "@/lib/komoju";
import { getFortuneResultForRequest } from "@/lib/result-lookup";
import { getSiteUrl } from "@/lib/site";
import { insertPayment } from "@/lib/store";

export async function POST(request: Request) {
  const formData = await request.formData();
  const resultId = String(formData.get("resultId") ?? "");
  const result = await getFortuneResultForRequest(resultId);

  if (!result) {
    return NextResponse.redirect(new URL("/fortune?error=not-found", request.url), { status: 303 });
  }

  if (!isKomojuEnabled()) {
    return NextResponse.redirect(new URL(`/result/${result.id}/premium?error=komoju-disabled`, request.url), {
      status: 303,
    });
  }

  if (result.paid) {
    return NextResponse.redirect(new URL(`/result/${result.id}/premium`, request.url), { status: 303 });
  }

  try {
    const siteUrl = getSiteUrl(request.url);
    const session = await createKomojuCheckoutSession({
      resultId: result.id,
      siteUrl,
    });
    const sessionUrl = session.session_url ?? session.url;

    await insertPayment({
      fortune_result_id: result.id,
      stripe_session_id: session.id,
      provider: "komoju",
      provider_payment_id: session.id,
      amount: getKomojuPrice().amount,
      currency: "jpy",
      status: "created",
    });

    if (!sessionUrl) {
      return NextResponse.redirect(new URL(`/result/${result.id}/premium?error=komoju-session`, request.url), {
        status: 303,
      });
    }

    return NextResponse.redirect(sessionUrl, { status: 303 });
  } catch (error) {
    console.error(
      "KOMOJU checkout session creation failed:",
      error instanceof Error ? error.message : "Unknown KOMOJU error",
    );
    return NextResponse.redirect(new URL(`/result/${result.id}/premium?error=komoju-unconfigured`, request.url), {
      status: 303,
    });
  }
}
