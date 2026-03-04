import { createServerClient } from "@supabase/ssr";

export async function requireAuth(request: Request): Promise<{
  user: { id: string; email: string; role: string } | null;
  error: string | null;
}> {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = cookieHeader.split(";").map((c) => {
    const [name, ...rest] = c.trim().split("=");
    return { name, value: rest.join("=") };
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookies;
        },
        setAll() {},
      },
    }
  );

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return { user: null, error: "Unauthorized" };
  }

  return {
    user: {
      id: user.id,
      email: user.email || "",
      role: (user.user_metadata?.role as string) || "viewer",
    },
    error: null,
  };
}
