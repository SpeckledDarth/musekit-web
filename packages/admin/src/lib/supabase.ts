import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : (null as unknown as SupabaseClient);

export function getSupabaseClient() {
  if (!supabase) {
    console.warn("Supabase client not available: missing env vars");
  }
  return supabase;
}

export function createSupabaseAdmin() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey || !supabaseUrl) {
    console.warn("Supabase admin client not available: missing env vars");
    return null as unknown as SupabaseClient;
  }
  return createClient(supabaseUrl, serviceKey);
}

let _supabaseAdmin: SupabaseClient | null = null;

export function getSupabaseAdmin() {
  if (!_supabaseAdmin) {
    const admin = createSupabaseAdmin();
    if (admin) _supabaseAdmin = admin;
  }
  return _supabaseAdmin as SupabaseClient;
}

export const supabaseAdmin = typeof window === "undefined" ? createSupabaseAdmin() : null;
