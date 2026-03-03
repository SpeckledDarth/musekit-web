export type UserRole = "admin" | "member" | "viewer";

export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  badge?: string;
  children?: NavItem[];
  roles?: UserRole[];
}

export interface AppConfig {
  name: string;
  description: string;
  url: string;
  support: {
    email: string;
  };
  billing: {
    provider: string;
    plans: string[];
  };
  features: Record<string, boolean>;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  owner_id: string;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  plan: string;
  status: "active" | "canceled" | "past_due" | "trialing";
  current_period_end: string;
}

export interface AuditLogEntry {
  id: string;
  user_id: string;
  action: string;
  resource_type: string;
  resource_id: string | null;
  metadata: Record<string, unknown>;
  ip_address: string | null;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  created_at: string;
}

export interface BrandSettings {
  app_name: string;
  logo_url: string | null;
  primary_color: string;
  accent_color: string;
  hero_style: string;
  header_bg: string;
  header_text: string;
  footer_bg: string;
  footer_text: string;
}

export interface FeatureToggle {
  id: string;
  key: string;
  label: string;
  description: string;
  enabled: boolean;
}
