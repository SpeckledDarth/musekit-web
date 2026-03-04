"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@musekit/design-system";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@musekit/design-system";
import { createBrowserClient } from "../clients";

interface OAuthCallbackProps {
  redirectTo?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function OAuthCallback({
  redirectTo = "/",
  onSuccess,
  onError,
}: OAuthCallbackProps) {
  const [error, setError] = useState<string | null>(null);
  const processed = useRef(false);

  useEffect(() => {
    if (processed.current) return;
    processed.current = true;

    async function handleCallback() {
      try {
        const supabase = createBrowserClient();

        const hashParams = new URLSearchParams(
          window.location.hash.substring(1)
        );
        const errorParam =
          hashParams.get("error") ||
          new URLSearchParams(window.location.search).get("error");

        if (errorParam) {
          const description =
            hashParams.get("error_description") ||
            new URLSearchParams(window.location.search).get(
              "error_description"
            ) ||
            "Authentication failed";
          setError(description);
          onError?.(description);
          return;
        }

        const code = new URLSearchParams(window.location.search).get("code");
        if (code) {
          const { error: exchangeError } =
            await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) {
            setError(exchangeError.message);
            onError?.(exchangeError.message);
            return;
          }
        }

        onSuccess?.();
        window.location.href = redirectTo;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "An unexpected error occurred";
        setError(message);
        onError?.(message);
      }
    }

    handleCallback();
  }, [redirectTo, onSuccess, onError]);

  if (error) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Authentication error</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
        <CardContent>
          <a href="/login">
            <Button className="w-full">Back to login</Button>
          </a>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>Signing you in...</CardTitle>
        <CardDescription>Please wait while we complete authentication.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center py-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-primary-600" />
        </div>
      </CardContent>
    </Card>
  );
}
