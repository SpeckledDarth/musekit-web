# MuseKit + PassivePost — Turborepo Build Plan

> **Last Updated:** Session 2 | **Target:** 20,000-25,000+ lines | **Architecture:** Turborepo Monorepo

---

## Current State

### Session 1 — Monorepo Foundation (1,232 lines) ✅

| Package | Purpose | Lines | Status |
|---------|---------|-------|--------|
| `@musekit/web` | Next.js 14 app — landing page (hero, features, pricing, footer) | 487 | Running |
| `@musekit/design-system` | 8 UI components (Button, Card, Badge, Input, Label, Sidebar, ThemeToggle, Avatar) + tokens | 434 | Working |
| `@musekit/shared` | Utilities (cn, formatCurrency, etc.), TypeScript types, app config | 158 | Working |
| `@musekit/auth` | Supabase browser/server clients + AuthProvider + useAuth hook | 121 | Scaffold |
| `@musekit/config-ts` | Shared TypeScript configs (base, nextjs, library) | 32 | Working |

---

## Package Architecture

```
musekit/
├── apps/
│   └── web/                    ← Next.js app (pages, routing, API routes)
├── packages/
│   ├── config-ts/              ← TypeScript configs                    ✅ DONE
│   ├── shared/                 ← Types, utils, constants               ✅ DONE
│   ├── design-system/          ← UI components + tokens                ✅ DONE (8 components)
│   ├── auth/                   ← Supabase auth + providers             ✅ DONE (scaffold)
│   ├── database/               ← Supabase client, queries, migrations  ⬜ Session 2
│   ├── billing/                ← Stripe logic, plans, webhooks         ⬜ Session 5
│   ├── admin/                  ← Admin dashboard components + API      ⬜ Sessions 6-7
│   ├── cms/                    ← Blog, pages, content management       ⬜ Session 8
│   ├── email/                  ← Resend templates + editor             ⬜ Session 8
│   ├── notifications/          ← In-app notification system            ⬜ Session 9
│   ├── webhooks/               ← Event system + delivery               ⬜ Session 9
│   ├── ai/                     ← AI provider abstraction               ⬜ Session 9
│   ├── jobs/                   ← BullMQ processors + queues            ⬜ Session 10
│   ├── affiliate/              ← Affiliate program                     ⬜ Session 13
│   └── passivepost/            ← PassivePost product extension         ⬜ Sessions 11-12
```

---

## Build Order

| Session | Package(s) | What Gets Built | Est. Lines | Status |
|---------|-----------|-----------------|------------|--------|
| 1 | config-ts, shared, design-system, auth, web | Monorepo foundation + landing page | 1,232 | ✅ Done |
| 2 | database | Supabase client, schema types, migration SQL, seed data, RLS policies | ~800-1,200 | ⬜ Current |
| 3 | auth (complete) | Login/signup pages, OAuth flows, middleware, protected routes, password reset | ~1,500-2,000 | ⬜ |
| 4 | design-system (expand) | 20+ more components (Dialog, Select, Tabs, Table, Toast, Switch, Dropdown, Sheet, etc.) | ~1,500-2,000 | ⬜ |
| 5 | billing | Stripe integration, pricing page, checkout, customer portal, webhook handler, feature gating | ~1,500-2,000 | ⬜ |
| 6 | admin (part 1) | Admin layout, overview page, user management, metrics dashboard (10 KPIs) | ~2,000-2,500 | ⬜ |
| 7 | admin (part 2) | Setup dashboard (11 sub-pages), feature toggles, audit logs, impersonation | ~2,000-2,500 | ⬜ |
| 8 | cms + email | Blog system, custom pages, email templates + editor, Resend integration | ~1,500-2,000 | ⬜ |
| 9 | notifications + webhooks + ai | In-app notifications, webhook system, AI provider abstraction | ~1,500-2,000 | ⬜ |
| 10 | jobs | BullMQ + Upstash Redis, 6 core job types, rate limiting, admin queue dashboard | ~1,000-1,500 | ⬜ |
| 11 | passivepost (part 1) | Social dashboard layout, compose, queue, calendar, brand preferences | ~2,000-2,500 | ⬜ |
| 12 | passivepost (part 2) | Analytics, intelligence, autopilot, social OAuth, 4 social job types | ~2,000-2,500 | ⬜ |
| 13 | affiliate | Affiliate program, referrals, earnings, payouts, admin affiliate management | ~1,500-2,000 | ⬜ |
| 14 | Marketing pages + legal | 14 landing sections, 9 legal pages, SEO/sitemap, waitlist, feedback widget | ~1,500-2,000 | ⬜ |
| 15 | Integration + testing | Connect everything, E2E tests, polish, deployment config | ~500-1,000 | ⬜ |

**Total Target: ~21,000-27,000 lines**

---

## Full Feature Inventory

### MuseKit Core

#### User Management & Authentication
- Email/password signup with email verification
- 5 OAuth providers: Google, GitHub, Apple, Twitter/X, Magic Link
- Admin-controlled OAuth toggles
- User profiles with avatar upload
- Role-based access (admin, member, viewer)
- SSO/SAML enterprise auth

#### Subscription Billing (Stripe)
- Multiple pricing tiers with monthly/annual
- Customer portal for self-service
- Feature gating based on plan level
- Product Registry for multi-product tier resolution
- Webhook handler for subscription events

#### Admin Dashboard
- Overview with user analytics
- User management with customer service tools
- Subscription status and Stripe integration
- 10 KPI cards (Total Users, New Users, Active Subs, MRR, ARPU, LTV, Churn, Conversion, Feedback, Waitlist)
- NPS Score with color-coded rating
- User Growth and Revenue Growth charts
- Alert thresholds for churn and growth
- Email Report and Check Alerts actions
- Scheduled weekly/monthly KPI emails

#### Setup Dashboard (11 Sub-Pages)
- Branding (logo, colors, app name, hero styles, header/footer)
- Content (homepage sections with ordering, per-section backgrounds)
- Pages (about, contact, terms, privacy, custom)
- Pricing (Stripe integration)
- Social links
- Features & integrations (auth toggles, AI, webhooks, security, compliance)
- API Keys & Integrations (centralized key management)

#### Content Management
- Blog/changelog with markdown and live preview
- Public and draft posts
- Admin CRUD interface
- Custom pages system

#### Marketing Tools
- Waitlist mode with CSV export
- SEO-optimized pages with sitemap and robots.txt
- Feedback widget with NPS rating (0-10)
- Announcement bar
- 14 landing page sections (hero, logo marquee, counters, features, testimonials, FAQ, etc.)

#### Email System (Resend)
- Customizable templates with admin editor
- Template preview and test sending
- Welcome, subscription, cancellation, invitation emails
- Scheduled KPI reports

#### AI Integration
- Pluggable provider (xAI Grok, OpenAI, Anthropic)
- Admin-configurable model, temperature, max tokens, system prompt
- Chat completion API with streaming
- Help Widget (AI support chatbot)

#### Notifications
- Bell icon with unread count
- Notification popover with type-specific icons
- Auto-polling for new notifications
- Mark all as read

#### Webhooks
- 8 events (feedback, waitlist, subscriptions, team, contact)
- HMAC-SHA256 signing
- Fire-and-forget with retry logic
- Admin-configurable URL, secret, per-event toggles

#### Background Jobs (BullMQ + Upstash Redis)
- 6 core job types: email, webhook-retry, report, metrics-report, metrics-alert, token-rotation
- Rate limiting with sliding window
- Admin queue dashboard

#### Enterprise Features
- SSO/SAML with domain-based detection
- User impersonation (30-min sessions + audit)
- Database backup configuration
- API token rotation
- Audit logging with viewer

#### Legal & Compliance
- 9 legal pages with dynamic variable replacement
- Cookie consent banner
- MFA and password requirement settings

### PassivePost Extension

#### Social Dashboard (10 Pages)
- Posts overview with status filters
- Post queue management
- Calendar view
- Blog flywheel
- Compose / AI generator
- Articles management
- Autopilot mode
- Engagement analytics
- Content intelligence
- Distribution intelligence

#### Additional Features
- 3-tier subscription (Starter/Basic/Premium)
- AI post generation (15 niche prompts)
- 10 platform support (Twitter/X, LinkedIn, Instagram, YouTube, Facebook, TikTok, Reddit, Pinterest, Snapchat, Discord)
- OAuth flows for social connections
- Brand preferences + AI Voice Fine-Tuner
- Revenue & ROI tracking
- Lead tracker
- Approvals workflow
- 4 BullMQ social job types

---

## Database Schema (15+ Tables)

### Core Tables
| Table | Purpose |
|-------|---------|
| `profiles` | User profiles, avatars, roles (extends Supabase auth.users) |
| `organizations` | Multi-tenant organizations |
| `team_members` | Organization membership with roles |
| `team_invitations` | Pending team invitations |
| `subscriptions` | Stripe subscription state |
| `audit_logs` | Admin action tracking |
| `notifications` | In-app notifications |
| `api_keys` | Centralized encrypted service keys |
| `content_posts` | Blog and changelog entries |
| `waitlist` | Pre-launch email collection |
| `feedback` | User feedback with NPS ratings |
| `webhook_configs` | Webhook endpoint configuration |
| `brand_settings` | App branding configuration |
| `feature_toggles` | Admin feature flags |
| `email_templates` | Customizable email templates |

### Extension Tables (PassivePost)
| Table | Purpose |
|-------|---------|
| `social_posts` | Scheduled/drafted social content |
| `social_accounts` | Linked platform OAuth tokens |
| `brand_preferences` | User-specific AI generation settings |
| `social_analytics` | Post engagement data |
| `post_queue` | Scheduled release management |

---

## Risk Mitigation Rules

1. **ONE PACKAGE PER SESSION** — Never make cross-boundary changes
2. **CHECKPOINT DISCIPLINE** — Note working state before risky changes; rollback if needed
3. **NO CROSS-CUTTING CSS** — All styling through design system variables and components
4. **DATABASE-FIRST** — Schema and types before UI for each feature
5. **REAL DATA FROM DAY 1** — Supabase dev project, no mocked endpoints
6. **SMOKE TEST EVERY SESSION** — App must compile, render, and pass existing tests
7. **GIT AS SOURCE OF TRUTH** — Every session ends with a commit checkpoint
8. **PIN DEPENDENCY VERSIONS** — Lock critical packages to avoid surprise breaks

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Runtime | Node.js | 20.x |
| Framework | Next.js (App Router) | 14.2.x |
| Language | TypeScript | 5.5.x |
| Styling | Tailwind CSS | 3.4.x |
| UI | Custom design system (CVA + Tailwind) | — |
| Monorepo | Turborepo | 2.x |
| Database | Supabase (PostgreSQL) | — |
| Auth | Supabase Auth + SSR | — |
| Billing | Stripe | — |
| Email | Resend | — |
| Queues | BullMQ + Upstash Redis | — |
| AI | xAI Grok / OpenAI / Anthropic | — |
| Monitoring | Sentry + Plausible | — |
| Deployment | Vercel | — |

---

## Session Log

| Session | Date | Lines Added | Running Total | Notes |
|---------|------|-------------|---------------|-------|
| 1 | 2026-03-03 | 1,232 | 1,232 | Monorepo foundation, landing page, 5 packages |
| 2 | — | — | — | Database package, Supabase setup |
