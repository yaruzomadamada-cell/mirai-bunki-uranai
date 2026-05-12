import { NextResponse } from "next/server";
import { generateFortune } from "@/lib/fortune";
import { createFallbackRecord, setFallbackFortuneCookie } from "@/lib/fortune-cookie";
import { situationOptions, themeLabels } from "@/lib/fortune-data";
import { createFortuneResult } from "@/lib/store";
import type { Gender, ThemeId } from "@/lib/types";

const genders = ["女性", "男性", "その他", "回答しない"];
const themes = Object.keys(themeLabels) as ThemeId[];

function clean(value: FormDataEntryValue | null, max = 200): string {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const nickname = clean(formData.get("nickname"), 24);
  const birthdate = clean(formData.get("birthdate"), 10);
  const gender = clean(formData.get("gender"), 12) as Gender;
  const theme = clean(formData.get("theme"), 32) as ThemeId;
  const situation = clean(formData.get("situation"), 80);
  const concern = clean(formData.get("concern"), 200);

  if (
    !nickname ||
    !/^\d{4}-\d{2}-\d{2}$/.test(birthdate) ||
    !genders.includes(gender) ||
    !themes.includes(theme) ||
    !situationOptions[theme].includes(situation)
  ) {
    return NextResponse.redirect(new URL("/fortune?error=invalid", request.url), { status: 303 });
  }

  const generated = generateFortune({
    nickname,
    birthdate,
    gender,
    theme,
    situation,
    concern,
  });

  let record;

  try {
    record = await createFortuneResult({
      nickname,
      birthdate,
      gender,
      theme,
      situation,
      concern: concern || null,
      type_number: generated.typeNumber,
      type_name: generated.typeName,
      free_result: generated.freeResult,
      premium_result: generated.premiumResult,
    });
  } catch (error) {
    console.error(
      "Falling back to cookie fortune result because persistent storage failed:",
      error instanceof Error ? error.message : "Unknown storage error",
    );

    const fallbackPayload = {
      id: crypto.randomUUID(),
      nickname,
      birthdate,
      gender,
      theme,
      situation,
      concern: concern || null,
      created_at: new Date().toISOString(),
    };
    record = createFallbackRecord(fallbackPayload);
    await setFallbackFortuneCookie(fallbackPayload);
  }

  return NextResponse.redirect(new URL(`/result/${record.id}`, request.url), { status: 303 });
}
