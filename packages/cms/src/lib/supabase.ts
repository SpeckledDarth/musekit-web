import { createClient, SupabaseClient } from "@supabase/supabase-js";

export function getSupabaseClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  if (!url || !key) {
    console.warn("Supabase client not available: missing env vars");
    return null;
  }
  return createClient(url, key);
}

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (!url || !key) {
    console.warn("Supabase admin client not available: missing env vars");
    return null;
  }
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export function getBrowserClient() {
  return getSupabaseClient();
}
