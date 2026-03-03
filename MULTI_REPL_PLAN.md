# MuseKit + PassivePost — Multi-Repl Development Plan

> **Purpose:** Read-only reference document. No code changes until you approve.  
> **Created:** March 3, 2026

---

## Table of Contents

1. [Why Multi-Repl?](#why-multi-repl)
2. [Architecture Overview](#architecture-overview)
3. [All 12 Repls — Detailed Breakdown](#all-12-repls--detailed-breakdown)
4. [Build Order — Session by Session](#build-order--session-by-session)
5. [GitHub Setup — Step by Step](#github-setup--step-by-step)
6. [How Modules Connect](#how-modules-connect)
7. [Keeping Documents Aligned](#keeping-documents-aligned)
8. [Migration to Production](#migration-to-production)
9. [Cost and Time Estimates](#cost-and-time-estimates)
10. [Summary](#summary)

---

## Why Multi-Repl?

### The Problem with One Big Repl

Your original app was ~25,000 lines in a single codebase. When a CSS change in the Admin Affiliate section caused cascading corruption, recovery was impossible because:

- Sessions couldn't hold 25,000 lines of context
- Sessions didn't follow documentation — they made assumptions and guessed
- Sessions ran out of stamina mid-task and silently quit, leaving half-finished work
- A change in one area bled into every other area
- After the crash, no session could remember enough to recover
- You had zero visibility into what any session was actually doing or when it started/stopped

### What Multi-Repl Solves

Each module lives in its **own Repl with its own GitHub repo**. A session working in one Repl literally cannot see or touch code in another Repl.

| Risk | Single Repl | Multi-Repl |
|------|------------|------------|
| Session damages unrelated code | **Possible** — all files visible | **Impossible** — other code is in other Repls |
| CSS change breaks everything | **Likely** — styles are global | **Contained** — each module's styles are isolated |
| Session runs out of stamina | Leaves half-finished work across 25K lines | **Contained** — worst case, one small module is incomplete |
| Recovery after a crash | **Nearly impossible** (too much context to rebuild) | **Easy** — roll back one small Repl, everything else untouched |
| Session ignores documentation | Causes widespread damage | **Limited damage** — only one module at risk |
| You need to verify work | Must test entire app, hard to know what changed | **Test one module** — clear pass/fail per Repl |
| Context window overload | Session can't read 25K lines, makes assumptions | **Session sees only 1,500-3,000 lines** — can fully understand it |

---

## Architecture Overview

### Three Phases

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  PHASE 1: DEVELOPMENT (Separate Repls — total isolation)             │
│                                                                      │
│  Each module is built in its own Repl.                                │
│  Each Repl has its own GitHub repo.                                   │
│  Sessions can only see ~1,500-3,000 lines.                           │
│  If a session goes rogue, blast radius = one module only.            │
│                                                                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐               │
│  │ shared   │ │ design-  │ │ database │ │  auth    │  ... 11 total  │
│  │          │ │ system   │ │          │ │          │               │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘               │
│                                                                      │
└──────────────────────┬───────────────────────────────────────────────┘
                       │
                       │  Module is finished and tested?
                       │  Copy it into the monorepo.
                       ▼
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  PHASE 2: INTEGRATION (One Repl — Turborepo monorepo)                │
│                                                                      │
│  Finished, tested modules are copied into the main monorepo.         │
│  The Next.js app imports from all packages via workspaces.           │
│  Integration testing happens here — does everything work together?   │
│  This is a mechanical process, not a creative one.                   │
│                                                                      │
│  master-saas-muse/                                                   │
│  ├── apps/web/           ← Next.js app                               │
│  ├── packages/shared/    ← copied from musekit-shared Repl           │
│  ├── packages/auth/      ← copied from musekit-auth Repl             │
│  ├── packages/admin/     ← copied from musekit-admin Repl            │
│  └── ...                                                             │
│                                                                      │
└──────────────────────┬───────────────────────────────────────────────┘
                       │
                       │  App is complete and tested?
                       │  Deploy.
                       ▼
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  PHASE 3: PRODUCTION (Vercel + Supabase + Stripe)                    │
│                                                                      │
│  The monorepo deploys to Vercel.                                     │
│  Supabase handles database and auth.                                 │
│  Stripe handles billing.                                             │
│  Standard Next.js deployment — nothing custom.                       │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

---

## All 12 Repls — Detailed Breakdown

### Dependency Tiers

Modules are organized into tiers based on what they depend on. You build from the bottom up — Tier 1 first, then Tier 2, and so on. A module can only depend on modules in a lower tier.

```
Tier 4: Product Extension
  └── passivepost (depends on shared, database, design-system, auth, billing, services)

Tier 3: Feature Modules
  ├── admin      (depends on shared, database, design-system, auth, billing)
  ├── cms        (depends on shared, database, design-system)
  └── affiliate  (depends on shared, database, design-system, billing)

Tier 2: Core Services
  ├── auth       (depends on shared, database, design-system)
  ├── billing    (depends on shared, database)
  ├── email      (depends on shared, database, design-system)
  └── services   (depends on shared, database)

Tier 1: Foundation (no dependencies on other modules)
  ├── shared     (depends on nothing)
  ├── design-system (depends on shared)
  └── database   (depends on shared)
```

---

### Tier 1: Foundation

---

#### Repl 1: `musekit-shared`

**What it is:** The shared library every other module imports. The absolute bottom of the dependency stack.

**Contains:**
- TypeScript type definitions for the entire app:
  - User, Organization, Subscription, AuditLogEntry, Notification
  - BrandSettings, FeatureToggle, NavItem, AppConfig
  - All other shared interfaces
- Utility functions:
  - `cn()` — Tailwind class merger
  - `formatCurrency()` — Money formatting
  - `formatDate()` — Date formatting
  - `slugify()` — URL slug generation
  - `truncate()` — Text truncation
  - `generateId()` — UUID generation
- App constants and configuration
- Role definitions and permission maps

**Estimated size:** 500-800 lines  
**Dependencies:** None  
**GitHub repo:** `musekit-shared`  
**Who depends on this:** Every other module

---

#### Repl 2: `musekit-design-system`

**What it is:** All reusable UI components and visual design tokens. This is the visual foundation of the entire app.

**Contains:**
- 30+ React components:
  - **Layout:** Sidebar, SidebarItem, SidebarSection, Sheet, Separator
  - **Forms:** Button, Input, Label, Select, Switch, Textarea, Checkbox, RadioGroup
  - **Display:** Card, Badge, Avatar, Table, Tabs, Tooltip
  - **Feedback:** Toast, Alert, Progress, Skeleton
  - **Overlay:** Dialog, Dropdown, Popover, Command
  - **Theming:** ThemeToggle
- Design tokens:
  - Colors (primary 950-scale, gray, success, warning, error, info)
  - Spacing, border radius, shadows
- Tailwind CSS preset configuration
- The 950-scale CSS variable system (`--primary-50` through `--primary-950`)
- Interactive state utilities (`hover-elevate`, `active-elevate-2`)
- Dark mode support across all components

**Estimated size:** 2,500-3,000 lines  
**Dependencies:** musekit-shared  
**GitHub repo:** `musekit-design-system`  
**Who depends on this:** auth, email, admin, cms, affiliate, passivepost, web

---

#### Repl 3: `musekit-database`

**What it is:** Everything related to Supabase and the database layer.

**Contains:**
- Supabase client wrapper (browser + server)
- TypeScript types matching the database schema
- Migration SQL files for all tables:
  - **Core tables:** profiles, organizations, team_members, team_invitations, subscriptions, audit_logs, notifications, api_keys, content_posts, waitlist, feedback, webhook_configs, brand_settings, feature_toggles, email_templates
  - **Extension tables:** social_posts, social_accounts, brand_preferences, social_analytics, post_queue
- Row Level Security (RLS) policies
- Seed data scripts (default feature toggles, sample data for development)
- Reusable query helpers (getUserById, getOrgMembers, etc.)

**Estimated size:** 1,500-2,000 lines  
**Dependencies:** musekit-shared  
**GitHub repo:** `musekit-database`  
**Who depends on this:** auth, billing, email, services, admin, cms, affiliate, passivepost, web

---

### Tier 2: Core Services

---

#### Repl 4: `musekit-auth`

**What it is:** The complete authentication and authorization system.

**Contains:**
- Supabase auth clients (browser + server via @supabase/ssr)
- React AuthProvider context + `useAuth()` hook
- Page components:
  - Login form (email/password + OAuth buttons)
  - Signup form (with email verification)
  - Password reset flow
  - Magic Link login
- OAuth flow handling for 5 providers:
  - Google, GitHub, Apple, Twitter/X, Magic Link
- Next.js middleware for protected routes
- `withAuth()` higher-order component for page protection
- SSO/SAML enterprise auth (domain-based detection)
- Role-based access control (admin, member, viewer)
- Admin-toggleable OAuth providers (reads feature toggles from database)

**Estimated size:** 1,500-2,000 lines  
**Dependencies:** musekit-shared, musekit-database, musekit-design-system  
**GitHub repo:** `musekit-auth`  
**Who depends on this:** admin, passivepost, web

---

#### Repl 5: `musekit-billing`

**What it is:** Stripe subscription billing — everything related to payments.

**Contains:**
- Stripe client integration
- Plan/tier definitions:
  - Starter ($0/mo), Basic ($29/mo), Premium ($99/mo)
  - Feature limits per tier
- Checkout flow (create checkout session)
- Customer portal redirect (manage subscription)
- Stripe webhook handler:
  - `checkout.session.completed`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - `invoice.payment_succeeded`
  - `invoice.payment_failed`
- Feature gating logic (check user's plan, enforce limits)
- Product Registry for multi-product tier resolution
- Subscription status helpers (isActive, isPastDue, isCanceled, etc.)

**Estimated size:** 1,500-2,000 lines  
**Dependencies:** musekit-shared, musekit-database  
**GitHub repo:** `musekit-billing`  
**Who depends on this:** admin, affiliate, passivepost, web

---

#### Repl 6: `musekit-email`

**What it is:** Email system powered by Resend.

**Contains:**
- Resend client integration
- Email template definitions:
  - Welcome email
  - Email verification
  - Password reset
  - Subscription confirmation
  - Subscription cancellation
  - Team invitation
  - KPI summary report (weekly/monthly)
- Template editor component (admin UI with live preview)
- Test email sending (admin can send test emails)
- Scheduled report delivery logic
- Template variable replacement system

**Estimated size:** 1,000-1,500 lines  
**Dependencies:** musekit-shared, musekit-database, musekit-design-system  
**GitHub repo:** `musekit-email`  
**Who depends on this:** admin, web

---

#### Repl 7: `musekit-services`

**What it is:** Backend services bundle — notifications, webhooks, AI, and background jobs.

**Contains:**

**Notifications subsystem:**
- Bell icon component with unread count badge
- Notification popover with type-specific icons
- Auto-polling for new notifications
- Mark all as read functionality
- Server-side notification creation utility

**Webhooks subsystem:**
- 8 event types: feedback submitted, waitlist entry, subscription created/updated/canceled, team invitation sent, team member joined, contact form submitted
- HMAC-SHA256 payload signing for security
- Fire-and-forget delivery with retry logic
- Admin-configurable URL, secret, and per-event toggles

**AI Provider subsystem:**
- Pluggable abstraction supporting xAI Grok, OpenAI, Anthropic
- Admin-configurable: provider, model, temperature, max tokens, system prompt
- Chat completion API with streaming support
- Help Widget (AI-powered support chatbot with NPS collection)

**Background Jobs subsystem (BullMQ + Upstash Redis):**
- 6 core job types: email delivery, webhook retry, report generation, metrics report, metrics alert, API token rotation
- Rate limiting with sliding window algorithm
- In-memory fallback when Redis is unavailable

**Estimated size:** 2,000-2,500 lines  
**Dependencies:** musekit-shared, musekit-database  
**GitHub repo:** `musekit-services`  
**Who depends on this:** admin, passivepost, web

---

### Tier 3: Feature Modules

---

#### Repl 8: `musekit-admin`

**What it is:** The entire admin dashboard. This is the biggest module and will be built across 2 sessions.

**Contains:**

**Admin layout:**
- Sidebar navigation with collapsible sections
- Admin header with search and user menu
- Breadcrumb navigation

**Overview page:**
- User analytics and high-level metrics
- Quick action cards

**User management:**
- User list with search, filter, pagination
- User detail page (profile, subscription, activity, notes)
- Team members view
- Admin notes system for customer service tracking
- User impersonation (30-minute sessions with audit logging)

**Metrics dashboard:**
- 10 KPI cards: Total Users, New Users (30d), Active Subscriptions, MRR, ARPU, LTV, Churn Rate, Conversion Rate, Feedback Count, Waitlist Count
- NPS Score card with color-coded Net Promoter Score
- User Growth line chart
- Revenue Growth line chart
- Configurable alert thresholds for churn rate and user growth
- "Email Report" and "Check Alerts" action buttons
- Scheduled weekly/monthly KPI summary emails

**Setup Dashboard (11 sub-pages):**
1. Branding — logo, colors, app name, hero styles, header/footer styling with color pickers and opacity sliders
2. Content — homepage sections with drag-and-drop ordering, per-section background colors
3. Pages — about, contact, terms, privacy, custom pages
4. Pricing — Stripe integration, plan editor
5. Social Links — social media profile URLs
6. Features & Integrations — auth toggles, AI enable/disable, webhook config, security settings, compliance settings
7. API Keys & Integrations — centralized key management with collapsible groups, status indicators, format validation
8. Email Templates — editor with live preview
9. AI/Support — chatbot configuration, system prompt, fallback email
10. Security/Compliance — SSO/SAML, MFA settings, password requirements
11. PassivePost Settings — social platform configuration

**Other admin features:**
- Feature toggles management
- Audit log viewer (filterable, searchable)
- Customer service tools (subscription tracking, invoices)
- Discount codes management
- Onboarding funnel analytics

**Estimated size:** 4,000-5,000 lines (2 sessions)  
**Dependencies:** musekit-shared, musekit-database, musekit-design-system, musekit-auth, musekit-billing  
**GitHub repo:** `musekit-admin`  
**Who depends on this:** web

---

#### Repl 9: `musekit-cms`

**What it is:** Content management and marketing pages.

**Contains:**

**Blog/Changelog system:**
- Markdown editor with live preview
- Public and draft post management
- Admin CRUD interface
- Category/tag system

**Custom pages:**
- Dynamic page builder
- About, contact, and custom pages

**14 landing page sections (all configurable from admin):**
1. Hero section (6 styles: full-width, split, video, pattern, floating mockup, photo collage)
2. Logo marquee (scrolling partner/client logos)
3. Animated counters (key metrics with counting animation)
4. Feature cards (icons and descriptions grid)
5. Testimonial carousel (customer stories)
6. Process steps (numbered how-it-works sequence)
7. FAQ section (expandable answers)
8. Founder Letter (portrait and signature)
9. Comparison Bars (animated entrance)
10. Product Screenshot Showcase (layered backgrounds)
11. Bottom Hero CTA (closing call-to-action)
12. Image Collage (fan-style overlapping with hover animation)
13. Image + Text alternating blocks
14. Feature Sub-Page System (`/features/[slug]`)

**9 legal pages with dynamic variable replacement:**
- Terms of Service, Privacy Policy, Cookie Policy, Acceptable Use, Accessibility, Data Handling, DMCA, AI Data Usage, Security Policy

**Marketing tools:**
- SEO optimization with auto-generated sitemap and robots.txt
- Waitlist mode with CSV export
- Feedback widget with NPS rating (0-10)
- Announcement bar with admin controls
- Cookie consent banner

**Estimated size:** 2,000-2,500 lines  
**Dependencies:** musekit-shared, musekit-database, musekit-design-system  
**GitHub repo:** `musekit-cms`  
**Who depends on this:** web

---

#### Repl 10: `musekit-affiliate`

**What it is:** The complete affiliate/referral program.

**Contains:**

**Affiliate user dashboard:**
- Dashboard overview
- Analytics (clicks, conversions, revenue)
- Referrals list
- Earnings history
- Payouts (pending, completed)
- Resources (marketing materials)
- Tools (link generator, banners)
- News/updates
- Messages
- Account settings
- Support

**Admin affiliate management:**
- Applications (review, approve, reject)
- Settings (commission rates, cookie duration)
- Assets (marketing materials management)
- Milestones (achievement definitions)
- Tiers (bronze, silver, gold, etc.)
- Broadcasts (send messages to affiliates)
- Members (active affiliate list)
- Networks (affiliate network integrations)
- Contests (promotional campaigns)
- Payout Runs (batch payment processing)
- Discount codes

**Estimated size:** 1,500-2,000 lines  
**Dependencies:** musekit-shared, musekit-database, musekit-design-system, musekit-billing  
**GitHub repo:** `musekit-affiliate`  
**Who depends on this:** web

---

### Tier 4: Product Extension

---

#### Repl 11: `musekit-passivepost`

**What it is:** The PassivePost AI social media scheduling product. Built across 2 sessions.

**Contains:**

**10-page social dashboard with dedicated sidebar:**
1. **Posts** — overview with status filters (draft, scheduled, published, failed), bulk actions
2. **Queue** — post queue management, drag-and-drop reordering
3. **Calendar** — monthly/weekly calendar view of scheduled posts
4. **Blog Flywheel** — repurpose blog content into social posts
5. **Compose** — AI post generator with 15 niche-specific prompt templates, platform-specific formatting, media attachment
6. **Articles** — content library management
7. **Autopilot** — automated posting rules and schedules
8. **Engagement** — analytics dashboard (likes, shares, comments, reach)
9. **Content Intelligence / Distribution Intelligence** — AI-powered content recommendations, optimal posting times, platform performance comparison
10. **Revenue & ROI / Lead Tracker** — track social media's impact on revenue, lead attribution

**Subscription system:**
- 3 tiers: Starter (free, 3 accounts, 30 posts/mo), Basic ($29, 10 accounts, 300 posts/mo), Premium ($99, unlimited)
- Upgrade banners at 80%+ usage
- Feature gating per tier

**Platform integrations (10 platforms):**
- Twitter/X, LinkedIn, Instagram, YouTube, Facebook, TikTok, Reddit, Pinterest, Snapchat, Discord
- OAuth connection flows for each
- Connected accounts management page with validate/reconnect

**Brand preferences:**
- Business niche, brand tone, target audience, location/market
- Posting goals, posting frequency
- Sample content URLs
- AI Voice Fine-Tuner (paste writing samples → analyze voice)

**Other features:**
- Approvals workflow (review AI-generated posts before publishing)
- Settings page (auto-approve AI posts, default post status, timezone, quiet hours, notification preferences)
- Security settings
- 4 BullMQ social job types (social posting, platform sync, analytics fetching, automated queue processing)

**Estimated size:** 4,000-5,000 lines (2 sessions)  
**Dependencies:** musekit-shared, musekit-database, musekit-design-system, musekit-auth, musekit-billing, musekit-services  
**GitHub repo:** `musekit-passivepost`  
**Who depends on this:** web

---

### Integration Repl

---

#### Repl 12: `musekit-web` (This Repl)

**What it is:** The main Next.js application that pulls everything together.

**Contains:**
- Next.js App Router page definitions and routing
- API routes (40+ endpoints)
- Turborepo configuration linking all packages as workspaces
- Landing page (already built)
- Top-level layout (header, footer)
- Environment variable configuration
- Middleware chain (auth, rate limiting)
- Error boundary and 404 pages

**Estimated size:** 2,000-3,000 lines  
**Dependencies:** All packages  
**GitHub repo:** `master-saas-muse` (already exists)

---

## Build Order — Session by Session

### Phase 1: Foundation (Sessions 2-4)

| # | Repl | What Gets Built | Dependencies Needed |
|---|------|-----------------|---------------------|
| 1 | ✅ `musekit-web` | Monorepo foundation, landing page | — |
| 2 | `musekit-shared` | Types, utilities, constants, config | None |
| 3 | `musekit-design-system` | 30+ UI components, tokens, Tailwind preset | shared (from session 2) |
| 4 | `musekit-database` | Supabase client, schema, migrations, seed, RLS | shared (from session 2) |

**After Phase 1:** You have the type system, all UI components, and the database layer. These are the building blocks for everything else.

---

### Phase 2: Core Services (Sessions 5-8)

| # | Repl | What Gets Built | Dependencies Needed |
|---|------|-----------------|---------------------|
| 5 | `musekit-auth` | Login/signup, OAuth, middleware, protected routes | shared, database, design-system |
| 6 | `musekit-billing` | Stripe subscriptions, checkout, webhooks, feature gating | shared, database |
| 7 | `musekit-email` | Resend templates, editor, preview, scheduled reports | shared, database, design-system |
| 8 | `musekit-services` | Notifications, webhooks, AI provider, BullMQ, rate limiting | shared, database |

**After Phase 2:** You have auth, payments, email, and all backend services working independently.

---

### Phase 3: First Integration Checkpoint (Session 9)

| # | Repl | What Gets Built |
|---|------|-----------------|
| 9 | `musekit-web` | Pull all Tier 1 + Tier 2 modules into the monorepo. Wire routing. Verify everything works together. Run integration tests. |

**After Phase 3:** You have a running app with auth, billing, and core services — even without the dashboards, the infrastructure works end-to-end.

---

### Phase 4: Feature Modules (Sessions 10-14)

| # | Repl | What Gets Built | Dependencies Needed |
|---|------|-----------------|---------------------|
| 10 | `musekit-admin` (part 1) | Admin layout, overview, user management, metrics dashboard | shared, database, design-system, auth, billing |
| 11 | `musekit-admin` (part 2) | Setup dashboard (11 pages), feature toggles, audit logs, impersonation | (continues from session 10) |
| 12 | `musekit-cms` | Blog, custom pages, 14 landing sections, 9 legal pages, SEO | shared, database, design-system |
| 13 | `musekit-affiliate` | Affiliate program, referrals, earnings, payouts, admin management | shared, database, design-system, billing |
| 14 | `musekit-web` | **Integration checkpoint 2** — pull Tier 3 into monorepo, verify | All Tier 3 modules |

**After Phase 4:** You have the full MuseKit core — admin dashboard, CMS, affiliate system, all integrated.

---

### Phase 5: PassivePost (Sessions 15-17)

| # | Repl | What Gets Built | Dependencies Needed |
|---|------|-----------------|---------------------|
| 15 | `musekit-passivepost` (part 1) | Dashboard layout, compose, queue, calendar, brand preferences | shared, database, design-system, auth, billing, services |
| 16 | `musekit-passivepost` (part 2) | Analytics, intelligence, autopilot, social OAuth, 4 job types | (continues from session 15) |
| 17 | `musekit-web` | **Final integration** — pull PassivePost into monorepo, full E2E testing, polish | All modules complete |

**After Phase 5:** The complete app is assembled and tested.

---

### Phase 6: Production (Session 18)

| # | Repl | What Gets Built |
|---|------|-----------------|
| 18 | `musekit-web` | Vercel deployment config, production Supabase, Stripe live keys, Sentry, Plausible, custom domain |

**After Phase 6:** Live in production.

---

## GitHub Setup — Step by Step

### Step 1: Create 11 Private Repos

Go to [github.com/new](https://github.com/new) for each one.

Settings for all repos:
- **Visibility:** Private
- **Initialize:** No README, no .gitignore, no license (the Repl will create these)

Create these repos under your `SpeckledDarth` account (or a new organization if you prefer):

```
1. musekit-shared
2. musekit-design-system
3. musekit-database
4. musekit-auth
5. musekit-billing
6. musekit-email
7. musekit-services
8. musekit-admin
9. musekit-cms
10. musekit-affiliate
11. musekit-passivepost
```

You already have `master-saas-muse` — that stays as the integration repo.

**Total: 12 repos (11 new + 1 existing)**

### Step 2: Create Repls Linked to Repos

For each module, do this:
1. Go to [replit.com](https://replit.com) → **Create Repl**
2. Choose **Import from GitHub**
3. Paste the repo URL (e.g., `https://github.com/SpeckledDarth/musekit-shared`)
4. Replit will create a Repl linked to that repo
5. Name the Repl to match (e.g., `musekit-shared`)

**You don't need to create all 12 at once.** Create them as you reach that point in the build order. For example:
- Before Session 2: Create `musekit-shared` Repl
- Before Session 3: Create `musekit-design-system` Repl
- Before Session 4: Create `musekit-database` Repl
- And so on...

### Step 3: What Happens When You Open a New Module Repl

When the agent starts work in a fresh module Repl, the first thing it will do is:
1. Install Node.js
2. Create `package.json` with the correct name (e.g., `@musekit/design-system`)
3. Create `tsconfig.json`
4. Create `MODULE.md` (the contract defining what this module exports)
5. Create `replit.md` (telling future sessions what this Repl is and how to work in it)
6. Install dependencies

I will provide ready-made templates for all of these so setup is consistent across every Repl.

---

## How Modules Connect

### During Development (in separate Repls)

Each module Repl can reference its dependencies from GitHub. For example, the `musekit-auth` Repl's `package.json` would look like:

```json
{
  "name": "@musekit/auth",
  "version": "0.1.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "dependencies": {
    "@musekit/shared": "github:SpeckledDarth/musekit-shared",
    "@musekit/database": "github:SpeckledDarth/musekit-database",
    "@musekit/design-system": "github:SpeckledDarth/musekit-design-system"
  }
}
```

This means the module can import from its dependencies and be developed/tested in isolation. If `@musekit/shared` hasn't been built yet, you can't start `@musekit/auth` — the dependency order is enforced naturally.

### During Integration (in the monorepo)

When a module is finished and tested, its code is copied into the Turborepo monorepo:

```
master-saas-muse/
├── apps/
│   └── web/                    ← Next.js app (pages, routing, API routes)
├── packages/
│   ├── shared/                 ← copied from musekit-shared Repl
│   ├── design-system/          ← copied from musekit-design-system Repl
│   ├── database/               ← copied from musekit-database Repl
│   ├── auth/                   ← copied from musekit-auth Repl
│   ├── billing/                ← copied from musekit-billing Repl
│   └── ...                     ← etc.
├── turbo.json
└── package.json                ← workspaces: ["apps/*", "packages/*"]
```

In the monorepo, dependencies resolve via npm workspaces — no GitHub references needed. Each package's `package.json` uses `"*"` for internal dependencies:

```json
{
  "dependencies": {
    "@musekit/shared": "*",
    "@musekit/database": "*"
  }
}
```

### For Production (Vercel)

Vercel deploys from the `master-saas-muse` GitHub repo. The build command is:

```
npx turbo build --filter=@musekit/web
```

This builds the Next.js app and all its workspace dependencies. Standard Vercel + Turborepo deployment — nothing custom.

---

## Keeping Documents Aligned

### The Problem

With 12 Repls, how do you prevent documents from drifting? What if Session X changes a type in `musekit-shared` but Session Y in `musekit-admin` doesn't know?

### The Solution: Three-Layer Documentation

---

**Layer 1: Master Plan (`TURBOREPO_PLAN.md`)**

- **Lives in:** `master-saas-muse` repo (the integration Repl — this Repl)
- **Purpose:** Single source of truth for architecture, build order, and progress
- **Contains:** Session tracking table, package architecture diagram, dependency tiers
- **Updated:** After every integration checkpoint (sessions 9, 14, 17)
- **Every other Repl's `replit.md` points here**

---

**Layer 2: Module Contracts (`MODULE.md` — one per development Repl)**

- **Lives in:** Each module's Repl and GitHub repo
- **Purpose:** Defines what this module exports and depends on — its "API contract"
- **Contains:** Public exports (functions, components, types), dependencies, list of consumers
- **Updated:** Whenever the module's exports change
- **This is what sessions should read before starting work**

Example for `@musekit/auth`:
```markdown
# @musekit/auth — Module Contract

## Purpose
Complete authentication and authorization system using Supabase.

## Exports
- createBrowserClient() — Supabase browser auth client
- createServerClient() — Supabase server auth client
- AuthProvider — React context provider
- useAuth() — Hook returning { user, loading, signIn, signUp, signOut }
- LoginForm — Login page component
- SignupForm — Signup page component
- PasswordResetForm — Password reset component
- withAuth() — Protected route higher-order component
- authMiddleware() — Next.js middleware for route protection

## Dependencies
- @musekit/shared — types and utilities
- @musekit/database — Supabase client, user queries
- @musekit/design-system — Button, Input, Card, Label components

## Consumers (who imports from this module)
- @musekit/admin — protected admin routes
- @musekit/passivepost — protected user routes
- @musekit/web — auth pages, middleware
```

---

**Layer 3: Repl Memory (`replit.md` — one per Repl)**

- **Lives in:** Each Repl
- **Purpose:** Tells any session opening this Repl what it is and how to work in it
- **Contains:**
  - What this Repl is
  - Current status (complete, in progress, not started)
  - Last session date
  - **Mandatory first step:** "Read MODULE.md before doing anything"
  - Pointer to the master plan
  - Known issues or warnings

---

### How Sync Works in Practice

1. **Before starting work in any Repl:** The session reads `replit.md` → then `MODULE.md` → then builds
2. **If a module's exports change:** Update that module's `MODULE.md` immediately
3. **At integration checkpoints (sessions 9, 14, 17):** Verify all MODULE.md contracts match actual code — flag any mismatches
4. **Types are the contract:** The TypeScript compiler will catch mismatches. If `@musekit/shared` changes a `User` type, every consumer that imports `User` will get a compile error at integration time — forcing the fix.
5. **You can check any time:** Open any Repl, read its `MODULE.md`, and you know exactly what it exports and what's done

---

## Migration to Production

### Services You'll Need

| Service | Purpose | Cost |
|---------|---------|------|
| **Supabase** (Pro plan) | Database + Auth + Storage | $25/mo |
| **Vercel** (Pro plan) | Hosting + CDN | $20/mo |
| **Stripe** | Payment processing | 2.9% + 30¢ per transaction |
| **Resend** | Transactional email | Free tier (3,000 emails/mo) or $20/mo |
| **Upstash** | Redis for BullMQ + rate limiting | Free tier or $10/mo |
| **Sentry** | Error monitoring | Free tier (5K errors/mo) |
| **Plausible** | Privacy-friendly analytics | $9/mo |
| **Domain** | Custom URL | ~$12/year |

**Estimated monthly cost at launch: ~$75-100/mo** (before revenue)

### Deployment Steps

1. **Create production Supabase project**
   - New project in Supabase dashboard
   - Run all migration SQL from `@musekit/database`
   - Configure auth providers (Google, GitHub, Apple, Twitter/X) with production redirect URLs
   - Set up RLS policies
   - Enable email templates in Supabase Auth settings

2. **Configure Stripe live mode**
   - Switch from test keys to live keys
   - Create production products and prices matching tier definitions
   - Configure webhook endpoint pointing to your production URL
   - Test a real subscription flow

3. **Connect to Vercel**
   - Import `master-saas-muse` repo into Vercel
   - Set build command: `npx turbo build --filter=@musekit/web`
   - Set output directory: `apps/web/.next`
   - Set root directory: (leave empty — Turborepo handles it)
   - Add all environment variables

4. **Environment variables to set in Vercel:**
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://[your-project].supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
   SUPABASE_SERVICE_ROLE_KEY=[your-service-key]
   STRIPE_SECRET_KEY=sk_live_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   RESEND_API_KEY=re_...
   SENTRY_DSN=https://...
   NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com
   UPSTASH_REDIS_REST_URL=https://...
   UPSTASH_REDIS_REST_TOKEN=...
   SESSION_SECRET=[generate-a-random-string]
   ```

5. **Configure custom domain**
   - Add domain in Vercel project settings
   - Update DNS records (CNAME or A record)
   - SSL is automatic via Vercel

6. **Post-deployment verification**
   - Visit the site, verify landing page loads
   - Test signup → email verification → login flow
   - Test OAuth login (Google at minimum)
   - Test subscription purchase (use a real card or Stripe test mode first)
   - Access admin dashboard
   - Verify PassivePost social connections
   - Check Sentry for any errors
   - Confirm Plausible is receiving events

---

## Cost and Time Estimates

| Item | Estimate |
|------|----------|
| GitHub repos to create | 11 new + 1 existing = 12 total |
| Repls to create | 12 total (create as needed, not all at once) |
| Total sessions | 18 |
| Estimated total lines of code | 24,000-30,000 |
| Your one-time setup overhead | ~1-2 hours (creating repos + first few Repls) |
| Your per-session overhead | ~5-10 minutes (open the right Repl, check the plan) |
| Estimated session frequency | Your pace — 1/day, 2/day, or whatever works |
| Estimated calendar time | 2-4 weeks at 1 session/day |

---

## Summary

| Question | Answer |
|----------|--------|
| How many Repls? | 12 total (11 development + 1 integration) |
| How many GitHub repos? | 12 total (11 new + 1 existing) |
| What protects against session failures? | **Physical isolation** — sessions can only see one module's code |
| What if a session goes rogue? | It can only damage one small Repl. Roll back. Everything else untouched. |
| Can a CSS change break the whole app? | **No** — CSS is scoped within each module's components |
| How do modules connect? | GitHub dependencies during dev → npm workspaces in the monorepo |
| How do you deploy? | Vercel deploys the assembled Turborepo monorepo |
| How do you keep docs in sync? | Three layers: Master Plan → Module Contracts → Repl Memory |
| What's the build order? | Foundation → Core Services → Features → PassivePost → Integration → Production |
| What's your visibility? | Each Repl is pass/fail. MODULE.md tells you what's done. Session log tracks progress. |
| What about the 90% that's already built? | The existing code in GitHub serves as the reference. Each module is rebuilt cleanly using the original as a specification. |
