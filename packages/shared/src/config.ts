import type { AppConfig } from "./types";

export const APP_CONFIG: AppConfig = {
  name: "MuseKit",
  description: "A SaaS Starter Template for Rapid Product Launch",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:5000",
  support: {
    email: "support@musekit.io",
  },
  billing: {
    provider: "stripe",
    plans: ["starter", "basic", "premium"],
  },
  features: {
    auth: true,
    billing: true,
    teams: true,
    admin: true,
    ai: true,
    webhooks: true,
    affiliate: true,
    notifications: true,
  },
};
