import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cachedClient: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !key) {
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
