# MuseKit + PassivePost — Turborepo Monorepo

## Overview
Enterprise SaaS platform built as a Turborepo monorepo. MuseKit is a reusable SaaS starter template; PassivePost is the first product built on it (AI social media scheduling).

## Architecture
- **Monorepo**: Turborepo with npm workspaces
- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS v3 with CSS variable-based 950-scale color model
- **UI Components**: Custom design system (`@musekit/design-system`) — 24 components
- **Auth**: Supabase Auth + SSR with OAuth (Google, GitHub, Apple, Twitter), Magic Links, password reset
- **Database**: Supabase PostgreSQL with typed schema, query helpers, admin client
- **Billing**: Stripe subscriptions with 3 plan tiers, feature gating, webhook handling
- **Email**: Resend with 7 email templates, template editor, KPI reports
- **Services**: Notifications, webhooks (8 event types), AI provider (xAI/OpenAI/Anthropic), BullMQ background jobs
- **Queues**: BullMQ + Upstash Redis
- **Monitoring**: Sentry + Plausible
- **Deployment**: Vercel

## Project Structure
```
musekit/
├── apps/
│   └── web/                    # Next.js web application (port 5000)
│       ├── src/app/            # App Router pages (/, /login, /signup, /reset-password)
│       └── src/components/     # App-level components (header, hero, features, pricing, footer, providers)
├── packages/
│   ├── shared/                 # Types, utilities, config (cn, formatCurrency, slugify, etc.)
│   ├── design-system/          # 24 UI components (Button, Card, Badge, Dialog, Tabs, etc.)
│   ├── database/               # Supabase clients (browser, server, admin), typed schema, query helpers
│   ├── auth/                   # AuthProvider, LoginForm, SignupForm, PasswordResetForm, OAuthButtons, middleware
│   ├── billing/                # Stripe plans, checkout, webhooks, feature gating, product registry
│   ├── email/                  # Resend client, 7 email templates, template editor, reports
│   ├── services/               # Notifications, webhooks, AI provider, BullMQ background jobs
│   ├── config-ts/              # Shared TypeScript configurations
│   └── config-eslint/          # Shared ESLint configurations (planned)
├── turbo.json                  # Turborepo pipeline configuration
└── package.json                # Root workspace configuration
```

## Packages

### @musekit/web (apps/web)
Main Next.js application. Pages: landing (hero, features, pricing), login, signup, reset-password. Dev server on port 5000. Wraps all pages in AuthProvider.

### @musekit/shared (packages/shared)
Shared utilities (cn, formatCurrency, formatDate, slugify, truncate, generateId), TypeScript types (User, Organization, TeamMember, Subscription, AuditLogEntry, Notification, BrandSettings, FeatureToggle, NavItem, AppConfig), and app configuration.

### @musekit/design-system (packages/design-system)
24 React UI components: Button, Card, Badge, Input, Label, Select, Switch, Textarea, Checkbox, Dialog, Dropdown, Popover, Sheet, Sidebar, Tabs, Table, Toast, Alert, Avatar, Progress, Skeleton, Separator, Tooltip, ThemeToggle. Uses CVA for variants. Exports design tokens (colors, spacing, radius, shadow). All components have "use client" directive for Next.js App Router compatibility.

### @musekit/database (packages/database)
Supabase browser, server, and admin clients via @supabase/ssr. Typed Database schema with 20 table types (profiles, organizations, team_members, subscriptions, audit_logs, notifications, brand_settings, feature_toggles, etc.). Query helpers (getUserById, getOrgMembers, getSubscription, etc.).

### @musekit/auth (packages/auth)
Full auth system: AuthProvider with useAuth hook (signIn, signUp, signOut, signInWithOAuth, signInWithMagicLink, resetPassword, updatePassword). Components: LoginForm, SignupForm, PasswordResetForm, OAuthButtons, OAuthCallback. Auth middleware and route guards (withAuth, withRole, requireAuth). Depends on @musekit/database and @musekit/design-system.

### @musekit/billing (packages/billing)
Stripe integration: 3 plan tiers (Starter $0, Basic $29, Premium $99). Checkout sessions, customer portal, webhook handler (checkout.completed, subscription.updated/deleted, invoice events). Feature gating (checkFeatureAccess, isWithinLimit, requirePlan). Product registry for multi-product tier resolution. Subscription helpers (isActive, isPastDue, isCanceled, etc.). Has internal shared/database type stubs.

### @musekit/email (packages/email)
Resend email client. 7 email templates: Welcome, Verification, PasswordReset, SubscriptionConfirm, SubscriptionCanceled, TeamInvitation, KPIReport. Template variable replacement system. EmailTemplateEditor component. KPI report generation and scheduling. Has internal Supabase client for brand settings.

### @musekit/services (packages/services)
Backend services bundle. Notifications: NotificationBell component, server-side creation, polling. Webhooks: 8 event types, HMAC-SHA256 signing, retry logic. AI Provider: pluggable (xAI/OpenAI/Anthropic), HelpWidget chatbot. Background Jobs: BullMQ with 6 job types (email, webhook, report, metrics, alert, token rotation), rate limiter. Depends on @musekit/database.

### @musekit/config-ts (packages/config-ts)
Shared tsconfig presets: base.json, nextjs.json, library.json.

## Development
- **Dev server**: `npx turbo dev --filter=@musekit/web` (port 5000)
- **Build**: `npx turbo build`
- **Workflow**: "Start application" runs the dev server

## Key Design Decisions
- Tailwind CSS v3 (not v4) for PostCSS plugin compatibility
- CSS variables for primary color palette (admin-configurable)
- Dark mode via `class` strategy
- All hosts allowed for Replit proxy compatibility
- Workspace packages use `"main": "./src/index.ts"` (no build step needed for dev)
- All design-system components have "use client" directive for Next.js App Router
- Auth gracefully handles missing Supabase env vars (shows UI without auth functionality)
- Billing and email packages have internal type stubs (not dependent on workspace @musekit/shared)

## Integration Status (Session 9)
- **Tier 1 (Foundation)**: shared, design-system, database — INTEGRATED
- **Tier 2 (Core Services)**: auth, billing, email, services — INTEGRATED
- **Tier 3 (Feature Modules)**: admin, cms, affiliate — NOT YET BUILT
- **Tier 4 (Product Extension)**: passivepost — NOT YET BUILT

## Planned Packages (to be created)
- `packages/admin/` — Admin dashboard components
- `packages/affiliate/` — Affiliate program
- `packages/passivepost/` — PassivePost product extension
- `packages/cms/` — Blog/content management
