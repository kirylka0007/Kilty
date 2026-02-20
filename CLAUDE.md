# Mafia Kilty — Project Context

Social deduction events site for Edinburgh & Glasgow. Users browse upcoming events on an interactive calendar, register with their details, pay via Stripe Checkout, and get confirmed via a webhook that writes to Supabase.

## Tech Stack

- **Framework**: Next.js 16 (App Router) with React 19 and TypeScript 5
- **Styling**: Tailwind CSS v4 (PostCSS plugin, `@theme inline` syntax)
- **Database**: Supabase (PostgreSQL + Row Level Security)
- **Payments**: Stripe Checkout (one-time payments) + Webhooks
- **Deployment**: Vercel (auto-deploy from `main` branch)

## File Structure

```
src/
├── actions/registration.ts        # Server action: validate → check availability → create Stripe session
├── app/
│   ├── layout.tsx                 # Root layout (fonts, metadata)
│   ├── page.tsx                   # Home page
│   ├── not-found.tsx              # 404 page
│   ├── robots.ts / sitemap.ts    # SEO
│   ├── globals.css                # Tailwind theme + base styles
│   ├── api/webhooks/stripe/
│   │   └── route.ts              # POST handler: verify signature → insert registration
│   ├── photos/page.tsx            # Photo gallery
│   ├── signup/page.tsx            # Signup page (fetches events, renders SignupFlow)
│   └── signup/success/page.tsx    # Post-payment confirmation
├── components/
│   ├── home/                      # Hero, WhatItIs, HowItWorks, WhereWeRun, PhotosTeaser, FAQ
│   ├── layout/                    # Header, Footer, Container, MobileNav
│   ├── photos/                    # Gallery, Lightbox
│   ├── signup/                    # SignupFlow, CityTabs, EventCalendar, RegistrationForm, SpotsBadge
│   └── ui/                        # Button, SectionHeading, ImageWithFallback
├── config/site.ts                 # Site name, domain, social links, city list
├── data/                          # Static data: faq.ts, photos.ts
├── lib/
│   ├── stripe.ts                  # Stripe SDK client
│   ├── validators.ts              # Form validation (name, email, phone)
│   ├── metadata.ts                # Metadata builder helper
│   ├── analytics.ts               # Analytics placeholder
│   └── supabase/
│       ├── client.ts              # Public Supabase client (anon key, read-only)
│       └── server.ts              # Admin Supabase client (service role key)
└── types/
    ├── index.ts                   # App types (EventWithAvailability, RegistrationFormData, Photo, FAQItem)
    └── database.ts                # DB row types (DbEvent, DbRegistration, DbEventAvailability)
```

Other root files: `supabase-schema.sql` (full DDL), `next.config.ts`, `postcss.config.mjs`.

## Signup Flow

```
/signup page (server component)
  │  Fetches published events from event_availability view (revalidates every 60s)
  ▼
SignupFlow (client component — manages step state)
  │
  ├─ Step 1: Calendar
  │   CityTabs filters by Edinburgh/Glasgow
  │   EventCalendar shows month grid → click date → event detail panel
  │   SpotsBadge shows remaining spots
  │   "Book This Date" → advances to form
  │
  ├─ Step 2: Registration Form
  │   Collects: full name, email, telegram, instagram, phone
  │   Client + server validation
  │   Submit calls createRegistration() server action
  │
  ├─ Step 3: Stripe Checkout (external)
  │   Server action creates Checkout session with event metadata
  │   User redirected to Stripe-hosted page
  │   On success → /signup/success?session_id={CHECKOUT_SESSION_ID}
  │   On cancel → /signup?cancelled=true
  │
  └─ Step 4: Webhook (async, server-side)
      POST /api/webhooks/stripe
      Verifies stripe-signature header
      On checkout.session.completed → inserts row into registrations table
      Registration rows are ONLY created after successful payment
```

## Database (Supabase)

Schema defined in `supabase-schema.sql`.

**Tables:**
- `events` — city, date, time, venue, description, total_spots, price_pence, is_published
  - Unique constraint on (city, date)
- `registrations` — event_id (FK), full_name, email, telegram, instagram, telephone, payment_status, stripe_session_id
  - payment_status is either `paid` or `refunded`
  - stripe_session_id is unique

**Views:**
- `event_availability` — joins events with counted paid registrations to compute `registration_count` and `spots_remaining`

**RLS:**
- Events: anon can SELECT where `is_published = true`
- Registrations: no anon access; only service role can read/write

**Two clients:**
- `lib/supabase/client.ts` — public anon key, used in signup page to fetch events
- `lib/supabase/server.ts` — service role key, used in webhook and server action

## Stripe

- SDK initialised in `lib/stripe.ts` with `STRIPE_SECRET_KEY`
- Checkout sessions created in `actions/registration.ts` with `mode: "payment"`, currency GBP, amount from `price_pence`
- All form data passed as session metadata so the webhook can insert it
- Webhook at `/api/webhooks/stripe` verifies signature with `STRIPE_WEBHOOK_SECRET`

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL              # Supabase project URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY  # Supabase anon/public key (safe for browser)
SUPABASE_SECRET_DEFAULT_KEY           # Supabase service role key (server-only)
STRIPE_SECRET_KEY                     # Stripe secret key (server-only)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY    # Stripe publishable key (safe for browser)
STRIPE_WEBHOOK_SECRET                 # Stripe webhook signing secret (server-only)
NEXT_PUBLIC_BASE_URL                  # App base URL, used for Stripe redirect URLs
```

`NEXT_PUBLIC_*` vars are exposed to the browser. All others are server-only.

## Design System

**Colours** (defined in `globals.css` via `@theme inline`):
- `black` #0A0A0A, `charcoal` #1C1C1E, `grey-dark` #3A3A3C
- `grey-mid` #6E6E73, `grey-light` #D1D1D6, `off-white` #F5F5F7, `white` #FFFFFF

**Fonts** (loaded in `layout.tsx` via `next/font/google`):
- Headings: Space Grotesk (`--font-heading`)
- Body: Inter (`--font-body`)

**Button variants** (`components/ui/Button.tsx`):
- `primary` — black bg, white text
- `primary-on-dark` — white bg, black text
- `ghost` — transparent, white ring
- Polymorphic: renders `<Link>` when `href` provided, `<button>` otherwise

**Container** (`components/layout/Container.tsx`): max-w-[1200px], responsive padding.

## Admin Workflow

Events are managed directly in Supabase Table Editor:
1. Insert a row into the `events` table with city, date, time, venue, total_spots, price_pence
2. Set `is_published = true` when ready to accept signups
3. Registrations appear automatically in the `registrations` table after payment
4. Use `event_availability` view to check spots remaining

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server on localhost:3000
npm run build        # Production build
npm run lint         # Run ESLint
```

## Known Future Work

- Confirmation emails after successful payment
- Custom domain DNS setup (mafiakilty.co.uk)
- Analytics integration (placeholder exists in `lib/analytics.ts`)
