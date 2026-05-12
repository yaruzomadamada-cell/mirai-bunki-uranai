import "server-only";

import { cookies } from "next/headers";
import { generateFortune } from "./fortune";
import type { FortuneResultRecord, Gender, ThemeId } from "./types";

type FallbackPayload = {
  id: string;
  nickname: string;
  birthdate: string;
  gender: Gender;
  theme: ThemeId;
  situation: string;
  concern: string | null;
  created_at: string;
};

function cookieName(id: string): string {
  return `fortune_result_${id}`;
}

function encode(payload: FallbackPayload): string {
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
}

function decode(value: string): FallbackPayload | null {
  try {
    return JSON.parse(Buffer.from(value, "base64url").toString("utf8")) as FallbackPayload;
  } catch {
    return null;
  }
}

export function createFallbackRecord(payload: FallbackPayload): FortuneResultRecord {
  const generated = generateFortune({
    nickname: payload.nickname,
    birthdate: payload.birthdate,
    gender: payload.gender,
    theme: payload.theme,
    situation: payload.situation,
    concern: payload.concern ?? undefined,
  });

  return {
    id: payload.id,
    nickname: payload.nickname,
    birthdate: payload.birthdate,
    gender: payload.gender,
    theme: payload.theme,
    situation: payload.situation,
    concern: payload.concern,
    type_number: generated.typeNumber,
    type_name: generated.typeName,
    free_result: generated.freeResult,
    premium_result: generated.premiumResult,
    paid: false,
    stripe_session_id: null,
    created_at: payload.created_at,
  };
}

export async function setFallbackFortuneCookie(payload: FallbackPayload): Promise<void> {
  const jar = await cookies();
  jar.set(cookieName(payload.id), encode(payload), {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function getFallbackFortuneResult(id: string): Promise<FortuneResultRecord | null> {
  const jar = await cookies();
  const value = jar.get(cookieName(id))?.value;
  if (!value) {
    return null;
  }

  const payload = decode(value);
  if (!payload || payload.id !== id) {
    return null;
  }

  return createFallbackRecord(payload);
}
