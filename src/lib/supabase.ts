import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/lib/database.types";

let supabase: SupabaseClient<Database> | undefined;

export function getSupabaseAdmin() {
  if (supabase) {
    return supabase;
  }

  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be configured.");
  }

  supabase = createClient<Database>(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });

  return supabase;
}

export function throwIfDatabaseError(error: { message: string } | null) {
  if (error) {
    throw new Error(`Supabase request failed: ${error.message}`);
  }
}
