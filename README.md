# Mafia Kilty — Marketing Website

Live social deduction events in Edinburgh & Glasgow.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

Copy `.env.local.example` or create `.env.local` with:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=
SUPABASE_SECRET_DEFAULT_KEY=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_BASE_URL=http://localhost:3000
RESEND_API_KEY=
```

## Pages

- `/` — Home page with hero, how it works, cities, photos teaser, and FAQ
- `/signup` — Interactive calendar with event selection, registration form, and Stripe Checkout payment
- `/signup/success` — Post-payment confirmation page
- `/photos` — Event photo gallery with lightbox
- `/corporate` — Corporate / team-building landing page: anti-AI human-skills pitch, formats, event configurator, and enquiry form (no payment, no public pricing)
- `/terms` — Terms & Conditions page (linked from registration form)

## Architecture

- **Next.js 16** (App Router) with **React 19** and **TypeScript**
- **Tailwind CSS v4** for styling
- **Supabase** for the database (events, registrations, and corporate_enquiries tables, RLS policies)
- **Stripe Checkout** for payments with a webhook at `/api/webhooks/stripe` that inserts registrations after successful payment
- **Resend** for transactional confirmation emails (registration confirmations) and corporate enquiry notifications + auto-replies

### Signup Flow

1. User selects a city and date on the calendar
2. User fills in the registration form (name, email, optional contact details)
3. User accepts the Terms & Conditions (required before payment)
4. Server action validates the form and creates a Stripe Checkout session
5. User completes payment on Stripe
6. Stripe webhook fires, inserting the registration into Supabase and sending a confirmation email via Resend
7. User sees the success confirmation page

### Corporate Page (`/corporate`)

A standalone, animated landing page targeting UK businesses for team-building /
corporate socials. It uses the site's design system (dark/minimal, Space Grotesk
+ Inter) throughout — no monospace — with **Framer Motion** scroll reveals and
interactive cards, and a brass-accented redacted-headline reveal in the hero.

**Lead pitch:** the anti-AI, screen-free angle — give a team ninety minutes of
reading people instead of screens. The page is deliberately short and punchy. No
pricing and no testimonials are shown anywhere.

**Section order (and that's it):** hero (AI hook, dual CTA) → **why it works**
(science-backed facts) → **what's included** (a flowing 5-step sequence) → event
types (animated cards) → photos → slim configurator + enquiry form → FAQ.

**Why-it-works facts** live in `scienceFacts` in `src/data/corporate.ts`, each
with a real cited source (Google Project Aristotle; Gallup 2024; Gallup best
friends at work). Keep them verifiable — every fact links to its source.

**Animations:** `framer-motion`. `src/components/corporate/Reveal.tsx` is a
reusable scroll-reveal wrapper (respects `prefers-reduced-motion`); event-type
cards and the configurator animate client-side.

**Slim configurator → enquiry form.** `EventConfigurator.tsx` lets a buyer set
group size (12–50), occasion and location, and outputs a **recommendation**
(table split, format, duration) — e.g. *"Two tables of ~15 · The Away-Day Slot ·
~90 min"*. "Use this in the form" pre-fills the enquiry form. State is shared via
`src/components/corporate/CorporateBooking.tsx`.

**Hard product facts baked into the copy:** max 25 players per game; two games
run concurrently for up to 50 total; a 12–50 range is used everywhere. Real
headline stats: 10+ games run, 200+ people played.

**Enquiry submission flow:**

1. User submits the form (`CorporateEnquiryForm.tsx`)
2. Server action `submitCorporateEnquiry` (`src/actions/corporate.ts`) runs a
   honeypot anti-spam check, validates (name, company, work email required),
   then inserts a row into the `corporate_enquiries` table via the service-role
   client
3. Two emails are sent via Resend (best-effort — failures are logged, never block
   the response): a **notification** to `info@mafiakilty.co.uk` (with all fields
   plus the configurator recommendation) and an **auto-reply** to the enquirer

**Editing corporate content:** all copy lives in `src/data/corporate.ts`
(scienceFacts, formats, includedFlow, configurator occasions, FAQ, gallery
photos). Corporate photos live in `public/photos/corporate/` (web-optimised via
`sharp`); add more by exporting source images to JPG and extending
`corporatePhotos`.

## Supabase Setup

1. Create a Supabase project
2. Run the schema in `supabase-schema.sql` to create the `events` table, `registrations` table, `corporate_enquiries` table, `event_availability` view, and RLS policies
3. Copy the project URL and keys into `.env.local`

### Managing Events

Events are managed in the Supabase Table Editor:
- Insert rows into the `events` table with city, date, time, venue, total_spots, price_pence, and language
- Set `language` to `English` or `Russian` (displayed as a badge on the calendar)
- Set `price_pence` per event (e.g. `1500` for £15, `2000` for £20) — the Pay button updates automatically
- Set `is_published = true` to make an event visible on the signup page
- Registrations appear in the `registrations` table after payment

## Stripe Setup

1. Create a Stripe account and get your API keys
2. Add the secret and publishable keys to `.env.local`
3. Set up a webhook endpoint pointing to `https://www.mafiakilty.co.uk/api/webhooks/stripe` listening for `checkout.session.completed` events
4. Add the webhook signing secret to `.env.local`

For local development, use the [Stripe CLI](https://stripe.com/docs/stripe-cli) to forward webhook events:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## Resend Setup

Confirmation emails are sent automatically after each successful payment via [Resend](https://resend.com).

1. Create a Resend account (free tier: 3,000 emails/month)
2. Add and verify `mafiakilty.co.uk` as a sending domain in Resend → Domains
3. Create an API key in Resend → API Keys
4. Add `RESEND_API_KEY` to your Vercel environment variables
5. Emails are sent from `info@mafiakilty.co.uk` with event details, refund policy, and contact info

## Adding / Replacing Photos

1. Add new `.jpg` files to `public/photos/`
2. Update `src/data/photos.ts` with the new filename and descriptive alt text
3. Photos display in B&W by default and reveal colour on hover

## Deploying to Vercel

1. Push this repo to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Add all environment variables in Vercel project settings
4. Vercel auto-detects Next.js — no extra config needed
5. Pushes to `main` trigger automatic deployments

### Custom Domain

The site is live at [https://www.mafiakilty.co.uk](https://www.mafiakilty.co.uk).

DNS is managed in Namecheap. The Stripe webhook endpoint must point to `https://www.mafiakilty.co.uk/api/webhooks/stripe` (not the root domain, which redirects with a 307).
