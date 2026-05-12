import "server-only";

import { getFallbackFortuneResult } from "./fortune-cookie";
import { getFortuneResult } from "./store";
import type { FortuneResultRecord } from "./types";

export async function getStoredFortuneResult(id: string): Promise<FortuneResultRecord | null> {
  try {
    return await getFortuneResult(id);
  } catch {
    return null;
  }
}

export async function getFortuneResultForRequest(id: string): Promise<FortuneResultRecord | null> {
  return (await getStoredFortuneResult(id)) ?? (await getFallbackFortuneResult(id));
}
