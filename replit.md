# MuseKit + PassivePost — Turborepo Monorepo

## Overview
Enterprise SaaS platform built as a Turborepo monorepo. MuseKit is a reusable SaaS starter template; PassivePost is the first product built on it (AI social media scheduling).

## Architecture
- **Monorepo**: Turborepo with npm workspaces
- **Framework**: Next.js 14.2.18 (App Router) + TypeScript
- **Styling**: Tailwind CSS v3 with shadcn/ui CSS variable system (HSL-based)
- **UI Components**: Custom design system (`@musekit/design-system`) — 24 components
- **Auth**: Supabase Auth + SSR with OAuth (Google, GitHub, Apple, Twitter), Magic Links, password reset
- **Database**: Supabase PostgreSQL with typed schema, query helpers, admin client
- **Billing**: Stripe subscriptions with 3 plan tiers, feature gating, webhook handling
- **Email**: Resend with 7 email templates, template editor, KPI reports
- **Services**: Notifications, webhooks (8 event types), AI provider (xAI/OpenAI/Anthropic), BullMQ background jobs
- **Admin**: Full admin dashboard (users, metrics, audit log, setup wizard, feature toggles, customer service, onboarding)
- **CMS**: Blog system, landing page builder, legal pages, custom pages, marketing tools (waitlist, feedback, announcements, SEO)
- **Affiliate**: Affiliate portal (dashboard, analytics, referrals, earnings, payouts, resources, tools) + admin management
- **Queues**: BullMQ + Upstash Redis
- **Monitoring**: Sentry + Plausible
- **Deployment**: Vercel

## Project Structure
```
musekit/
├── apps/
│   └── web/                    # Next.js web application (port 5000)
│       ├── src/app/            # App Router pages
│       │   ├── (landing)/      # Landing page (/)
│       │   ├── login/          # Login page
│       │   ├── signup/         # Signup page
│       │   ├── reset-password/ # Password reset
│       │   ├── admin/          # Admin dashboard (21 pages)
│       │   ├── blog/           # Blog pages
│       │   ├── affiliate/      # Affiliate portal (11 pages)
│       │   ├── features/       # Feature sub-pages
│       │   ├── legal/          # Legal pages (privacy, terms, etc.)
│       │   └── api/admin/      # Admin API routes (12 endpoints)
│       └── src/components/     # App-level components
├── packages/
│   ├── shared/                 # Types, utilities, config
│   ├── design-system/          # 24 UI components
│   ├── database/               # Supabase clients, typed schema, query helpers
│   ├── auth/                   # AuthProvider, LoginForm, SignupForm, OAuth, middleware
│   ├── billing/                # Stripe plans, checkout, webhooks, feature gating
│   ├── email/                  # Resend client, 7 email templates
│   ├── services/               # Notifications, webhooks, AI provider, BullMQ
│   ├── admin/                  # Admin dashboard components, layouts, pages
│   ├── cms/                    # Blog, landing page builder, legal, marketing tools
│   ├── affiliate/              # Affiliate portal + admin management
│   ├── config-ts/              # Shared TypeScript configurations
│   └── config-eslint/          # Shared ESLint configurations (planned)
├── turbo.json                  # Turborepo pipeline configuration
└── package.json                # Root workspace configuration
```

## Packages

### @musekit/web (apps/web)
Main Next.js application. Dev server on port 5000. Wraps all pages in AuthProvider.

### @musekit/shared (packages/shared)
Shared utilities (cn, formatCurrency, formatDate, slugify, truncate, generateId), TypeScript types, and app configuration.

### @musekit/design-system (packages/design-system)
24 React UI components with CVA variants. Exports design tokens.

### @musekit/database (packages/database)
Supabase browser, server, and admin clients via @supabase/ssr. Typed Database schema with 20 table types. Query helpers.

### @musekit/auth (packages/auth)
Full auth system: AuthProvider with useAuth hook, LoginForm, SignupForm, PasswordResetForm, OAuthButtons, middleware, route guards.

### @musekit/billing (packages/billing)
Stripe integration: 3 plan tiers (Starter $0, Basic $29, Premium $99). Checkout, webhooks, feature gating, product registry.

### @musekit/email (packages/email)
Resend email client. 7 email templates. Template variable replacement. EmailTemplateEditor. KPI reports.

### @musekit/services (packages/services)
Notifications, webhooks (8 event types, HMAC-SHA256), AI provider (xAI/OpenAI/Anthropic), BullMQ background jobs (6 job types).

### @musekit/admin (packages/admin)
Admin dashboard module. Components: AdminLayout, AdminSidebar, AdminHeader, Breadcrumb, SetupSidebar. Pages: overview, users, user detail, metrics, audit log, settings, setup wizard (11 sub-pages), feature toggles, customer service, onboarding. Has own UI components (card, badge, avatar, skeleton, tabs, table, etc.) and hooks (useAdmin). API routes for all admin operations. Uses App Router navigation (usePathname, useParams).

### @musekit/cms (packages/cms)
Content management system. Blog: BlogList, BlogPost, BlogEditor, BlogAdmin. Landing: HeroSection, LogoMarquee, AnimatedCounters, FeatureCards, TestimonialCarousel, ProcessSteps, FAQSection, FounderLetter, ComparisonBars, ScreenshotShowcase, BottomHeroCTA, ImageCollage, ImageTextBlocks, FeatureSubPage, LandingPageBuilder. Legal: LegalPageLayout with 6 page types. Marketing: WaitlistForm, WaitlistAdmin, FeedbackWidget, AnnouncementBar, CookieConsentBanner, SEOHead. Custom Pages: CustomPage, CustomPageEditor.

### @musekit/affiliate (packages/affiliate)
Affiliate program module. Dashboard: AffiliateDashboard with stats, referral info, recent conversions. Pages: analytics, referrals, earnings, payouts, resources, tools, news, messages, settings, support. Admin: AffiliateAdminDashboard, affiliate management, payouts, tiers, reports, settings, fraud detection, notifications, content, API management. Uses mock data for demo mode.

### @musekit/config-ts (packages/config-ts)
Shared tsconfig presets: base.json, nextjs.json, library.json.

## Development
- **Dev server**: `npx turbo dev --filter=@musekit/web` (port 5000)
- **Build**: `npx turbo build`
- **Workflow**: "Start application" runs the dev server

## Key Design Decisions
- Tailwind CSS v3 (not v4) for PostCSS plugin compatibility
- shadcn/ui CSS variable system (HSL-based) for theming (--background, --foreground, --primary, --muted, --card, --border, etc.)
- Dark mode via `class` strategy
- All hosts allowed for Replit proxy compatibility
- Workspace packages use `"main": "./src/index.ts"` (no build step needed for dev)
- All design-system components have "use client" directive for Next.js App Router
- Auth gracefully handles missing Supabase env vars (shows UI without auth functionality)
- All Supabase clients across packages return null when env vars are missing (with console.warn)
- Admin/CMS/Affiliate packages use App Router navigation (usePathname, useParams from next/navigation)
- Admin pages use /admin prefix in all navigation hrefs
- Billing and email packages have internal type stubs

## Integration Status (Session 14)
- **Tier 1 (Foundation)**: shared, design-system, database — INTEGRATED
- **Tier 2 (Core Services)**: auth, billing, email, services — INTEGRATED
- **Tier 3 (Feature Modules)**: admin, cms, affiliate — INTEGRATED
- **Tier 4 (Product Extension)**: passivepost — NOT YET BUILT

## Routes
- `/` — Landing page
- `/login` — Login (email/password, OAuth, magic link)
- `/signup` — Signup
- `/reset-password` — Password reset
- `/blog` — Blog listing
- `/blog/[slug]` — Blog post
- `/features/[slug]` — Feature sub-pages
- `/legal/[slug]` — Legal pages (privacy, terms, etc.)
- `/admin` — Admin overview
- `/admin/users` — User management
- `/admin/users/[id]` — User detail
- `/admin/metrics` — Metrics dashboard
- `/admin/audit-log` — Audit log
- `/admin/settings` — Admin settings
- `/admin/setup` — Setup wizard (11 sub-pages: branding, content, pages, pricing, social, features, api-keys, email, ai, security, passivepost)
- `/admin/feature-toggles` — Feature toggles
- `/admin/customer-service` — Customer service
- `/admin/onboarding` — Onboarding
- `/admin/affiliates/*` — Affiliate admin (12 pages)
- `/affiliate` — Affiliate dashboard
- `/affiliate/*` — Affiliate portal pages (11 pages)
- `/api/admin/*` — Admin API routes (12 endpoints)

## Secrets Needed
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role key
- `STRIPE_SECRET_KEY` — Stripe secret key
- `RESEND_API_KEY` — Resend API key
