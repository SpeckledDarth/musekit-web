import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const DEFAULT_PUBLIC_ROUTES = ["/", "/login", "/signup", "/api/auth"];

interface MiddlewareOptions {
  publicRoutes?: string[];
  loginPath?: string;
}

export function authMiddleware(options: MiddlewareOptions = {}) {
  const { publicRoutes = DEFAULT_PUBLIC_ROUTES, loginPath = "/login" } = options;

  return async function middleware(request: NextRequest) {
    const response = NextResponse.next({
      request: { headers: request.headers },
    });

    const pathname = request.nextUrl.pathname;

    const isPublic = publicRoutes.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`)
    );

    if (isPublic) {
      return response;
    }

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const redirectUrl = new URL(loginPath, request.url);
      redirectUrl.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(redirectUrl);
    }

    return response;
  };
}
