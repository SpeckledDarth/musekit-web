export { createBrowserClient, createServerClient, createAdminClient } from "./clients";
export type { CookieStore } from "./clients";

export { AuthProvider, useAuth } from "./provider";

export { LoginForm } from "./components/LoginForm";
export { SignupForm } from "./components/SignupForm";
export { PasswordResetForm } from "./components/PasswordResetForm";
export { OAuthCallback } from "./components/OAuthCallback";
export { OAuthButtons } from "./components/OAuthButtons";

export { authMiddleware } from "./middleware";

export { withAuth, withRole } from "./guards";
export { requireAuth } from "./server";
