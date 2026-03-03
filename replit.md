# MuseKit + PassivePost — Turborepo Monorepo

## Overview
Enterprise SaaS platform built as a Turborepo monorepo. MuseKit is a reusable SaaS starter template; PassivePost is the first product built on it (AI social media scheduling).

## Architecture
- **Monorepo**: Turborepo with npm workspaces
- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS v3 with CSS variable-based 950-scale color model
- **UI Components**: Custom design system (`@musekit/design-system`)
- **Auth**: Supabase Auth + SSR
- **Database**: Supabase PostgreSQL
- **Billing**: Stripe
- **Email**: Resend
- **Queues**: BullMQ + Upstash Redis
- **Monitoring**: Sentry + Plausible
- **Deployment**: Vercel

## Project Structure
```
musekit/
├── apps/
│   └── web/                    # Next.js web application (port 5000)
│       ├── src/app/            # App Router pages
│       └── src/components/     # App-level components
├── packages/
│   ├── design-system/          # Shared UI components (Button, Card, Badge, etc.)
│   ├── shared/                 # Shared utilities, types, config
│   ├── auth/                   # Supabase auth clients + AuthProvider
│   ├── config-ts/              # Shared TypeScript configurations
│   └── config-eslint/          # Shared ESLint configurations (planned)
├── turbo.json                  # Turborepo pipeline configuration
└── package.json                # Root workspace configuration
```

## Packages

### @musekit/web (apps/web)
Main Next.js application. Landing page with hero, features, pricing sections. Dev server on port 5000.

### @musekit/design-system (packages/design-system)
Reusable UI components: Button (with loading state), Card, Badge, Input, Label, Sidebar, ThemeToggle, Avatar. Uses CVA for variants. Exports design tokens (colors, spacing, radius, shadow).

### @musekit/shared (packages/shared)
Shared utilities (cn, formatCurrency, formatDate, slugify, truncate, generateId), TypeScript types (User, Organization, Subscription, AuditLogEntry, Notification, BrandSettings, FeatureToggle), and app configuration.

### @musekit/auth (packages/auth)
Supabase browser and server clients via @supabase/ssr. React AuthProvider with useAuth hook for sign-in, sign-up, sign-out, and session management.

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

## Planned Packages (to be created)
- `packages/admin/` — Admin dashboard components
- `packages/billing/` — Stripe billing logic
- `packages/affiliate/` — Affiliate program
- `packages/passivepost/` — PassivePost product extension
- `packages/jobs/` — BullMQ job processors
- `packages/email/` — Resend email templates
- `packages/cms/` — Blog/content management
- `packages/notifications/` — In-app notification system
- `packages/webhooks/` — Webhook automation
