import "server-only";

import { Buffer } from "node:buffer";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cachedClient: SupabaseClient | null = null;

const serviceRoleEnvNames = [
  "SUPABASE_SERVICE_ROLE_KEY",
  "SUPABASE_SERVICE_KEY",
  "SUPABASE_SERVICE_ROLE",
];

function cleanEnvValue(name: string, value: string | undefined, removeWhitespace = false): string | undefined {
  if (!value) {
    return undefined;
  }

  let cleaned = value.trim();

  if (cleaned.startsWith(`export ${name}=`)) {
    cleaned = cleaned.slice(`export ${name}=`.length).trim();
  }

  if (cleaned.startsWith(`${name}=`)) {
    cleaned = cleaned.slice(name.length + 1).trim();
  }

  if (
    (cleaned.startsWith('"') && cleaned.endsWith('"')) ||
    (cleaned.startsWith("'") && cleaned.endsWith("'"))
  ) {
    cleaned = cleaned.slice(1, -1).trim();
  }

  if (removeWhitespace) {
    cleaned = cleaned.replace(/\s+/g, "");
  }

  return cleaned || undefined;
}

function cleanUrlEnvValue(name: string, value: string | undefined): string | undefined {
  const cleaned = cleanEnvValue(name, value);
  if (!cleaned) {
    return undefined;
  }

  const urlMatch = cleaned.match(/https?:\/\/[^\s'"<>]+/);
  return (urlMatch?.[0] ?? cleaned).replace(/[),.;]+$/, "");
}

function readServiceRoleKey(): { key?: string; envName?: string } {
  for (const envName of serviceRoleEnvNames) {
    const key = cleanEnvValue(envName, process.env[envName], true);
    if (key) {
      return { key, envName };
    }
  }

  return {};
}

function decodeJwtRole(key: string | undefined): string | null {
  if (!key) {
    return null;
  }

  const [, payload] = key.split(".");
  if (!payload) {
    return null;
  }

  try {
    const decoded = JSON.parse(Buffer.from(payload.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8"));
    return typeof decoded.role === "string" ? decoded.role : null;
  } catch {
    return null;
  }
}

export function getSupabaseConfigStatus() {
  const url = cleanUrlEnvValue("NEXT_PUBLIC_SUPABASE_URL", process.env.NEXT_PUBLIC_SUPABASE_URL);
  const anonKey = cleanEnvValue("NEXT_PUBLIC_SUPABASE_ANON_KEY", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, true);
  const { key, envName } = readServiceRoleKey();
  let urlHost: string | null = null;

  if (url) {
    try {
      urlHost = new URL(url).host;
    } catch {
      urlHost = "invalid-url";
    }
  }

  return {
    hasUrl: Boolean(url),
    hasAnonKey: Boolean(anonKey),
    hasServiceRoleKey: Boolean(key),
    serviceRoleEnvName: envName ?? null,
    serviceKeyRole: decodeJwtRole(key),
    urlHost,
    runtime: process.env.VERCEL ? "vercel" : "local",
  };
}

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = cleanUrlEnvValue("NEXT_PUBLIC_SUPABASE_URL", process.env.NEXT_PUBLIC_SUPABASE_URL);
  const { key } = readServiceRoleKey();

  if (!url || !key) {
    return null;
  }

  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      return null;
    }
  } catch {
    return null;
  }

  if (!cachedClient) {
    cachedClient = createClient(url, key, {
      auth: {
        persistSession: false,
      },
    });
  }

  return cachedClient;
}
