"use client";

import { useState } from "react";
import { Button } from "@musekit/design-system";
import { useAuth } from "../provider";
import type { Provider } from "@supabase/supabase-js";

interface OAuthProvider {
  id: Provider;
  name: string;
  icon: string;
  toggleKey: string;
}

const OAUTH_PROVIDERS: OAuthProvider[] = [
  {
    id: "google",
    name: "Google",
    icon: "G",
    toggleKey: "oauth_google",
  },
  {
    id: "github",
    name: "GitHub",
    icon: "GH",
    toggleKey: "oauth_github",
  },
  {
    id: "apple",
    name: "Apple",
    icon: "A",
    toggleKey: "oauth_apple",
  },
  {
    id: "twitter",
    name: "X (Twitter)",
    icon: "X",
    toggleKey: "oauth_twitter",
  },
];

interface OAuthButtonsProps {
  featureToggles?: Record<string, boolean>;
}

export function OAuthButtons({ featureToggles }: OAuthButtonsProps) {
  const { signInWithOAuth } = useAuth();
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const enabledProviders = OAUTH_PROVIDERS.filter((provider) => {
    if (!featureToggles) return true;
    return featureToggles[provider.toggleKey] !== false;
  });

  if (enabledProviders.length === 0) return null;

  async function handleOAuth(provider: OAuthProvider) {
    setLoadingProvider(provider.id);
    try {
      await signInWithOAuth(provider.id);
    } finally {
      setLoadingProvider(null);
    }
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {enabledProviders.map((provider) => (
        <Button
          key={provider.id}
          type="button"
          variant="outline"
          size="sm"
          onClick={() => handleOAuth(provider)}
          disabled={loadingProvider !== null}
        >
          <span className="mr-1 font-bold">{provider.icon}</span>
          {provider.name}
        </Button>
      ))}
    </div>
  );
}
