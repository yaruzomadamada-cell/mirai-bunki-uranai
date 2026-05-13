import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { getKomojuPrice, getKomojuWebhookSecret } from "@/lib/komoju";
import { getStoredFortuneResult } from "@/lib/result-lookup";
import { insertPayment, markResultPaid } from "@/lib/store";

type KomojuWebhookEvent = {
  id?: string;
  type?: string;
  resource?: string;
  data?: Record<string, unknown>;
};

function verifySignature(rawBody: string, signature: string | null, secret: string): boolean {
  if (!signature) {
    return false;
  }

  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const provided = signature.match(/[a-f0-9]{64}/i)?.[0] ?? signature.trim();
  const expectedBuffer = Buffer.from(expected, "hex");
  const providedBuffer = Buffer.from(provided, "hex");

  if (expectedBuffer.length !== providedBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, providedBuffer);
}

function asRecord(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : {};
}

function readString(...values: unknown[]): string | undefined {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return undefined;
}

function extractResultId(event: KomojuWebhookEvent): string | undefined {
  const data = asRecord(event.data);
  const metadata = asRecord(data.metadata);
  const paymentData = asRecord(data.payment_data);
  const paymentDataMetadata = asRecord(paymentData.metadata);
  const session = asRecord(data.session);
  const sessionMetadata = asRecord(session.metadata);

  return readString(
    metadata.resultId,
    metadata.fortune_result_id,
    paymentDataMetadata.resultId,
    paymentDataMetadata.fortune_result_id,
    paymentData.external_order_num,
    data.external_order_num,
    sessionMetadata.resultId,
    sessionMetadata.fortune_result_id,
  );
}

function extractPaymentId(event: KomojuWebhookEvent): string {
  const data = asRecord(event.data);
  return readString(data.id, event.id) ?? randomUUID();
}

function eventStatus(event: KomojuWebhookEvent): string {
  const data = asRecord(event.data);
  return readString(data.status, event.type, event.resource) ?? "unknown";
}

function isPaidEvent(event: KomojuWebhookEvent): boolean {
  const data = asRecord(event.data);
  const status = readString(data.status)?.toLowerCase();
  return event.type === "payment.captured" || status === "captured";
}

function isTerminalNonPaidEvent(event: KomojuWebhookEvent): boolean {
  const data = asRecord(event.data);
  const status = readString(data.status)?.toLowerCase();
  return (
    event.type === "payment.failed" ||
    event.type === "payment.cancelled" ||
    event.type === "payment.expired" ||
    status === "failed" ||
    status === "cancelled" ||
    status === "expired"
  );
}

export async function POST(request: Request) {
  const webhookSecret = getKomojuWebhookSecret();
  if (!webhookSecret) {
    return NextResponse.json({ error: "KOMOJU webhook is not configured" }, { status: 500 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get("x-komoju-signature");

  if (!verifySignature(rawBody, signature, webhookSecret)) {
    return NextResponse.json({ error: "Invalid KOMOJU signature" }, { status: 400 });
  }

  let event: KomojuWebhookEvent;
  try {
    event = JSON.parse(rawBody) as KomojuWebhookEvent;
  } catch {
    return NextResponse.json({ error: "Invalid KOMOJU payload" }, { status: 400 });
  }

  const resultId = extractResultId(event);
  if (!resultId) {
    return NextResponse.json({ received: true, skipped: "missing-result-id" });
  }

  const result = await getStoredFortuneResult(resultId);
  if (!result) {
    return NextResponse.json({ received: true, skipped: "unknown-result-id" });
  }

  const paymentId = extractPaymentId(event);
  const status = eventStatus(event);

  if (isPaidEvent(event)) {
    await markResultPaid(resultId, paymentId);
    await insertPayment({
      fortune_result_id: resultId,
      stripe_session_id: paymentId,
      provider: "komoju",
      provider_payment_id: paymentId,
      amount: getKomojuPrice().amount,
      currency: "jpy",
      status: "captured",
    });
  } else if (isTerminalNonPaidEvent(event)) {
    await insertPayment({
      fortune_result_id: resultId,
      stripe_session_id: paymentId,
      provider: "komoju",
      provider_payment_id: paymentId,
      amount: getKomojuPrice().amount,
      currency: "jpy",
      status,
    });
  }

  return NextResponse.json({ received: true });
}
