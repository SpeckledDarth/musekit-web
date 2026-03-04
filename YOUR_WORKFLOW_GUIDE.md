# Your Personal Workflow Guide — Multi-Repl Recovery Plan

> **Who this is for:** You, Chris. This is your step-by-step operations manual.  
> **What this is NOT:** A technical architecture doc. This is "what do I do, when, and in what order."  
> **Goal:** Recover your 90% complete app into a crash-proof structure and launch by 4/1/26.

---

## Table of Contents

1. [Before You Start — Protect What You Have](#before-you-start)
2. [One-Time GitHub Setup](#github-setup)
3. [Secrets Reference — Which Secrets Go Where](#secrets-reference)
4. [Confirmed Tech Stack](#confirmed-tech-stack)
5. [Open Issues Tracker](#open-issues-tracker)
6. [How Each Module Session Works](#repeatable-process)
7. [Phase 1: Foundation Modules (Sessions 2-4)](#phase-1)
8. [Phase 2: Core Service Modules (Sessions 5-8)](#phase-2)
9. [Phase 3: First Integration Checkpoint (Session 9)](#phase-3)
10. [Phase 4: Feature Modules (Sessions 10-14)](#phase-4)
11. [Phase 5: PassivePost (Sessions 15-17)](#phase-5)
12. [Phase 6: Production Launch (Session 18)](#phase-6)
13. [How to Verify Each Session's Work](#verify-work)
14. [Timeline for 4/1/26 Launch](#timeline)
15. [Quick Reference — All Initialization Prompts](#initialization-prompts)

---

<a id="before-you-start"></a>

## 1. Before You Start — Protect What You Have

Before creating any new Repls, make sure your existing assets are safe.

### Your Existing Assets (What You're Protecting)

| Asset | Where It Lives | Status |
|-------|---------------|--------|
| Pre-crash source code | GitHub: `SpeckledDarth/master-saas-muse` | Your reference — do NOT delete this repo |
| Supabase database | Your Supabase project dashboard | Intact — 15+ tables, RLS policies, auth config |
| 83 screenshot references | This Repl: `attached_assets/` folder | Safe in this Repl |
| v5 Project Overview | This Repl: `attached_assets/v5_MUSEKIT_PROJECT_OVERVIEW_1772553871907.md` | Safe in this Repl |
| CSS Dashboard Repl | Separate Repl (~3,028 lines) | Still exists, NOT in GitHub yet |
| This planning Repl | This Repl (musekit-web) | Contains all planning docs |

### Action Items Before Starting

- [ ] **Verify your GitHub repo is intact.** Go to `github.com/SpeckledDarth/master-saas-muse` and confirm you can see your pre-crash code. This is your reference implementation — every module will be built by reorganizing code from here.

- [ ] **Verify your Supabase project is running.** Log into your Supabase dashboard and confirm your database tables are still there. You will NOT be rebuilding these.

- [ ] **Push your CSS Dashboard Repl to GitHub.** This ~3,028-line Repl is not in GitHub yet. Create a repo called `musekit-css-dashboard` and push it there for safekeeping before we start anything else.

- [ ] **Bookmark this Repl.** This is your "command center" Repl. All planning documents live here. You'll come back to this Repl for integration sessions.

---

<a id="github-setup"></a>

## 2. One-Time GitHub Setup

**Time needed: ~15-20 minutes**

### Create 11 New Public Repos ✅ DONE

Go to [github.com/new](https://github.com/new) and create each of these repos.

For every repo, use these settings:
- **Owner:** SpeckledDarth (your account)
- **Visibility:** Public (keeps things simple — no GitHub token needed when module Repls install each other as dependencies. No secrets are stored in code, so public is safe.)
- **Initialize:** Leave everything unchecked (no README, no .gitignore, no license)

Create these repos:

| # | Repo Name | What It Will Contain | Created? |
|---|-----------|---------------------|----------|
| 1 | `musekit-shared` | Types, utilities, constants | ✅ |
| 2 | `musekit-design-system` | UI components, tokens, color system | ✅ |
| 3 | `musekit-database` | Supabase client code, schema types, query helpers | ✅ |
| 4 | `musekit-auth` | Login, signup, OAuth, middleware | ✅ |
| 5 | `musekit-billing` | Stripe subscriptions, checkout, webhooks | ✅ |
| 6 | `musekit-email` | Resend templates, editor, scheduled reports | ✅ |
| 7 | `musekit-services` | Notifications, webhooks, AI, background jobs | ✅ |
| 8 | `musekit-admin` | Admin dashboard (all 30+ feature areas) | ✅ |
| 9 | `musekit-cms` | Blog, landing pages, legal pages, SEO | ✅ |
| 10 | `musekit-affiliate` | Affiliate program, referrals, payouts | ✅ |
| 11 | `musekit-passivepost` | PassivePost social media product | ✅ |

Your existing repo `master-saas-muse` stays as-is — that becomes the integration repo.

---

<a id="secrets-reference"></a>

## 3. Secrets Reference — Which Secrets Go Where

Your monolithic app has 27 secrets + 1 configuration. Not every Repl needs all of them. Here's the complete mapping so you know exactly which secrets to add to each Repl.

### Your Complete Secrets Inventory

| # | Secret Name | What It's For |
|---|-------------|---------------|
| 1 | `SESSION_SECRET` | Cookie/session signing |
| 2 | `SUPABASE_SERVICE_ROLE_KEY` | Admin-level Supabase access (bypasses RLS) |
| 3 | `STRIPE_SECRET_KEY` | Stripe server-side operations |
| 4 | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client-side Supabase access |
| 5 | `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| 6 | `NEXT_PUBLIC_SENTRY_DSN` | Error monitoring (Sentry) |
| 7 | `SENTRY_ORG` | Sentry organization name |
| 8 | `SENTRY_PROJECT` | Sentry project name |
| 9 | `XAI_API_KEY` | xAI/Grok AI API key |
| 10 | `UPSTASH_REDIS_REST_TOKEN` | Redis queue authentication |
| 11 | `UPSTASH_REDIS_REST_URL` | Redis queue URL |
| 12 | `TEST_USER_EMAIL` | Test account for automated testing |
| 13 | `TEST_USER_PASSWORD` | Test account password |
| 14 | `SOCIAL_ENCRYPTION_KEY` | Encrypts social platform tokens |
| 15 | `TWITTER_API_KEY` | Twitter/X OAuth |
| 16 | `TWITTER_API_SECRET` | Twitter/X OAuth |
| 17 | `LINKEDIN_CLIENT_ID` | LinkedIn OAuth |
| 18 | `LINKEDIN_CLIENT_SECRET` | LinkedIn OAuth |
| 19 | `FACEBOOK_APP_ID` | Facebook OAuth |
| 20 | `FACEBOOK_APP_SECRET` | Facebook OAuth |
| 21 | `DISCORD_CLIENT_ID` | Discord OAuth |
| 22 | `DISCORD_CLIENT_SECRET` | Discord OAuth |
| 23 | `GOOGLE_CLIENT_ID` | Google OAuth |
| 24 | `GOOGLE_CLIENT_SECRET` | Google OAuth |
| 25 | `INSTAGRAM_APP_ID` | Instagram OAuth |
| 26 | `INSTAGRAM_APP_SECRET` | Instagram OAuth |
| 27 | `GIT_URL` | Git repository URL (Replit internal) |

**Configuration (not a secret):**
- `NEXT_PUBLIC_APP_URL` = `https://master-saas-muse-u7ga.vercel.app`

### Which Secrets Go to Which Repl

Here's the lookup table. When you create a Repl, find it in the left column and add every secret that has a checkmark.

| Secret | shared | design-system | database | auth | billing | email | services | admin | cms | affiliate | passivepost | Integration (this Repl) |
|--------|--------|--------------|----------|------|---------|-------|----------|-------|-----|-----------|-------------|------------------------|
| `SESSION_SECRET` | | | | ✓ | | | | | | | | ✓ |
| `SUPABASE_SERVICE_ROLE_KEY` | | | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `STRIPE_SECRET_KEY` | | | | | ✓ | | | ✓ | | ✓ | ✓ | ✓ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | | | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `NEXT_PUBLIC_SUPABASE_URL` | | | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `NEXT_PUBLIC_SENTRY_DSN` | | | | | | | | | | | | ✓ |
| `SENTRY_ORG` | | | | | | | | | | | | ✓ |
| `SENTRY_PROJECT` | | | | | | | | | | | | ✓ |
| `XAI_API_KEY` | | | | | | | ✓ | | | | ✓ | ✓ |
| `UPSTASH_REDIS_REST_TOKEN` | | | | | | | ✓ | | | | ✓ | ✓ |
| `UPSTASH_REDIS_REST_URL` | | | | | | | ✓ | | | | ✓ | ✓ |
| `TEST_USER_EMAIL` | | | | ✓ | | | | | | | | ✓ |
| `TEST_USER_PASSWORD` | | | | ✓ | | | | | | | | ✓ |
| `SOCIAL_ENCRYPTION_KEY` | | | | | | | | | | | ✓ | ✓ |
| `TWITTER_API_KEY` | | | | | | | | | | | ✓ | ✓ |
| `TWITTER_API_SECRET` | | | | | | | | | | | ✓ | ✓ |
| `LINKEDIN_CLIENT_ID` | | | | | | | | | | | ✓ | ✓ |
| `LINKEDIN_CLIENT_SECRET` | | | | | | | | | | | ✓ | ✓ |
| `FACEBOOK_APP_ID` | | | | | | | | | | | ✓ | ✓ |
| `FACEBOOK_APP_SECRET` | | | | | | | | | | | ✓ | ✓ |
| `DISCORD_CLIENT_ID` | | | | | | | | | | | ✓ | ✓ |
| `DISCORD_CLIENT_SECRET` | | | | | | | | | | | ✓ | ✓ |
| `GOOGLE_CLIENT_ID` | | | | ✓ | | | | | | | ✓ | ✓ |
| `GOOGLE_CLIENT_SECRET` | | | | ✓ | | | | | | | ✓ | ✓ |
| `INSTAGRAM_APP_ID` | | | | | | | | | | | ✓ | ✓ |
| `INSTAGRAM_APP_SECRET` | | | | | | | | | | | ✓ | ✓ |
| `NEXT_PUBLIC_APP_URL` | | | | ✓ | ✓ | ✓ | | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Total secrets per Repl** | **0** | **0** | **3** | **8** | **5** | **4** | **6** | **5** | **4** | **5** | **19** | **27** |

### Quick Copy Lists Per Repl

For your convenience, here are the exact secrets to add for each module:

**musekit-shared:** No secrets needed.

**musekit-design-system:** No secrets needed.

**musekit-database (3 secrets):**
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY

**musekit-auth (8 secrets):**
- SESSION_SECRET
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- TEST_USER_EMAIL
- TEST_USER_PASSWORD
- NEXT_PUBLIC_APP_URL (as configuration, not secret)

**musekit-billing (5 secrets):**
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- STRIPE_SECRET_KEY
- NEXT_PUBLIC_APP_URL (as configuration)

**musekit-email (4 secrets):**
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- RESEND_API_KEY (note: not in your current list — you may need to add this)
- NEXT_PUBLIC_APP_URL (as configuration)

**musekit-services (6 secrets):**
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- XAI_API_KEY
- UPSTASH_REDIS_REST_URL
- UPSTASH_REDIS_REST_TOKEN

**musekit-admin (5 secrets):**
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- STRIPE_SECRET_KEY
- NEXT_PUBLIC_APP_URL (as configuration)

**musekit-cms (4 secrets):**
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- NEXT_PUBLIC_APP_URL (as configuration)

**musekit-affiliate (5 secrets):**
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- STRIPE_SECRET_KEY
- NEXT_PUBLIC_APP_URL (as configuration)

**musekit-passivepost (19 secrets):**
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- STRIPE_SECRET_KEY
- XAI_API_KEY
- UPSTASH_REDIS_REST_URL
- UPSTASH_REDIS_REST_TOKEN
- SOCIAL_ENCRYPTION_KEY
- TWITTER_API_KEY
- TWITTER_API_SECRET
- LINKEDIN_CLIENT_ID
- LINKEDIN_CLIENT_SECRET
- FACEBOOK_APP_ID
- FACEBOOK_APP_SECRET
- DISCORD_CLIENT_ID
- DISCORD_CLIENT_SECRET
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- INSTAGRAM_APP_ID
- INSTAGRAM_APP_SECRET
- NEXT_PUBLIC_APP_URL (as configuration)

**Integration Repl / this Repl (all 27):**
At integration time, this Repl needs every secret because it runs the full app. You should add all 27 secrets here before running Integration Checkpoint 1 (Session 9).

### Notes on Secrets

- **`GIT_URL`** is a Replit internal secret. You don't need to manually add this to new Repls — Replit manages it when you import from GitHub.
- **`RESEND_API_KEY`** is missing from your current list. You'll need to add it when you build the email module (Session 7). If your monolithic app was sending emails, this key exists somewhere — check your Resend dashboard.
- **Sentry secrets** (`NEXT_PUBLIC_SENTRY_DSN`, `SENTRY_ORG`, `SENTRY_PROJECT`) only go in the Integration Repl. Individual modules don't need error monitoring — that happens at the app level.
- **Social platform OAuth secrets** (Twitter, LinkedIn, Facebook, etc.) only go in the PassivePost Repl and the Integration Repl. No other module talks to social platforms.
- **Google OAuth** appears in both `musekit-auth` (for login with Google) and `musekit-passivepost` (for YouTube/Google connections). Same credentials, two Repls.
- **`RESEND_API_KEY`** — Confirmed: emails are working in the monolithic app, but the secret may be under a different name. Will investigate the pre-crash GitHub code and correct this during Session 7 (email module). Keys are available from the Resend dashboard.
- **`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`** — Not yet added. Stripe is 100% in development mode, which may be why this hasn't been caught. Keys are available. Will be added during Session 6 (billing module).

---

<a id="confirmed-tech-stack"></a>

## 4. Confirmed Tech Stack

This is the verified, agreed-upon technology stack. Every module session should reference this to avoid assumptions or guessing.

### Core Framework
| Technology | Version | Notes |
|-----------|---------|-------|
| Next.js | **14.2.18** | App Router. Overview doc says "16+" but actual code is 14. **Stay on 14 for stability during rebuild.** |
| React | **18.3.1** | |
| TypeScript | Yes | Strict mode |
| Turborepo | Latest | Monorepo management |
| npm workspaces | Yes | Package linking |

### Frontend / UI
| Technology | Version/Detail | Notes |
|-----------|---------------|-------|
| Tailwind CSS | **v3.4.x** | **NEVER upgrade to v4** — breaks PostCSS. This is a hard rule. |
| shadcn/ui | 70+ components | Base component library |
| CVA (class-variance-authority) | Latest | Component variant system |
| 950-scale CSS variables | `--primary-50` through `--primary-950` | Single source of truth for all colors |
| Dark/light mode | `class` strategy | Theme toggle in header |
| Interactive states | `hover-elevate`, `active-elevate-2`, `toggle-elevate` | Primary palette CSS variables |
| Hero section | 6 styles | full-width, split, video, pattern, floating mockup, photo collage |
| Landing sections | 14 configurable | All toggleable and orderable from admin |
| Header | Configurable | bg color, text color, opacity, sticky/relative, transparent, border |
| Footer | Configurable | bg color, text color, bg image, 3 layout modes (4-column, minimal, centered) |

### Database / Backend
| Technology | Detail | Notes |
|-----------|--------|-------|
| Supabase PostgreSQL | 15+ core tables + 5 extension tables | Already exists — do NOT rebuild |
| Supabase Auth | 5 OAuth + email/password + Magic Link + SSO/SAML | Already configured |
| Supabase Storage | Avatars + branding images | Custom buckets exist (details TBD — user to share) |
| Row Level Security | Policies on key tables | Already configured |
| Database extension pattern | `migrations/core/` vs `migrations/extensions/` | Core = MuseKit, Extensions = PassivePost |

### Services / APIs
| Service | Purpose | Status |
|---------|---------|--------|
| Stripe | Subscription billing, checkout, customer portal | Working (dev mode). Missing publishable key in secrets. |
| Resend | Transactional emails | Working. Secret name may be incorrect — to be fixed. |
| xAI Grok | Primary AI provider | Working |
| OpenAI | Alternate AI provider | Configurable from admin |
| Anthropic | Alternate AI provider | Configurable from admin |
| Upstash Redis | BullMQ queues + rate limiting | Working. 10 job types (6 core + 4 social). |
| Sentry | Error monitoring (server + browser) | Working via tunnel route |
| Plausible | Privacy-friendly analytics | **NOT fully integrated** — Next.js conflict. Post-launch task. |
| n8n | Workflow automation agents | **NOT integrated** — architecture exists, agents not connected. Post-launch task. |

### Authentication (7 Methods)
| Method | Default State | Admin Toggleable? |
|--------|--------------|-------------------|
| Email/password with verification | Enabled | No (always on) |
| Google OAuth | Enabled | Yes |
| GitHub OAuth | Disabled | Yes |
| Apple OAuth | Disabled | Yes |
| Twitter/X OAuth | Disabled | Yes |
| Magic Links | Enabled | Yes |
| SSO/SAML | Disabled | Yes |

### PassivePost Extension
| Feature | Detail |
|---------|--------|
| Social dashboard | 10 pages with dedicated sidebar |
| Subscription tiers | Starter (free, 3 accounts, 30 posts/mo), Basic ($29, 10/300), Premium ($99, unlimited) |
| Social platforms | 10 total: Twitter/X, LinkedIn, Instagram, YouTube, Facebook, TikTok, Reddit, Pinterest, Snapchat, Discord |
| Platform API status | Twitter/X, LinkedIn, Instagram — full implementation. YouTube, Facebook, TikTok, Reddit, Pinterest, Snapchat, Discord — **stubbed methods** |
| AI post generation | 15 niche-specific prompt templates |
| Brand preferences | Niche, tone, audience, location, goals, frequency, sample URLs, AI voice fine-tuner |
| Background jobs | 4 social job types via BullMQ |
| Social token encryption | `SOCIAL_ENCRYPTION_KEY` for OAuth tokens |

### Testing
| Tool | Detail |
|------|--------|
| Playwright | 92 E2E tests across 7 files + 8 PassivePost tests = **100 total** |
| Plan | Reuse tests at final integration (Session 17), fix any that break |

### Legal & Compliance
- 9 legal pages with dynamic variable replacement
- Cookie consent banner
- MFA and password requirement settings (admin-configurable)

---

<a id="open-issues-tracker"></a>

## 5. Open Issues Tracker

These are known issues that will be addressed at specific points during the build. Every initialization prompt should remind the agent of any open issues relevant to that module.

| # | Issue | Severity | When to Fix | Details |
|---|-------|----------|------------|---------|
| 1 | `RESEND_API_KEY` — secret name may be incorrect | Medium | Session 7 (email) | Emails work in monolithic app. Secret may be under wrong name. Check pre-crash GitHub code. Keys available from Resend dashboard. |
| 2 | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — not in secrets | Medium | Session 6 (billing) | Stripe is in dev mode. Client-side checkout needs this key. Keys available. |
| 3 | Plausible — not fully integrated | Low | Session 18 (production) | Was conflicting with Next.js version at time of integration. Believed to be resolved now. Return to this post-rebuild. |
| 4 | n8n agents — not connected | Low | Session 18 (production) | Webhook architecture exists (8 event types, HMAC signing). n8n agents themselves not wired up yet. |
| 5 | Next.js version mismatch — docs say 16+, code is 14.2.18 | Info | All sessions | **Decision: Stay on 14.2.18 for stability.** Do NOT upgrade during rebuild. Consider upgrade post-launch. |
| 6 | Supabase Storage buckets — custom buckets not documented | Medium | Session 4 (database) | User will share bucket details before database module is built. |
| 7 | 7 of 10 social platform APIs are stubbed | Low | Post-launch | Twitter/X, LinkedIn, Instagram have full implementations. Other 7 platforms have stubbed methods. |
| 8 | 100 Playwright E2E tests — need migration | Low | Session 17 (final integration) | Tests exist in pre-crash GitHub repo. Reuse at integration time, fix any that break due to restructuring. |

### How Open Issues Affect Module Sessions

- **Sessions 2-3 (shared, design-system):** No open issues affect these modules.
- **Session 4 (database):** Issue #6 — need Supabase Storage bucket details from user before starting.
- **Session 5 (auth):** No open issues. Note: Next.js stays at 14.2.18 (Issue #5).
- **Session 6 (billing):** Issue #2 — add `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to secrets.
- **Session 7 (email):** Issue #1 — investigate and fix `RESEND_API_KEY` naming.
- **Session 8 (services):** No open issues for this module directly.
- **Sessions 10-13 (admin, cms, affiliate):** No open issues.
- **Sessions 15-16 (PassivePost):** Issue #7 — 7 platform APIs are stubbed. Build the stubs as-is, do not try to implement full APIs.
- **Session 17 (final integration):** Issue #8 — migrate and run Playwright tests.
- **Session 18 (production):** Issues #3, #4 — integrate Plausible and n8n.

---

<a id="repeatable-process"></a>

## 6. How Each Module Session Works (Your Repeatable Process)

Every module follows the exact same process. Once you do it once, you'll be able to do it in your sleep.

### Step 1: Create the Repl (~1 minute)

1. Go to [replit.com](https://replit.com)
2. Click **Create Repl**
3. Choose **Import from GitHub**
4. Paste the repo URL (e.g., `https://github.com/SpeckledDarth/musekit-shared`)
5. Click **Import**
6. Replit creates a new Repl linked to that GitHub repo

### Step 2: Add Secrets (~1-3 minutes)

Each module needs a different set of secrets. Look up the module in **Section 2B** above — it has the exact list for every Repl, including quick-copy lists.

1. In the new Repl, go to **Secrets** (lock icon in the sidebar)
2. Find the module's "Quick Copy List" in Section 2B
3. Add each secret listed there — copy the values from your monolithic app's secrets

**Tip:** Two modules need zero secrets (shared and design-system). Most modules need 3-6 secrets. The PassivePost module is the heaviest at 19 secrets because it connects to all social platforms.

### Step 3: Choose Build Mode

When Replit asks "Plan or Build?" — choose **Build**.

### Step 4: Paste the Initialization Prompt (~30 seconds)

Copy the initialization prompt for that module (provided in Section 12 of this guide) and paste it as your first message to the agent.

The prompt tells the agent:
- What this module is
- What to build (every export, every component, every function)
- What Supabase tables to interact with
- What packages to install
- Where to find the reference code in your existing GitHub repo
- What rules to follow

### Step 5: Let the Agent Work

The agent will:
1. Install Node.js and dependencies
2. Create the `replit.md` (so future sessions remember what this Repl is)
3. Create `MODULE.md` (the contract document)
4. Build the module by reorganizing your existing code into the package format
5. Test that it works

### Step 6: Verify the Work (See Section 10)

Before you consider a module "done," you verify it using the checklist in Section 10.

### Step 7: Confirm Code Is Pushed to GitHub

The Repl auto-commits to GitHub, but double-check:
1. Go to the GitHub repo for this module
2. Confirm you see the `src/` folder, `package.json`, `MODULE.md`, and `replit.md`
3. If you see them, this module is safely stored

### That's It — Move to the Next Module

---

<a id="phase-1"></a>

## 7. Phase 1: Foundation Modules (Sessions 2-4)

These modules have zero dependencies on other modules. They're the building blocks everything else uses.

### Session 2: `musekit-shared`

**Create Repl:** Import from `github.com/SpeckledDarth/musekit-shared`  
**Secrets needed:** None  
**Time estimate:** This is a small module — should complete in one session easily  
**What gets built:**
- TypeScript type definitions (User, Organization, Subscription, etc.)
- Utility functions (formatCurrency, formatDate, slugify, cn, etc.)
- App constants and configuration
- Role definitions and permission maps

**Where your existing code lives:**
- Types: Look in `src/types/` or `src/lib/types.ts` in your existing repo
- Utilities: Look in `src/lib/utils.ts` or `src/utils/` in your existing repo

**When done:** This module is imported by every other module. It must be finished and pushed to GitHub before you start Session 3.

---

### Session 3: `musekit-design-system`

**Create Repl:** Import from `github.com/SpeckledDarth/musekit-design-system`  
**Secrets needed:** None (no database or API access)  
**Time estimate:** This is a larger module — may be tight for one session  
**What gets built:**
- 30+ React UI components
- Design tokens (colors, spacing, shadows)
- The 950-scale CSS variable system
- Tailwind CSS configuration
- Dark mode support

**Where your existing code lives:**
- Components: Look in `src/components/ui/` in your existing repo (shadcn/ui components)
- Tokens/colors: Look in your CSS Dashboard Repl and `src/app/globals.css`

**When done:** This module provides every UI component. Must be on GitHub before Session 5.

---

### Session 4: `musekit-database`

**Create Repl:** Import from `github.com/SpeckledDarth/musekit-database`  
**Secrets needed:** NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY  
**Time estimate:** One session  
**What gets built:**
- Supabase client wrapper (browser + server)
- TypeScript types matching your existing database schema
- Migration SQL files (documenting what already exists in your Supabase project)
- Seed data scripts
- Reusable query helpers (getUserById, getOrgMembers, etc.)

**Important: This module does NOT create or modify your database.** Your Supabase database already exists and works. This module just provides the code layer to interact with it.

**Where your existing code lives:**
- Supabase client: Look in `src/lib/supabase/` in your existing repo
- Migrations: Look in `migrations/core/` and `migrations/extensions/`
- Types: Look in `src/types/database.ts` or similar

**When done:** This module is how every other module talks to the database. Must be on GitHub before Session 5.

---

<a id="phase-2"></a>

## 8. Phase 2: Core Service Modules (Sessions 5-8)

These modules depend on Phase 1 modules. They provide the core services (auth, billing, email, etc.) that the feature modules build on top of.

### Session 5: `musekit-auth`

**Create Repl:** Import from `github.com/SpeckledDarth/musekit-auth`  
**Secrets needed:** Supabase credentials  
**Depends on:** musekit-shared (must be on GitHub), musekit-database (must be on GitHub), musekit-design-system (must be on GitHub)  
**What gets built:** Login/signup pages, OAuth flows (Google, GitHub, Apple, Twitter/X, Magic Link), middleware, protected routes, SSO/SAML  

**Where your existing code lives:**
- Auth pages: `src/app/(auth)/` in your existing repo
- Auth lib: `src/lib/auth/` or `src/lib/supabase/auth`
- Auth components: `src/components/auth/`
- Middleware: `src/middleware.ts`

---

### Session 6: `musekit-billing`

**Create Repl:** Import from `github.com/SpeckledDarth/musekit-billing`  
**Secrets needed:** Supabase credentials + Stripe keys  
**Depends on:** musekit-shared, musekit-database  
**What gets built:** Stripe subscriptions, checkout, customer portal, webhook handler, feature gating, Product Registry  

**Where your existing code lives:**
- Stripe lib: `src/lib/stripe/` in your existing repo
- Billing API routes: `src/app/api/stripe/` or `src/app/api/billing/`
- Pricing components: `src/components/pricing/`

---

### Session 7: `musekit-email`

**Create Repl:** Import from `github.com/SpeckledDarth/musekit-email`  
**Secrets needed:** Supabase credentials + `RESEND_API_KEY`  
**Depends on:** musekit-shared, musekit-database, musekit-design-system  
**What gets built:** Resend integration, email templates, template editor, scheduled KPI reports  

**Where your existing code lives:**
- Email lib: `src/lib/email/` or `src/lib/resend/` in your existing repo
- Email templates: `src/emails/` or `src/components/email/`
- Email API routes: `src/app/api/email/`

---

### Session 8: `musekit-services`

**Create Repl:** Import from `github.com/SpeckledDarth/musekit-services`  
**Secrets needed:** Supabase credentials + `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` + `XAI_API_KEY` (or OpenAI/Anthropic key)  
**Depends on:** musekit-shared, musekit-database  
**What gets built:** Notifications, webhooks, AI provider, BullMQ jobs, rate limiting  

**Where your existing code lives:**
- Notifications: `src/lib/notifications/` and `src/components/notifications/`
- Webhooks: `src/lib/webhooks/`
- AI: `src/lib/ai/`
- Jobs: `src/lib/jobs/` or `src/lib/queue/`

---

<a id="phase-3"></a>

## 9. Phase 3: First Integration Checkpoint (Session 9)

**This session happens in THIS Repl** (musekit-web / master-saas-muse). You do NOT create a new Repl.

### What You Do

1. Open this Repl (the one you're reading this in right now)
2. Choose Build mode
3. Paste this prompt:

```
Integration checkpoint. Pull all finished Tier 1 and Tier 2 modules into the 
Turborepo monorepo.

The following modules are complete and pushed to GitHub:
- @musekit/shared: github.com/SpeckledDarth/musekit-shared
- @musekit/design-system: github.com/SpeckledDarth/musekit-design-system
- @musekit/database: github.com/SpeckledDarth/musekit-database
- @musekit/auth: github.com/SpeckledDarth/musekit-auth
- @musekit/billing: github.com/SpeckledDarth/musekit-billing
- @musekit/email: github.com/SpeckledDarth/musekit-email
- @musekit/services: github.com/SpeckledDarth/musekit-services

For each module:
1. Clone/pull the code from its GitHub repo
2. Place it in the packages/ directory (e.g., packages/auth/)
3. Update its package.json to use workspace dependencies ("*") instead of GitHub references
4. Wire the pages and API routes into the Next.js app in apps/web/

After all modules are placed:
1. Run npm install to link workspaces
2. Start the dev server and verify the app compiles
3. Test that you can reach the login page, see the landing page, and access basic routes

Read MULTI_REPL_PLAN.md and replit.md for full project context.
```

### What the Agent Does

The agent in this Repl:
- Pulls each module's code from GitHub into `packages/`
- Wires up the Next.js app to import from all packages
- Runs the app to verify everything works together
- Fixes any integration issues (usually minor import path adjustments)

### What You Verify

- The app starts and the landing page loads
- You can navigate to the login page
- The basic structure works end-to-end

### After This Checkpoint

You have a running integrated app with auth, billing, email, and core services. Even without the admin dashboard or PassivePost, the infrastructure works.

---

<a id="phase-4"></a>

## 10. Phase 4: Feature Modules (Sessions 10-14)

### Sessions 10-11: `musekit-admin` (2 sessions)

**Create Repl:** Import from `github.com/SpeckledDarth/musekit-admin`  
**Secrets needed:** Supabase credentials + Stripe keys  
**Depends on:** musekit-shared, musekit-database, musekit-design-system, musekit-auth, musekit-billing  
**What gets built:** The entire admin dashboard — overview, user management, metrics, setup dashboard (11 sub-pages), feature toggles, audit logs, impersonation  

**This is the biggest module.** It will take 2 sessions:
- **Session 10:** Admin layout, overview page, user management, metrics dashboard
- **Session 11:** Open the same Repl again, paste a continuation prompt, and it builds the setup dashboard, feature toggles, audit logs, and impersonation

**Where your existing code lives:**
- Admin pages: `src/app/admin/` or `src/app/(admin)/` in your existing repo
- Admin components: `src/components/admin/`
- Admin API routes: `src/app/api/admin/`

---

### Session 12: `musekit-cms`

**Create Repl:** Import from `github.com/SpeckledDarth/musekit-cms`  
**Secrets needed:** Supabase credentials  
**Depends on:** musekit-shared, musekit-database, musekit-design-system  
**What gets built:** Blog/changelog, 14 landing page sections, 9 legal pages, SEO/sitemap, waitlist, feedback widget  

**Where your existing code lives:**
- Blog: `src/app/blog/` or `src/app/(marketing)/`
- Landing sections: `src/components/landing/` or `src/components/marketing/`
- Legal pages: `src/app/(legal)/`

---

### Session 13: `musekit-affiliate`

**Create Repl:** Import from `github.com/SpeckledDarth/musekit-affiliate`  
**Secrets needed:** Supabase credentials + Stripe keys  
**Depends on:** musekit-shared, musekit-database, musekit-design-system, musekit-billing  
**What gets built:** Affiliate dashboard, referrals, earnings, payouts, admin affiliate management  

**Where your existing code lives:**
- Affiliate pages: `src/app/affiliate/` or `src/app/(affiliate)/`
- Affiliate components: `src/components/affiliate/`
- Admin affiliate: `src/app/admin/affiliates/`

---

### Session 14: Second Integration Checkpoint

**This happens in THIS Repl again** (musekit-web). Same process as Session 9 but now pulling in admin, cms, and affiliate modules. You paste a similar integration prompt listing the new modules.

After this checkpoint: You have the full MuseKit core running — admin dashboard, CMS, affiliate, everything except PassivePost.

---

<a id="phase-5"></a>

## 11. Phase 5: PassivePost (Sessions 15-17)

### Sessions 15-16: `musekit-passivepost` (2 sessions)

**Create Repl:** Import from `github.com/SpeckledDarth/musekit-passivepost`  
**Secrets needed:** Supabase credentials + Stripe keys + any social OAuth keys  
**Depends on:** musekit-shared, musekit-database, musekit-design-system, musekit-auth, musekit-billing, musekit-services  
**What gets built:** 10-page social dashboard, AI post generation, 10-platform OAuth, brand preferences, analytics, autopilot  

**Session 15:** Dashboard layout, compose, queue, calendar, brand preferences  
**Session 16:** Analytics, intelligence, autopilot, social OAuth connections, 4 job types  

**Where your existing code lives:**
- Social pages: `src/app/social/` or `src/app/(social)/` in your existing repo
- Social components: `src/components/social/`
- Social API routes: `src/app/api/social/`

---

### Session 17: Final Integration

**This Repl** (musekit-web). Pull PassivePost into the monorepo. Run full end-to-end testing. Polish rough edges.

After this: The complete app is assembled and working.

---

<a id="phase-6"></a>

## 12. Phase 6: Production Launch (Session 18)

**This Repl** (musekit-web). Configure Vercel deployment, switch to production Supabase, set Stripe to live mode, configure Sentry and Plausible, set up custom domain.

After this: Live in production.

---

<a id="verify-work"></a>

## 13. How to Verify Each Session's Work

After every session, before you consider a module "done," check these items:

### Quick Checklist (takes ~5 minutes)

- [ ] **Does the Repl show a running state?** (No red errors in the console)
- [ ] **Does `replit.md` exist?** Open the file — it should describe what this module is
- [ ] **Does `MODULE.md` exist?** Open it — it should list all exports and dependencies
- [ ] **Does `package.json` exist with the right name?** (e.g., `"name": "@musekit/auth"`)
- [ ] **Does `src/index.ts` exist?** This is the main export file — it should list everything the module provides
- [ ] **Is the code on GitHub?** Go to the GitHub repo and confirm you see the files
- [ ] **Does the module match the initialization prompt?** Compare what was requested vs. what was built. If the agent said "done" but exports are missing, that's a problem — start a new session in that same Repl to finish.

### If a Session Left Work Incomplete

This is the exact scenario you've been burned by before. Here's how to handle it:

1. Open the same Repl (do NOT create a new one)
2. Choose Build mode
3. Paste this:
   ```
   Continue building the @musekit/[name] module. Read replit.md and MODULE.md 
   to understand what this module is. Check src/index.ts to see what has been 
   built so far. Complete any missing exports listed in MODULE.md that are not 
   yet implemented.
   ```
4. The agent reads the existing files, sees what's missing, and picks up where the previous session left off

**This is why MODULE.md matters** — it's the checklist. You can compare it against what actually exists in `src/index.ts` and know immediately what's done and what's not.

---

<a id="timeline"></a>

## 14. Timeline for 4/1/26 Launch

Today is approximately March 4, 2026. Launch target is April 1, 2026 — roughly **28 days**.

| Week | Days | Sessions | What Gets Done |
|------|------|----------|----------------|
| **Week 1** (Mar 4-10) | 7 | Sessions 2-6 | Foundation (shared, design-system, database) + Auth + Billing |
| **Week 2** (Mar 11-17) | 7 | Sessions 7-11 | Email + Services + Integration Checkpoint 1 + Admin (both parts) |
| **Week 3** (Mar 18-24) | 7 | Sessions 12-16 | CMS + Affiliate + Integration Checkpoint 2 + PassivePost (both parts) |
| **Week 4** (Mar 25-31) | 7 | Sessions 17-18 + buffer | Final Integration + Production Launch + buffer days for issues |

**This works at 1 session per day with weekends off.** If you can do 2 sessions some days, you'll have even more buffer.

**Why this is faster than building from scratch:**
- Your existing code is the reference — sessions are reorganizing, not inventing
- Your database already works — no schema design time
- Your Supabase auth is already configured — just wrapping existing flows
- Your Stripe integration already works — just restructuring the code

**Risk buffer:** Week 4 has 3-4 buffer days for:
- Sessions that need a second pass (incomplete work)
- Integration issues that take longer than expected
- Any surprises

---

<a id="initialization-prompts"></a>

## 15. Quick Reference — All Initialization Prompts

Save these somewhere accessible (a Google Doc, a local file, wherever). When it's time to start a new module, just copy-paste the right one.

---

### Session 2 Prompt: `musekit-shared`

```
You are building the @musekit/shared package for the MuseKit SaaS platform.

This is a standalone npm package that provides shared types, utilities, and 
configuration used by every other module in the system.

## What to Build

### TypeScript Types (src/types.ts)
Export these interfaces:
- User: id, email, name, avatar_url, role (admin/member/viewer), created_at, updated_at
- Organization: id, name, slug, owner_id, created_at
- TeamMember: id, org_id, user_id, role, joined_at
- Subscription: id, user_id, stripe_customer_id, stripe_subscription_id, plan, status (active/canceled/past_due/trialing), current_period_end
- AuditLogEntry: id, user_id, action, resource_type, resource_id, metadata, ip_address, created_at
- Notification: id, user_id, type, title, message, read, created_at
- BrandSettings: app_name, logo_url, primary_color, accent_color, hero_style, header_bg, header_text, footer_bg, footer_text
- FeatureToggle: id, key, label, description, enabled
- NavItem: title, href, icon, badge, children, roles
- AppConfig: name, description, url, support, billing, features

### Utility Functions (src/utils.ts)
- cn(...inputs) — Tailwind class merger using clsx + tailwind-merge
- formatCurrency(amount, currency) — Money formatting
- formatDate(date) — Date formatting (e.g., "Mar 4, 2026")
- slugify(text) — URL slug generation
- truncate(str, length) — Text truncation with ellipsis
- generateId() — UUID generation

### Configuration (src/config.ts)
- APP_CONFIG object with app name, description, URL, support email, billing provider, feature flags

### Package Setup
- name: "@musekit/shared"
- Install: clsx, tailwind-merge
- Create replit.md describing this module
- Create MODULE.md listing all exports

### Reference Code
The original implementation is at github.com/SpeckledDarth/master-saas-muse
Look in: src/lib/utils.ts, src/types/, src/lib/config.ts

### Rules
- Do NOT add any dependencies beyond clsx and tailwind-merge
- Do NOT connect to any database or API
- Export everything from src/index.ts
- This module must have ZERO side effects — it's pure types and functions
```

---

### Session 3 Prompt: `musekit-design-system`

```
You are building the @musekit/design-system package for the MuseKit SaaS platform.

This is a standalone React component library providing all reusable UI components.
It uses Tailwind CSS, class-variance-authority for variants, and a 950-scale 
CSS variable color system.

## What to Build

### Design Tokens (src/tokens/colors.ts)
- Primary color palette: 50/100/200/300/400/500/600/700/800/900/950
- Gray palette: same scale
- Semantic colors: success, warning, error, info
- Spacing, radius, and shadow tokens

### UI Components (src/components/)
Build these components using Tailwind CSS + CVA for variants:

**Layout:** Sidebar, SidebarItem, SidebarSection, Separator
**Forms:** Button (with loading state, variants: default/destructive/outline/secondary/ghost/link), Input, Label, Select, Switch, Textarea, Checkbox
**Display:** Card (with Header/Title/Description/Content/Footer), Badge (variants: default/secondary/success/warning/destructive/outline), Avatar (with fallback initials), Table (with Header/Body/Row/Cell)
**Navigation:** Tabs (with TabsList/TabsTrigger/TabsContent), Dropdown (with trigger/content/item)
**Feedback:** Toast (success/error/warning variants), Alert, Progress bar, Skeleton loader
**Overlay:** Dialog (with trigger/content/header/footer), Sheet (slide-out panel), Popover, Tooltip
**Theming:** ThemeToggle (dark/light mode)

### Interactive State Utilities (src/styles/)
- hover-elevate utility class
- active-elevate-2 utility class
- CSS variables for --primary-50 through --primary-950

### Dependencies
- Install: @musekit/shared (from github:SpeckledDarth/musekit-shared)
- Install: class-variance-authority, clsx, tailwind-merge, lucide-react
- Peer deps: react, react-dom

### Reference Code
The original implementation is at github.com/SpeckledDarth/master-saas-muse
Look in: src/components/ui/ (shadcn components)
Also reference the CSS Dashboard Repl for the 950-scale color system

### Rules
- Every component must support dark mode via the "dark:" Tailwind prefix
- Every component uses the cn() utility for class merging
- No database or API access — this is pure UI
- Export everything from src/index.ts
- Create replit.md and MODULE.md
```

---

### Session 4 Prompt: `musekit-database`

```
You are building the @musekit/database package for the MuseKit SaaS platform.

This module provides the Supabase client code and TypeScript types for an 
EXISTING database. The database already exists in Supabase with all tables 
created. You are NOT creating tables — you are writing the code layer to 
interact with them.

## What to Build

### Supabase Clients (src/client.ts)
- createBrowserClient() — for client-side React components
- createServerClient(cookieStore) — for Next.js server components and API routes
- createAdminClient() — using service role key for admin operations
- Uses @supabase/ssr and @supabase/supabase-js

### Database Types (src/schema.ts)
TypeScript types matching these existing Supabase tables:

Core tables:
- profiles (id, email, full_name, avatar_url, role, created_at, updated_at)
- organizations (id, name, slug, owner_id, created_at)
- team_members (id, org_id, user_id, role, joined_at)
- team_invitations (id, org_id, email, role, invited_by, token, expires_at, accepted_at)
- subscriptions (id, user_id, stripe_customer_id, stripe_subscription_id, plan, status, current_period_end, created_at)
- audit_logs (id, user_id, action, resource_type, resource_id, metadata, ip_address, created_at)
- notifications (id, user_id, type, title, message, read, created_at)
- brand_settings (id, app_name, logo_url, primary_color, accent_color, hero_style, header_bg, header_text, footer_bg, footer_text, updated_at)
- feature_toggles (id, key, label, description, enabled, updated_at)
- content_posts (id, title, slug, content, status, author_id, published_at, created_at)
- waitlist (id, email, created_at)
- feedback (id, user_id, message, nps_score, created_at)
- webhook_configs (id, url, secret, enabled, events, created_at)
- email_templates (id, name, subject, body, variables, updated_at)
- api_keys (id, service, key_encrypted, source, created_at)

Extension tables (PassivePost):
- social_posts (id, user_id, content, platforms, status, scheduled_at, published_at, created_at)
- social_accounts (id, user_id, platform, account_name, access_token, refresh_token, connected_at, validated_at)
- brand_preferences (id, user_id, business_niche, brand_tone, target_audience, location, posting_goals, posting_frequency, sample_urls, created_at)
- social_analytics (id, post_id, platform, likes, shares, comments, reach, impressions, recorded_at)
- post_queue (id, user_id, post_id, position, scheduled_at)

### Query Helpers (src/queries.ts)
Reusable query functions:
- getUserById(id), getUserByEmail(email)
- getOrganization(id), getOrgMembers(orgId)
- getSubscription(userId)
- getNotifications(userId, unreadOnly?)
- getAuditLogs(filters), createAuditLog(entry)
- getBrandSettings(), updateBrandSettings(settings)
- getFeatureToggles(), updateFeatureToggle(key, enabled)

### Migration Documentation (src/migrations/)
SQL files documenting the existing schema (for reference only — do NOT run these 
against the live database). These serve as documentation of what exists.

### Dependencies
- Install: @musekit/shared (from github:SpeckledDarth/musekit-shared)
- Install: @supabase/supabase-js, @supabase/ssr

### Supabase Connection
- Uses environment secrets: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
- The database already exists — do NOT create or modify tables
- Test queries against the real Supabase project to verify types match

### Reference Code
The original implementation is at github.com/SpeckledDarth/master-saas-muse
Look in: src/lib/supabase/, migrations/core/, migrations/extensions/, src/types/database.ts

### Rules
- Export everything from src/index.ts
- Create replit.md and MODULE.md
- Do NOT modify the existing Supabase database schema
- Types must exactly match the existing tables
```

---

### Session 5 Prompt: `musekit-auth`

```
You are building the @musekit/auth package for the MuseKit SaaS platform.

This module provides the complete authentication system using Supabase Auth.
The Supabase project already has auth configured with OAuth providers.

## What to Build

### Auth Clients (src/clients.ts)
- createBrowserClient() and createServerClient() wrappers
- These use the Supabase clients from @musekit/database

### Auth Provider (src/provider.tsx)
- AuthProvider React context
- useAuth() hook returning: user, loading, signIn, signUp, signOut, signInWithOAuth

### Page Components (src/components/)
- LoginForm — email/password fields + OAuth buttons (Google, GitHub, Apple, Twitter/X) + Magic Link option
- SignupForm — email/password + OAuth + email verification flow
- PasswordResetForm — request reset + confirm new password
- OAuthCallback — handles OAuth redirect

### Middleware (src/middleware.ts)
- authMiddleware() — Next.js middleware for protected routes
- Checks session, redirects unauthenticated users to /login
- Allows public routes (/, /login, /signup, /api/auth/*)

### Route Protection (src/guards.ts)
- withAuth(Component) — HOC that wraps a page with auth check
- withRole(Component, role) — HOC that checks user role (admin, member, viewer)
- requireAuth(request) — Server-side auth check for API routes

### Dependencies
- @musekit/shared (from github:SpeckledDarth/musekit-shared)
- @musekit/database (from github:SpeckledDarth/musekit-database)
- @musekit/design-system (from github:SpeckledDarth/musekit-design-system)

### Supabase Tables Used
- profiles (read/write — user profile data)
- organizations (read — org membership checks)
- team_members (read — role checks)
- feature_toggles (read — which OAuth providers are enabled)

### Reference Code
Original: github.com/SpeckledDarth/master-saas-muse
Look in: src/app/(auth)/, src/lib/auth/, src/components/auth/, src/middleware.ts

### Rules
- All form components use @musekit/design-system components (Button, Input, Card, Label)
- OAuth provider buttons should check feature_toggles to show/hide based on admin settings
- Create replit.md and MODULE.md
- Export everything from src/index.ts
```

---

### Sessions 6-8 Prompts

These follow the same pattern. I will write the full prompts for billing, email, and services when you're ready to start those sessions. Each prompt will be this detailed — specifying every export, every table, every dependency, and pointing to the exact location in your existing codebase.

---

### Session 9 Prompt: Integration Checkpoint 1

```
Integration checkpoint. Read replit.md and MULTI_REPL_PLAN.md for context.

Pull all finished Tier 1 and Tier 2 modules into the Turborepo monorepo.

Modules to integrate (all on GitHub under SpeckledDarth):
- musekit-shared → packages/shared/
- musekit-design-system → packages/design-system/
- musekit-database → packages/database/
- musekit-auth → packages/auth/
- musekit-billing → packages/billing/
- musekit-email → packages/email/
- musekit-services → packages/services/

For each:
1. Pull the code from its GitHub repo into the packages/ directory
2. Update package.json dependencies from "github:..." to workspace "*"
3. Wire pages and API routes into apps/web/

After integration:
1. Run npm install
2. Start the dev server (port 5000)
3. Verify the app compiles and the landing page loads
4. Verify the login page renders
5. Fix any import path or type mismatch issues
```

---

### Sessions 10-18 Prompts

Same pattern — I will write these when you reach those sessions. Each one will be fully detailed with exports, tables, dependencies, and reference code locations.

---

## Final Notes

### What You're NOT Responsible For
- Writing code
- Debugging technical issues
- Understanding TypeScript or React internals
- Managing npm packages

### What You ARE Responsible For
- Creating Repls and linking them to GitHub repos (~1 min each)
- Adding Supabase/Stripe secrets to each Repl (~1 min each)
- Pasting the initialization prompt (~30 seconds)
- Verifying the work using the checklist in Section 10 (~5 min)
- Moving to the next module when one is complete

### Your Daily Routine During Build
1. Check: Is the current module done? (Use the Section 10 checklist)
2. If yes: Create the next Repl, paste the prompt, let it build
3. If no: Open the same Repl, paste the continuation prompt, let it finish
4. At integration checkpoints: Open this Repl, paste the integration prompt
5. Total daily time investment: **~15-30 minutes of active work** + letting the agent run

### If Something Goes Wrong
- **Agent quit mid-session:** Open the same Repl, paste the continuation prompt. MODULE.md tells the next session what's missing.
- **Module has bugs:** Open the same Repl, describe the bug. The session has full context of just that module.
- **Integration fails:** The issue is isolated to one module. Fix that one module in its Repl, then re-integrate.
- **Catastrophic failure:** Roll back that one Repl from GitHub. Everything else is untouched. This is the whole point.
