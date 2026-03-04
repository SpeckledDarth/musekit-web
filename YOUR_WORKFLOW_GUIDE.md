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

### Session 6 Prompt: `musekit-billing`

```
You are building the @musekit/billing package for the MuseKit SaaS platform.

This is a standalone npm package that provides the complete Stripe billing system.
The Stripe account exists but is in DEVELOPMENT MODE (test keys only).

## Tech Stack Rules
- Next.js 14.2.18 (do NOT use 15+ or 16+ features)
- React 18.3.1
- Tailwind CSS v3.4.x (do NOT upgrade to v4)
- TypeScript strict mode

## What to Build

### Stripe Client (src/stripe.ts)
- Initialize Stripe with STRIPE_SECRET_KEY
- Initialize client-side Stripe with NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

### Plan Definitions (src/plans.ts)
- Plan tiers with feature limits:
  - Starter: $0/mo (free), basic features
  - Basic: $29/mo, expanded limits
  - Premium: $99/mo, unlimited
- Feature limits per tier (posts, accounts, team members, storage, etc.)
- Monthly and annual billing options

### Checkout (src/checkout.ts)
- createCheckoutSession(userId, planId, interval) — creates Stripe checkout
- createCustomerPortalSession(userId) — redirect to Stripe customer portal
- getSubscriptionStatus(userId) — returns current plan and status

### Webhook Handler (src/webhooks.ts)
- verifyWebhookSignature(payload, signature)
- Handle these events:
  - checkout.session.completed — create/update subscription record
  - customer.subscription.updated — sync plan changes
  - customer.subscription.deleted — mark subscription canceled
  - invoice.payment_succeeded — record successful payment
  - invoice.payment_failed — mark subscription past_due

### Feature Gating (src/gating.ts)
- checkFeatureAccess(userId, feature) — can user use this feature?
- getFeatureLimits(plan) — returns limits for a plan
- isWithinLimit(userId, feature, currentUsage) — is user under their limit?
- requirePlan(minimumPlan) — middleware/guard for API routes

### Product Registry (src/registry.ts)
- Multi-product tier resolution system
- registerProduct(productConfig) — register a product's tier structure
- resolveUserTier(userId, productId) — determine user's tier for a product

### Subscription Helpers (src/helpers.ts)
- isActive(subscription) — boolean
- isPastDue(subscription) — boolean
- isCanceled(subscription) — boolean
- isTrialing(subscription) — boolean
- daysUntilRenewal(subscription) — number
- formatPlanName(plan) — display string

### Dependencies
- Install: @musekit/shared (from github:SpeckledDarth/musekit-shared)
- Install: @musekit/database (from github:SpeckledDarth/musekit-database)
- Install: stripe

### Supabase Tables Used
- subscriptions (read/write — subscription records)
- profiles (read — user lookup for Stripe customer ID)

### Environment Secrets Needed
- STRIPE_SECRET_KEY
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (Open Issue #2 — add this key)
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY

### Reference Code
Original: github.com/SpeckledDarth/master-saas-muse
Look in: src/lib/stripe/, src/app/api/stripe/, src/app/api/billing/, src/components/pricing/

### Rules
- Stripe is in DEVELOPMENT MODE — use test keys only
- Export everything from src/index.ts
- Create replit.md and MODULE.md
- Do NOT create UI components — billing UI lives in admin and web app
- This module is logic/API only (checkout, webhooks, gating, helpers)
```

---

### Session 7 Prompt: `musekit-email`

```
You are building the @musekit/email package for the MuseKit SaaS platform.

This is a standalone npm package that provides the complete email system using Resend.

## Tech Stack Rules
- Next.js 14.2.18 (do NOT use 15+ or 16+ features)
- React 18.3.1
- Tailwind CSS v3.4.x (do NOT upgrade to v4)
- TypeScript strict mode

## What to Build

### Resend Client (src/client.ts)
- Initialize Resend with RESEND_API_KEY
- sendEmail(to, subject, html, options?) — send a single email
- sendBatchEmails(emails[]) — send multiple emails

### Email Templates (src/templates/)
Build React email templates using @react-email/components:
- WelcomeEmail — sent after signup
- VerificationEmail — email verification link
- PasswordResetEmail — password reset link
- SubscriptionConfirmEmail — after successful checkout
- SubscriptionCanceledEmail — after cancellation
- TeamInvitationEmail — invite to join organization
- KPIReportEmail — weekly/monthly metrics summary with KPI data

Each template should:
- Accept dynamic props (userName, actionUrl, etc.)
- Use consistent branding (app name, colors from BrandSettings)
- Support both HTML and plain text fallback

### Template Editor (src/editor.tsx)
- EmailTemplateEditor component — admin UI for editing templates
- Live preview panel (shows rendered email)
- Variable insertion ({{userName}}, {{actionUrl}}, etc.)
- Test email sending (send preview to admin's email)

### Template Variable System (src/variables.ts)
- replaceVariables(template, variables) — replace {{var}} placeholders
- getAvailableVariables(templateType) — list variables for a template type
- validateTemplate(template) — check for missing variables

### Scheduled Reports (src/reports.ts)
- generateKPIReport(period: 'weekly' | 'monthly') — gather KPI data
- scheduleReport(config) — configure report schedule
- sendScheduledReport(reportData) — format and send via Resend

### Dependencies
- Install: @musekit/shared (from github:SpeckledDarth/musekit-shared)
- Install: @musekit/database (from github:SpeckledDarth/musekit-database)
- Install: @musekit/design-system (from github:SpeckledDarth/musekit-design-system)
- Install: resend, @react-email/components

### Supabase Tables Used
- email_templates (read/write — custom templates stored by admin)
- profiles (read — user info for template variables)
- brand_settings (read — app name, colors for email branding)
- subscriptions (read — for KPI report data)

### Environment Secrets Needed
- RESEND_API_KEY (Open Issue #1 — check if this exists under a different name in the monolithic app. If not found, use the key from Resend dashboard.)
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY

### Reference Code
Original: github.com/SpeckledDarth/master-saas-muse
Look in: src/lib/email/, src/lib/resend/, src/emails/, src/components/email/, src/app/api/email/

### Rules
- Export everything from src/index.ts
- Create replit.md and MODULE.md
- Template editor component uses @musekit/design-system components
- All templates must render correctly in dark AND light email clients
```

---

### Session 8 Prompt: `musekit-services`

```
You are building the @musekit/services package for the MuseKit SaaS platform.

This is a standalone npm package that bundles four backend subsystems:
notifications, webhooks, AI provider, and background jobs.

## Tech Stack Rules
- Next.js 14.2.18 (do NOT use 15+ or 16+ features)
- React 18.3.1
- Tailwind CSS v3.4.x (do NOT upgrade to v4)
- TypeScript strict mode

## What to Build

### Notifications Subsystem (src/notifications/)

#### Server-side (src/notifications/server.ts)
- createNotification(userId, type, title, message) — insert into DB
- getUnreadCount(userId) — count unread notifications
- markAllRead(userId) — mark all as read
- getNotifications(userId, options?) — paginated list

#### Client-side Components (src/notifications/components.tsx)
- NotificationBell — bell icon with unread count badge
- NotificationPopover — dropdown showing recent notifications with type-specific icons
- Uses auto-polling to check for new notifications

### Webhooks Subsystem (src/webhooks/)

#### Webhook Dispatcher (src/webhooks/dispatcher.ts)
- dispatchWebhook(event, payload) — fire webhook for an event
- 8 event types: feedback_submitted, waitlist_entry, subscription_created, subscription_updated, subscription_canceled, team_invitation_sent, team_member_joined, contact_form_submitted
- HMAC-SHA256 payload signing using webhook secret
- Fire-and-forget delivery with retry logic (3 retries, exponential backoff)

#### Webhook Config (src/webhooks/config.ts)
- getWebhookConfig() — read webhook URL, secret, enabled events from DB
- updateWebhookConfig(config) — save webhook settings
- validateWebhookUrl(url) — verify URL is reachable

### AI Provider Subsystem (src/ai/)

#### Provider Abstraction (src/ai/provider.ts)
- createAIProvider(config) — factory that returns provider based on config
- Supports: xAI Grok (XAI_API_KEY), OpenAI, Anthropic
- chatCompletion(messages, options?) — non-streaming response
- streamChatCompletion(messages, options?) — streaming response

#### AI Configuration (src/ai/config.ts)
- getAIConfig() — read provider, model, temperature, max tokens, system prompt from DB
- updateAIConfig(config) — save AI settings

#### Help Widget (src/ai/help-widget.tsx)
- HelpWidget component — floating AI chat button
- Configurable system prompt and fallback email
- NPS rating collection after AI responses
- Independently toggleable via feature_toggles

### Background Jobs Subsystem (src/jobs/)

#### Queue Setup (src/jobs/queue.ts)
- Initialize BullMQ with Upstash Redis connection
- createQueue(name) — create a named queue
- addJob(queue, data, options?) — add job with optional delay/retry

#### 6 Core Job Processors (src/jobs/processors.ts)
- emailDelivery — process queued email sends
- webhookRetry — retry failed webhook deliveries
- reportGeneration — generate scheduled reports
- metricsReport — compile and send KPI reports
- metricsAlert — check thresholds and send alerts
- tokenRotation — automated API token rotation

#### Rate Limiting (src/jobs/rate-limiter.ts)
- createRateLimiter(config) — sliding window algorithm using Upstash Redis
- checkRateLimit(key, limit, window) — returns allowed/denied
- In-memory fallback when Redis is unavailable

### Dependencies
- Install: @musekit/shared (from github:SpeckledDarth/musekit-shared)
- Install: @musekit/database (from github:SpeckledDarth/musekit-database)
- Install: bullmq, @upstash/redis, openai, lucide-react

### Supabase Tables Used
- notifications (read/write — notification CRUD)
- webhook_configs (read/write — webhook settings)
- feature_toggles (read — AI enable/disable, help widget toggle)
- api_keys (read — AI provider key lookup)
- audit_logs (write — log webhook dispatches)

### Environment Secrets Needed
- XAI_API_KEY
- UPSTASH_REDIS_REST_URL
- UPSTASH_REDIS_REST_TOKEN
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY

### Reference Code
Original: github.com/SpeckledDarth/master-saas-muse
Look in: src/lib/notifications/, src/components/notifications/, src/lib/webhooks/, src/lib/ai/, src/lib/jobs/, src/lib/queue/, src/lib/rate-limit/

### Rules
- Export everything from src/index.ts
- Create replit.md and MODULE.md
- NotificationBell and HelpWidget use @musekit/design-system is NOT a dependency — use lucide-react for icons and basic HTML/Tailwind for UI
- The AI provider must be pluggable — never hardcode a specific provider
- Rate limiter MUST have in-memory fallback (do not crash if Redis is down)
```

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

### Sessions 10-11 Prompt: `musekit-admin` (Part 1 — Session 10)

```
You are building the @musekit/admin package for the MuseKit SaaS platform.

This is the LARGEST module in the system. It will be built across 2 sessions.
This is Session 10 (Part 1). Focus on: admin layout, overview, user management,
and metrics dashboard. Session 11 (Part 2) will add the Setup Dashboard and
remaining features.

## Tech Stack Rules
- Next.js 14.2.18 (do NOT use 15+ or 16+ features)
- React 18.3.1
- Tailwind CSS v3.4.x (do NOT upgrade to v4)
- TypeScript strict mode

## What to Build in Part 1

### Admin Layout (src/layout/)
- AdminSidebar — collapsible sidebar with navigation sections
- AdminHeader — search bar, user menu, breadcrumbs
- AdminLayout — wrapper component combining sidebar + header + content area
- Breadcrumb — dynamic breadcrumb navigation

### Overview Page (src/pages/overview.tsx)
- High-level metrics cards (total users, active subs, MRR)
- Quick action cards (manage users, view logs, settings)
- Recent activity feed

### User Management (src/pages/users/)
- UserList — table with search, filter by role/status, pagination
- UserDetail — profile info, subscription status, activity timeline
- TeamMembers — org members view with role management
- AdminNotes — notes system for customer service tracking per user
- UserImpersonation — impersonate user (30-minute sessions with audit logging)

### Metrics Dashboard (src/pages/metrics.tsx)
- 10 KPI cards: Total Users, New Users (30d), Active Subscriptions, MRR, ARPU,
  LTV, Churn Rate, Conversion Rate, Feedback Count, Waitlist Count
- NPS Score card with color-coded Net Promoter Score
- User Growth line chart
- Revenue Growth line chart
- Configurable alert thresholds for churn rate and user growth
- "Email Report" button (triggers KPI email via @musekit/email)
- "Check Alerts" button (evaluates thresholds and shows results)

### Audit Log Viewer (src/pages/audit-log.tsx)
- Filterable, searchable audit log table
- Filter by: user, action, resource type, date range
- Expandable rows showing full metadata/payload

### Dependencies
- Install: @musekit/shared (from github:SpeckledDarth/musekit-shared)
- Install: @musekit/database (from github:SpeckledDarth/musekit-database)
- Install: @musekit/design-system (from github:SpeckledDarth/musekit-design-system)
- Install: @musekit/auth (from github:SpeckledDarth/musekit-auth)
- Install: @musekit/billing (from github:SpeckledDarth/musekit-billing)
- Install: recharts (for charts), lucide-react (for icons)

### Supabase Tables Used
- profiles (read/write — user management)
- organizations (read — org info)
- team_members (read — team membership)
- subscriptions (read — subscription status for users)
- audit_logs (read/write — audit log viewer + impersonation logging)
- notifications (read — notification counts for overview)
- feedback (read — feedback count for metrics)
- waitlist (read — waitlist count for metrics)

### Environment Secrets Needed
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- STRIPE_SECRET_KEY (for subscription lookups)

### Reference Code
Original: github.com/SpeckledDarth/master-saas-muse
Look in: src/app/admin/, src/app/(admin)/, src/components/admin/, src/app/api/admin/

### Rules
- All UI uses @musekit/design-system components
- Admin pages must check user role — only admin users can access
- Export everything from src/index.ts
- Create replit.md and MODULE.md
- MODULE.md must list Part 2 features as "NOT YET BUILT — Session 11"
```

---

### Session 11 Prompt: `musekit-admin` (Part 2 — Continuation)

```
Continue building the @musekit/admin package. Read replit.md and MODULE.md
to understand what this module is and what was built in Part 1.

Check src/index.ts to see what has been built so far. This session adds
the Setup Dashboard and remaining admin features.

## Tech Stack Rules
- Next.js 14.2.18 (do NOT use 15+ or 16+ features)
- React 18.3.1
- Tailwind CSS v3.4.x (do NOT upgrade to v4)
- TypeScript strict mode

## What to Build in Part 2

### Setup Dashboard (src/pages/setup/)
11 sub-pages with sidebar navigation:

1. **Branding** (setup/branding.tsx)
   - Logo upload (Supabase Storage), app name, description
   - Primary color picker with live preview
   - Hero style selector (6 styles: full-width, split, video, pattern, floating mockup, photo collage)
   - Header config: bg color, text color, opacity slider, sticky/relative toggle, transparent mode, border toggle
   - Footer config: bg color, text color, bg image, layout mode (4-column, minimal, centered)

2. **Content** (setup/content.tsx)
   - Homepage section list with drag-and-drop ordering
   - Per-section background color pickers
   - Enable/disable individual sections
   - 14 section types (hero, logo marquee, counters, features, testimonials, process steps, FAQ, founder letter, comparison bars, screenshot showcase, bottom CTA, image collage, image+text, feature sub-pages)

3. **Pages** (setup/pages.tsx)
   - About page content editor
   - Contact page configuration
   - Custom pages CRUD
   - Terms, privacy, and other legal page settings

4. **Pricing** (setup/pricing.tsx)
   - Plan editor (name, price, features list, Stripe price ID)
   - Monthly/annual toggle
   - Feature comparison table editor

5. **Social Links** (setup/social.tsx)
   - Social media profile URL fields (Twitter, LinkedIn, GitHub, etc.)

6. **Features & Integrations** (setup/features.tsx)
   - Auth provider toggles (Google, GitHub, Apple, Twitter/X, Magic Link, SSO)
   - AI feature enable/disable
   - Webhook config (URL, secret, per-event toggles)
   - Security settings
   - Compliance settings

7. **API Keys & Integrations** (setup/api-keys.tsx)
   - Collapsible groups (collapsed by default) with status indicators (green/red/gray dots)
   - Required/Optional labels (Supabase, Stripe, Resend = required)
   - Format validation on save (Stripe sk_ prefix, Supabase URL pattern, etc.)
   - Summary cards (total keys, required keys configured)
   - Inline edit/reveal/delete with source badges (Dashboard vs Env Var)

8. **Email Templates** (setup/email.tsx)
   - Template list with edit buttons
   - Editor with live preview (uses @musekit/email editor component)
   - Test email sending

9. **AI/Support** (setup/ai.tsx)
   - AI provider selector (xAI, OpenAI, Anthropic)
   - Model, temperature, max tokens, system prompt config
   - Help widget config: system prompt, fallback email, enable/disable

10. **Security/Compliance** (setup/security.tsx)
    - SSO/SAML config (identity providers: Okta, Azure AD, Google Workspace)
    - MFA settings
    - Password requirements

11. **PassivePost Settings** (setup/passivepost.tsx)
    - Social platform configuration
    - Default posting settings
    - Placeholder for now — full config in PassivePost module

### Other Admin Features

- Feature Toggles page (src/pages/feature-toggles.tsx)
  - List all toggles with enable/disable switches
  - Group by category

- Customer Service Tools (src/pages/customer-service.tsx)
  - Subscription tracking per user
  - Invoice history (via Stripe)
  - Admin notes (built in Part 1)

- Onboarding Funnel Analytics (src/pages/onboarding.tsx)
  - Signup → verification → first login → first action funnel

### Additional Supabase Tables Used (beyond Part 1)
- brand_settings (read/write — branding config)
- feature_toggles (read/write — toggle management)
- email_templates (read/write — template editor)
- content_posts (read — blog/content overview)
- api_keys (read/write — API key management)

### Reference Code
Same as Part 1: src/app/admin/, src/components/admin/, src/app/api/admin/

### Rules
- All UI uses @musekit/design-system components
- Color pickers should use standard HTML color inputs
- Drag-and-drop for section ordering can use a simple list with up/down buttons if drag-and-drop library is too complex
- Update MODULE.md to mark Part 2 features as "BUILT"
- Update src/index.ts to export all new components
```

---

### Session 12 Prompt: `musekit-cms`

```
You are building the @musekit/cms package for the MuseKit SaaS platform.

This is a standalone npm package for content management: blog, landing pages,
legal pages, and marketing tools.

## Tech Stack Rules
- Next.js 14.2.18 (do NOT use 15+ or 16+ features)
- React 18.3.1
- Tailwind CSS v3.4.x (do NOT upgrade to v4)
- TypeScript strict mode

## What to Build

### Blog/Changelog System (src/blog/)
- BlogList — public page listing published posts
- BlogPost — individual post page with markdown rendering
- BlogEditor — admin markdown editor with live preview
- BlogAdmin — admin CRUD interface (list, create, edit, delete, publish/draft)
- Category/tag system for organizing posts

### 14 Landing Page Sections (src/landing/)
Each section is a standalone React component that reads its config from the database:

1. HeroSection — 6 styles (full-width, split, video, pattern, floating mockup, photo collage)
2. LogoMarquee — scrolling partner/client logos
3. AnimatedCounters — key metrics with counting animation on scroll
4. FeatureCards — icons and descriptions in a responsive grid
5. TestimonialCarousel — customer stories with navigation
6. ProcessSteps — numbered how-it-works sequence
7. FAQSection — expandable question/answer accordion
8. FounderLetter — portrait image, letter text, signature
9. ComparisonBars — animated bar charts comparing before/after
10. ScreenshotShowcase — product screenshots with layered backgrounds
11. BottomHeroCTA — closing call-to-action section
12. ImageCollage — fan-style overlapping images with hover animation
13. ImageTextBlocks — alternating image + text rows
14. FeatureSubPage — template for /features/[slug] dynamic pages

- LandingPageBuilder — assembles sections in order from database config
- Each section respects: enabled/disabled toggle, sort order, per-section background color

### 9 Legal Pages (src/legal/)
- TermsOfService, PrivacyPolicy, CookiePolicy, AcceptableUse, Accessibility,
  DataHandling, DMCA, AIDataUsage, SecurityPolicy
- Dynamic variable replacement: {{appName}}, {{companyName}}, {{supportEmail}}, {{effectiveDate}}
- All legal pages share a common layout with sidebar navigation

### Marketing Tools (src/marketing/)
- WaitlistForm — email collection form for pre-launch mode
- WaitlistAdmin — admin view with CSV export
- FeedbackWidget — floating widget with NPS rating (0-10 scale)
- AnnouncementBar — top banner with admin controls (text, link, dismiss)
- CookieConsentBanner — configurable cookie consent with accept/decline
- SEOHead — component that generates meta tags, Open Graph, JSON-LD
- Sitemap — auto-generated sitemap.xml
- RobotsTxt — auto-generated robots.txt

### Custom Pages (src/pages/)
- CustomPage — dynamic page renderer
- CustomPageEditor — admin page builder

### Dependencies
- Install: @musekit/shared (from github:SpeckledDarth/musekit-shared)
- Install: @musekit/database (from github:SpeckledDarth/musekit-database)
- Install: @musekit/design-system (from github:SpeckledDarth/musekit-design-system)
- Install: react-markdown, remark-gfm (for blog markdown rendering)
- Install: lucide-react (for icons)

### Supabase Tables Used
- content_posts (read/write — blog CRUD)
- brand_settings (read — app name, colors for branding)
- feature_toggles (read — which sections are enabled)
- waitlist (read/write — waitlist entries)
- feedback (read/write — feedback submissions)

### Environment Secrets Needed
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY

### Reference Code
Original: github.com/SpeckledDarth/master-saas-muse
Look in: src/app/blog/, src/app/(marketing)/, src/components/landing/, src/components/marketing/, src/app/(legal)/, src/app/features/

### Rules
- All UI uses @musekit/design-system components
- Every landing section must support dark mode
- Legal pages must use dynamic variable replacement — never hardcode app name
- Export everything from src/index.ts
- Create replit.md and MODULE.md
```

---

### Session 13 Prompt: `musekit-affiliate`

```
You are building the @musekit/affiliate package for the MuseKit SaaS platform.

This is a standalone npm package for the complete affiliate/referral program.

## Tech Stack Rules
- Next.js 14.2.18 (do NOT use 15+ or 16+ features)
- React 18.3.1
- Tailwind CSS v3.4.x (do NOT upgrade to v4)
- TypeScript strict mode

## What to Build

### Affiliate User Dashboard (src/dashboard/)
- AffiliateDashboard — overview with earnings summary, click stats
- AffiliateAnalytics — charts showing clicks, conversions, revenue over time
- AffiliateReferrals — list of referred users with status
- AffiliateEarnings — earnings history with date range filter
- AffiliatePayouts — pending and completed payouts
- AffiliateResources — marketing materials (banners, copy, links)
- AffiliateTools — link generator, banner embed codes
- AffiliateNews — updates/announcements from admin
- AffiliateMessages — messaging between affiliate and admin
- AffiliateSettings — account settings, payment info
- AffiliateSupport — support request form

### Affiliate Admin (src/admin/)
- AffiliateApplications — review, approve, reject applications
- AffiliateSettings — commission rates, cookie duration, min payout
- AffiliateAssets — upload/manage marketing materials
- AffiliateMilestones — achievement definitions (first sale, 10 sales, etc.)
- AffiliateTiers — bronze, silver, gold tier definitions with commission rates
- AffiliateBroadcasts — send messages/announcements to all affiliates
- AffiliateMembers — active affiliate list with performance stats
- AffiliateNetworks — affiliate network integration settings
- AffiliateContests — promotional campaign management
- AffiliatePayoutRuns — batch payment processing
- AffiliateDiscountCodes — create and manage discount codes

### Core Logic (src/core/)
- trackReferral(referralCode, visitorId) — record a click
- attributeConversion(userId, referralCode) — link signup to affiliate
- calculateCommission(saleAmount, affiliateTier) — compute earnings
- processPayoutRun(affiliateIds) — batch payout calculation
- generateReferralLink(affiliateId, campaign?) — create tracking URL
- validateReferralCode(code) — check if code is valid and active

### Dependencies
- Install: @musekit/shared (from github:SpeckledDarth/musekit-shared)
- Install: @musekit/database (from github:SpeckledDarth/musekit-database)
- Install: @musekit/design-system (from github:SpeckledDarth/musekit-design-system)
- Install: @musekit/billing (from github:SpeckledDarth/musekit-billing)
- Install: recharts (for analytics charts), lucide-react (for icons)

### Supabase Tables Used
Note: The affiliate system may need additional tables beyond the current 15+ core tables.
Check the existing database for affiliate-related tables. If they don't exist yet,
document the needed tables in MODULE.md but do NOT create them in Supabase.
Use mock data structures that match the planned schema.

### Environment Secrets Needed
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- STRIPE_SECRET_KEY (for commission tracking against real payments)

### Reference Code
Original: github.com/SpeckledDarth/master-saas-muse
Look in: src/app/affiliate/, src/app/(affiliate)/, src/components/affiliate/, src/app/admin/affiliates/

### Rules
- All UI uses @musekit/design-system components
- Export everything from src/index.ts
- Create replit.md and MODULE.md
- If affiliate tables don't exist in Supabase yet, document the needed schema in MODULE.md
```

---

### Session 14 Prompt: Integration Checkpoint 2

```
Integration checkpoint 2. Read replit.md and MULTI_REPL_PLAN.md for context.

Pull all Tier 3 feature modules into the Turborepo monorepo.
Tier 1 and Tier 2 modules were integrated in Session 9.

New modules to integrate (all on GitHub under SpeckledDarth):
- musekit-admin → packages/admin/
- musekit-cms → packages/cms/
- musekit-affiliate → packages/affiliate/

For each new module:
1. Pull the code from its GitHub repo into the packages/ directory
2. Update package.json dependencies from "github:..." to workspace "*"
3. Wire pages and API routes into apps/web/

Admin pages should be at: /admin/*
Blog pages should be at: /blog/*
Legal pages should be at: /terms, /privacy, /cookies, etc.
Affiliate pages should be at: /affiliate/*
Landing page sections should render on the homepage

After integration:
1. Run npm install
2. Start the dev server (port 5000)
3. Verify the app compiles and loads
4. Verify admin dashboard is accessible (requires admin user)
5. Verify blog page renders
6. Verify at least one legal page renders
7. Fix any import path or type mismatch issues

This checkpoint should result in the FULL MuseKit core running —
everything except PassivePost.
```

---

### Sessions 15-16 Prompt: `musekit-passivepost` (Part 1 — Session 15)

```
You are building the @musekit/passivepost package for the MuseKit SaaS platform.

This is the PassivePost AI social media scheduling product. It will be built
across 2 sessions. This is Session 15 (Part 1). Focus on: dashboard layout,
compose, queue, calendar, brand preferences, and connections.

## Tech Stack Rules
- Next.js 14.2.18 (do NOT use 15+ or 16+ features)
- React 18.3.1
- Tailwind CSS v3.4.x (do NOT upgrade to v4)
- TypeScript strict mode

## What to Build in Part 1

### Dashboard Layout (src/layout/)
- SocialSidebar — dedicated sidebar for PassivePost (separate from main app sidebar)
- SocialHeader — PassivePost-specific header
- SocialLayout — wrapper component
- Navigation items: Posts, Queue, Calendar, Blog Flywheel, Compose, Articles,
  Autopilot, Engagement, Intelligence, Revenue, Connections, Settings

### Posts Page (src/pages/posts.tsx)
- Post list with status filters (draft, scheduled, published, failed)
- Bulk actions (delete, reschedule, duplicate)
- Post card showing: content preview, platforms, scheduled time, status badge

### Compose Page (src/pages/compose.tsx)
- AI post generator with 15 niche-specific prompt templates
- Platform selector (which platforms to post to)
- Content editor with character count per platform
- Media attachment (image upload)
- Schedule picker (date/time or "post now")
- Preview per platform (how the post will look on each)

### Queue Page (src/pages/queue.tsx)
- Post queue management
- Drag-and-drop or up/down reordering
- Quick edit inline
- Pause/resume queue

### Calendar Page (src/pages/calendar.tsx)
- Monthly and weekly calendar views
- Posts shown on their scheduled date/time
- Click to edit a post
- Drag to reschedule

### Brand Preferences (src/pages/brand.tsx)
- Business niche selector
- Brand tone selector (professional, casual, humorous, etc.)
- Target audience description
- Location/market
- Posting goals and frequency
- Sample content URLs
- AI Voice Fine-Tuner — paste writing samples, analyze voice characteristics

### Connections Page (src/pages/connections.tsx)
- Connected accounts list with status (connected, expired, error)
- Connect button for each platform (10 platforms)
- OAuth flow initiation for: Twitter/X, LinkedIn, Instagram, YouTube, Facebook,
  TikTok, Reddit, Pinterest, Snapchat, Discord
- Validate/reconnect buttons for existing connections
- Note: Twitter/X, LinkedIn, Instagram have full API implementations.
  YouTube, Facebook, TikTok, Reddit, Pinterest, Snapchat, Discord have STUBBED
  methods (Open Issue #7). Build the stubs as-is.

### Subscription Gating (src/gating.ts)
- 3 tiers: Starter (free, 3 accounts, 30 posts/mo), Basic ($29, 10/300), Premium ($99, unlimited)
- Upgrade banner component (shows at 80%+ usage)
- Feature checks using @musekit/billing

### Dependencies
- Install: @musekit/shared (from github:SpeckledDarth/musekit-shared)
- Install: @musekit/database (from github:SpeckledDarth/musekit-database)
- Install: @musekit/design-system (from github:SpeckledDarth/musekit-design-system)
- Install: @musekit/auth (from github:SpeckledDarth/musekit-auth)
- Install: @musekit/billing (from github:SpeckledDarth/musekit-billing)
- Install: @musekit/services (from github:SpeckledDarth/musekit-services)
- Install: lucide-react, recharts, date-fns

### Supabase Tables Used
- social_posts (read/write — post CRUD)
- social_accounts (read/write — connected accounts)
- brand_preferences (read/write — brand settings)
- post_queue (read/write — queue management)
- profiles (read — user info)
- subscriptions (read — tier checks)

### Environment Secrets Needed
- All Supabase secrets
- STRIPE_SECRET_KEY
- SOCIAL_ENCRYPTION_KEY
- TWITTER_API_KEY, TWITTER_API_SECRET
- LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET
- FACEBOOK_APP_ID, FACEBOOK_APP_SECRET
- DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET
- GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET (for YouTube)
- INSTAGRAM_APP_ID, INSTAGRAM_APP_SECRET

### Reference Code
Original: github.com/SpeckledDarth/master-saas-muse
Look in: src/app/social/, src/app/(social)/, src/components/social/, src/app/api/social/

### Rules
- All UI uses @musekit/design-system components
- Social sidebar is SEPARATE from the main app sidebar
- Export everything from src/index.ts
- Create replit.md and MODULE.md
- MODULE.md must list Part 2 features as "NOT YET BUILT — Session 16"
- Encrypt social platform tokens using SOCIAL_ENCRYPTION_KEY before storing
```

---

### Session 16 Prompt: `musekit-passivepost` (Part 2 — Continuation)

```
Continue building the @musekit/passivepost package. Read replit.md and MODULE.md
to understand what was built in Part 1.

Check src/index.ts to see what exists. This session adds analytics, intelligence,
autopilot, settings, and background jobs.

## Tech Stack Rules
- Next.js 14.2.18 (do NOT use 15+ or 16+ features)
- React 18.3.1
- Tailwind CSS v3.4.x (do NOT upgrade to v4)
- TypeScript strict mode

## What to Build in Part 2

### Blog Flywheel Page (src/pages/flywheel.tsx)
- Repurpose blog content into social posts
- Select a blog post → AI generates platform-specific social posts
- One-click schedule generated posts

### Articles Page (src/pages/articles.tsx)
- Content library management
- Save/organize reference articles and inspiration
- Tag/categorize content

### Autopilot Page (src/pages/autopilot.tsx)
- Automated posting rules and schedules
- Configure: posting frequency per platform, optimal time windows
- Enable/disable autopilot per platform
- Queue auto-fill settings

### Engagement/Analytics Page (src/pages/engagement.tsx)
- Analytics dashboard: likes, shares, comments, reach, impressions
- Per-platform breakdown
- Per-post performance
- Date range filter
- Charts using recharts

### Content Intelligence Page (src/pages/intelligence.tsx)
- AI-powered content recommendations
- Optimal posting time analysis per platform
- Platform performance comparison
- Content type analysis (which types perform best)

### Revenue & ROI Page (src/pages/revenue.tsx)
- Track social media impact on revenue
- Lead attribution from social channels
- ROI calculation per platform
- Conversion tracking

### Settings Page (src/pages/settings.tsx)
- Auto-approve AI posts toggle
- Default post status (draft/scheduled)
- Timezone selector
- Quiet hours configuration (don't post between X and Y)
- Notification preferences
- Security settings

### Quick Generate FAB (src/components/quick-generate.tsx)
- Floating action button for quick AI post generation
- Appears on all PassivePost pages
- Opens a mini compose dialog

### 4 BullMQ Social Job Types (src/jobs/)
- socialPosting — publish scheduled posts to platforms
- platformSync — sync account status and analytics
- analyticsFetching — pull engagement data from platforms
- automatedQueueProcessing — auto-fill queue based on autopilot rules

### Reference Code
Same as Part 1: src/app/social/, src/components/social/, src/app/api/social/

### Rules
- All UI uses @musekit/design-system components
- Update MODULE.md to mark Part 2 features as "BUILT"
- Update src/index.ts to export all new components
- Job processors should gracefully handle stubbed platform APIs (log warning, don't crash)
```

---

### Session 17 Prompt: Final Integration

```
Final integration. Read replit.md and MULTI_REPL_PLAN.md for context.

This is the final assembly of the complete application.

## Step 1: Integrate PassivePost
Pull musekit-passivepost from GitHub into packages/passivepost/.
Update package.json dependencies to workspace "*".
Wire PassivePost pages into apps/web/ at /social/* routes.

## Step 2: Verify All Modules Are Integrated
Confirm all 11 packages are in the packages/ directory:
- shared, design-system, database, auth, billing, email, services,
  admin, cms, affiliate, passivepost

## Step 3: Full Application Testing
1. Start dev server (port 5000)
2. Verify landing page loads with all 14 sections
3. Verify login/signup pages work
4. Verify admin dashboard loads (overview, users, metrics, setup)
5. Verify blog page renders
6. Verify at least one legal page renders
7. Verify social dashboard loads at /social
8. Verify dark/light mode toggle works across all pages
9. Check browser console for errors

## Step 4: Migrate Playwright E2E Tests (Open Issue #8)
Copy the Playwright test files from the pre-crash GitHub repo
(github.com/SpeckledDarth/master-saas-muse). The tests are in:
- Look for: tests/, e2e/, playwright/, or __tests__/ directories
- There should be ~100 tests across ~8 files

Run the tests against the integrated app. Fix any that break due to:
- Changed import paths
- Changed component selectors
- Route changes
Do NOT rewrite tests from scratch — fix only what breaks.

## Step 5: Polish
- Fix any TypeScript errors across the full build
- Ensure all API routes return proper error responses
- Verify no hardcoded values (app name, URLs, etc.)
- Clean up any duplicate code between packages
```

---

### Session 18 Prompt: Production Launch

```
Production launch preparation. Read replit.md for context.

The app is fully assembled and tested. This session prepares for
production deployment.

## Step 1: Resolve Open Issues
- Issue #3: Integrate Plausible analytics (should be compatible with Next.js 14 now)
  - Add Plausible script to the app layout
  - Configure domain in Plausible dashboard
- Issue #4: Wire n8n agents to the webhook system
  - This is configuration, not code — set up n8n workflows that listen to
    the 8 webhook event types
  - If n8n is not ready, skip and document as post-launch task

## Step 2: Environment Configuration
- Verify all 27 secrets are set in this Repl
- Set NEXT_PUBLIC_APP_URL to the production domain
- Switch Stripe from test to live keys (user decision — may keep test for now)
- Verify Sentry DSN is configured

## Step 3: Build Optimization
- Run npx turbo build and fix any build errors
- Verify no development-only code in production paths
- Check bundle size — flag anything unusually large

## Step 4: Deployment
- Configure Vercel deployment from this repo
- Set environment variables in Vercel dashboard
- Deploy and verify the production URL loads
- Test critical flows on production:
  - Landing page loads
  - Login/signup works
  - Admin dashboard accessible
  - Social dashboard accessible

## Step 5: Post-Launch Documentation
- Update replit.md with production URLs
- Update MULTI_REPL_PLAN.md marking all sessions as complete
- Create a brief LAUNCH_NOTES.md documenting:
  - What's live
  - Known limitations (7 stubbed social APIs, etc.)
  - Next steps (post-MVP features from roadmap)
```

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
- Verifying the work using the checklist in Section 13 (~5 min)
- Moving to the next module when one is complete

### Your Daily Routine During Build
1. Check: Is the current module done? (Use the Section 13 checklist)
2. If yes: Create the next Repl, paste the prompt, let it build
3. If no: Open the same Repl, paste the continuation prompt, let it finish
4. At integration checkpoints: Open this Repl, paste the integration prompt
5. Total daily time investment: **~15-30 minutes of active work** + letting the agent run

### If Something Goes Wrong
- **Agent quit mid-session:** Open the same Repl, paste the continuation prompt. MODULE.md tells the next session what's missing.
- **Module has bugs:** Open the same Repl, describe the bug. The session has full context of just that module.
- **Integration fails:** The issue is isolated to one module. Fix that one module in its Repl, then re-integrate.
- **Catastrophic failure:** Roll back that one Repl from GitHub. Everything else is untouched. This is the whole point.
