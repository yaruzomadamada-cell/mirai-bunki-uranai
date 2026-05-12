import "server-only";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { getSupabaseAdmin, getSupabaseConfigStatus } from "./supabase-admin";
import type { FortuneResultRecord, PaymentRecord } from "./types";

const dataDir = path.join(process.cwd(), "data");
const localStoreFile = path.join(dataDir, "fortune-results.json");

type LocalStore = {
  fortune_results: FortuneResultRecord[];
  payments: (PaymentRecord & { id: string; created_at: string })[];
};

async function readLocalStore(): Promise<LocalStore> {
  try {
    const raw = await readFile(localStoreFile, "utf8");
    return JSON.parse(raw) as LocalStore;
  } catch {
    return { fortune_results: [], payments: [] };
  }
}

async function writeLocalStore(store: LocalStore): Promise<void> {
  await mkdir(dataDir, { recursive: true });
  await writeFile(localStoreFile, JSON.stringify(store, null, 2), "utf8");
}

function canUseLocalStore(): boolean {
  return !process.env.VERCEL;
}

function createSupabaseUnavailableError(operation: string): Error {
  return new Error(`${operation}: Supabase admin client is unavailable. ${JSON.stringify(getSupabaseConfigStatus())}`);
}

export async function createFortuneResult(
  record: Omit<FortuneResultRecord, "id" | "created_at" | "paid" | "stripe_session_id">,
): Promise<FortuneResultRecord> {
  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { data, error } = await supabase
      .from("fortune_results")
      .insert({
        ...record,
        paid: false,
      })
      .select("*")
      .single();

    if (error) {
      throw new Error(
        `Supabase insert fortune_results failed: ${error.message}. ${JSON.stringify(getSupabaseConfigStatus())}`,
      );
    }

    return data as FortuneResultRecord;
  }

  if (!canUseLocalStore()) {
    throw createSupabaseUnavailableError("createFortuneResult");
  }

  const store = await readLocalStore();
  const created: FortuneResultRecord = {
    ...record,
    id: crypto.randomUUID(),
    paid: false,
    stripe_session_id: null,
    created_at: new Date().toISOString(),
  };
  store.fortune_results.push(created);
  await writeLocalStore(store);
  return created;
}

export async function getFortuneResult(id: string): Promise<FortuneResultRecord | null> {
  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { data, error } = await supabase.from("fortune_results").select("*").eq("id", id).single();
    if (error) {
      return null;
    }
    return data as FortuneResultRecord;
  }

  if (!canUseLocalStore()) {
    throw createSupabaseUnavailableError("getFortuneResult");
  }

  const store = await readLocalStore();
  return store.fortune_results.find((item) => item.id === id) ?? null;
}

export async function setCheckoutSession(resultId: string, sessionId: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { error } = await supabase
      .from("fortune_results")
      .update({ stripe_session_id: sessionId })
      .eq("id", resultId);
    if (error) {
      throw new Error(error.message);
    }
    return;
  }

  if (!canUseLocalStore()) {
    throw createSupabaseUnavailableError("setCheckoutSession");
  }

  const store = await readLocalStore();
  store.fortune_results = store.fortune_results.map((item) =>
    item.id === resultId ? { ...item, stripe_session_id: sessionId } : item,
  );
  await writeLocalStore(store);
}

export async function markResultPaid(resultId: string, sessionId?: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (supabase) {
    const update: Partial<FortuneResultRecord> = { paid: true };
    if (sessionId) {
      update.stripe_session_id = sessionId;
    }
    const { error } = await supabase.from("fortune_results").update(update).eq("id", resultId);
    if (error) {
      throw new Error(error.message);
    }
    return;
  }

  if (!canUseLocalStore()) {
    throw createSupabaseUnavailableError("markResultPaid");
  }

  const store = await readLocalStore();
  store.fortune_results = store.fortune_results.map((item) =>
    item.id === resultId ? { ...item, paid: true, stripe_session_id: sessionId ?? item.stripe_session_id } : item,
  );
  await writeLocalStore(store);
}

export async function insertPayment(payment: PaymentRecord): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { error } = await supabase.from("payments").insert(payment);
    if (error) {
      throw new Error(error.message);
    }
    return;
  }

  if (!canUseLocalStore()) {
    throw createSupabaseUnavailableError("insertPayment");
  }

  const store = await readLocalStore();
  store.payments.push({
    ...payment,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  });
  await writeLocalStore(store);
}
