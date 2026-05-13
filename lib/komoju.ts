import "server-only";

import { Buffer } from "node:buffer";

const KOMOJU_API_BASE = "https://komoju.com/api/v1";
const PRICE_AMOUNT = 980;
const PRICE_CURRENCY = "JPY";
const PRODUCT_NAME = "未来分岐 深掘り鑑定";

type KomojuSessionResponse = {
  id: string;
  session_url?: string;
  url?: string;
};

function cleanEnvValue(name: string, value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  let cleaned = value.trim();
  if (cleaned.startsWith(`${name}=`)) {
    cleaned = cleaned.slice(name.length + 1).trim();
  }
  if ((cleaned.startsWith('"') && cleaned.endsWith('"')) || (cleaned.startsWith("'") && cleaned.endsWith("'"))) {
    cleaned = cleaned.slice(1, -1).trim();
  }

  return cleaned || undefined;
}

export function isKomojuEnabled(): boolean {
  return process.env.NEXT_PUBLIC_KOMOJU_ENABLED === "true";
}

export function getKomojuSecretKey(): string | undefined {
  return cleanEnvValue("KOMOJU_SECRET_KEY", process.env.KOMOJU_SECRET_KEY);
}

export function getKomojuWebhookSecret(): string | undefined {
  return cleanEnvValue("KOMOJU_WEBHOOK_SECRET", process.env.KOMOJU_WEBHOOK_SECRET);
}

export function getKomojuPrice() {
  return {
    amount: PRICE_AMOUNT,
    currency: PRICE_CURRENCY,
    productName: PRODUCT_NAME,
  };
}

export async function createKomojuCheckoutSession({
  resultId,
  siteUrl,
}: {
  resultId: string;
  siteUrl: string;
}): Promise<KomojuSessionResponse> {
  const secretKey = getKomojuSecretKey();
  if (!secretKey) {
    throw new Error("KOMOJU_SECRET_KEY is not configured");
  }

  const response = await fetch(`${KOMOJU_API_BASE}/sessions`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${secretKey}:`).toString("base64")}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      mode: "payment",
      amount: PRICE_AMOUNT,
      currency: PRICE_CURRENCY,
      return_url: `${siteUrl}/result/${resultId}/premium?provider=komoju`,
      default_locale: "ja",
      line_items: [
        {
          name: PRODUCT_NAME,
          amount: PRICE_AMOUNT,
          quantity: 1,
        },
      ],
      metadata: {
        resultId,
        fortune_result_id: resultId,
      },
      payment_data: {
        external_order_num: resultId,
        metadata: {
          resultId,
          fortune_result_id: resultId,
        },
      },
    }),
  });

  const payload = (await response.json().catch(() => ({}))) as KomojuSessionResponse & {
    error?: string;
    message?: string;
  };

  if (!response.ok) {
    throw new Error(payload.error ?? payload.message ?? `KOMOJU session creation failed: ${response.status}`);
  }

  return payload;
}
