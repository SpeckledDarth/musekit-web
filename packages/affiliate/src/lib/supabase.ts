import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : (null as unknown as SupabaseClient);

export function getServiceClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (!serviceKey || !supabaseUrl) {
    console.warn("Supabase service client not available: missing env vars");
    return null as unknown as SupabaseClient;
  }
  return createClient(supabaseUrl, serviceKey);
}
