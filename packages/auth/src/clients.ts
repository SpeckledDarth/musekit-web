import { createBrowserClient as createSupabaseBrowserClient } from "@supabase/ssr";
import { createServerClient as createSupabaseServerClient } from "@supabase/ssr";

export function createBrowserClient() {
  return createSupabaseBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export function createServerClient(cookieStore: {
  get: (name: string) => { value: string } | undefined;
  set: (name: string, value: string, options: Record<string, unknown>) => void;
  remove: (name: string, options: Record<string, unknown>) => void;
}) {
  return createSupabaseServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: Record<string, unknown>) {
          try {
            cookieStore.set(name, value, options);
          } catch {
            // Server component - ignore
          }
        },
        remove(name: string, options: Record<string, unknown>) {
          try {
            cookieStore.remove(name, options);
          } catch {
            // Server component - ignore
          }
        },
      },
    }
  );
}
