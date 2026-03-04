"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@musekit/design-system";
import { Input } from "@musekit/design-system";
import { Label } from "@musekit/design-system";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@musekit/design-system";
import { useAuth } from "../provider";
import { OAuthButtons } from "./OAuthButtons";

interface LoginFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
  showMagicLink?: boolean;
  featureToggles?: Record<string, boolean>;
}

export function LoginForm({
  onSuccess,
  redirectTo,
  showMagicLink = true,
  featureToggles,
}: LoginFormProps) {
  const { signIn, signInWithMagicLink } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [magicLinkMode, setMagicLinkMode] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (magicLinkMode) {
        const { error: err } = await signInWithMagicLink(email);
        if (err) {
          setError(err.message);
        } else {
          setMagicLinkSent(true);
        }
      } else {
        const { error: err } = await signIn(email, password);
        if (err) {
          setError(err.message);
        } else {
          onSuccess?.();
          if (redirectTo) {
            window.location.href = redirectTo;
          }
        }
      }
    } finally {
      setLoading(false);
    }
  }

  if (magicLinkSent) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Check your email</CardTitle>
          <CardDescription>
            We sent a magic link to <strong>{email}</strong>. Click the link in the email to sign in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              setMagicLinkSent(false);
              setMagicLinkMode(false);
            }}
          >
            Back to login
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>
          {magicLinkMode ? "Enter your email to receive a magic link" : "Sign in to your account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <OAuthButtons featureToggles={featureToggles} />

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300 dark:border-gray-600" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500 dark:bg-gray-900 dark:text-gray-400">or</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          {!magicLinkMode && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="login-password">Password</Label>
                <a href="/reset-password" className="text-xs text-primary-500 hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
          )}

          <Button type="submit" className="w-full" loading={loading}>
            {magicLinkMode ? "Send magic link" : "Sign in"}
          </Button>
        </form>

        {showMagicLink && (
          <button
            type="button"
            className="mt-3 block w-full text-center text-sm text-primary-500 hover:underline"
            onClick={() => {
              setMagicLinkMode(!magicLinkMode);
              setError(null);
            }}
          >
            {magicLinkMode ? "Sign in with password" : "Sign in with magic link"}
          </button>
        )}

        <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-primary-500 hover:underline">
            Sign up
          </a>
        </p>
      </CardContent>
    </Card>
  );
}
