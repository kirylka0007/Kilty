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
```

## Pages

- `/` — Home page with hero, how it works, cities, photos teaser, and FAQ
- `/signup` — Interactive calendar with event selection, registration form, and Stripe Checkout payment
- `/signup/success` — Post-payment confirmation page
- `/photos` — Event photo gallery with lightbox

## Architecture

- **Next.js 16** (App Router) with **React 19** and **TypeScript**
- **Tailwind CSS v4** for styling
- **Supabase** for the database (events + registrations tables, RLS policies)
- **Stripe Checkout** for payments with a webhook at `/api/webhooks/stripe` that inserts registrations after successful payment

### Signup Flow

1. User selects a city and date on the calendar
2. User fills in the registration form (name, email, optional contact details)
3. Server action validates the form and creates a Stripe Checkout session
4. User completes payment on Stripe
5. Stripe webhook fires, inserting the registration into Supabase
6. User sees the success confirmation page

## Supabase Setup

1. Create a Supabase project
2. Run the schema in `supabase-schema.sql` to create the `events` table, `registrations` table, `event_availability` view, and RLS policies
3. Copy the project URL and keys into `.env.local`

### Managing Events

Events are managed in the Supabase Table Editor:
- Insert rows into the `events` table with city, date, time, venue, total_spots, and price_pence
- Set `is_published = true` to make an event visible on the signup page
- Registrations appear in the `registrations` table after payment

## Stripe Setup

1. Create a Stripe account and get your API keys
2. Add the secret and publishable keys to `.env.local`
3. Set up a webhook endpoint pointing to `https://your-domain/api/webhooks/stripe` listening for `checkout.session.completed` events
4. Add the webhook signing secret to `.env.local`

For local development, use the [Stripe CLI](https://stripe.com/docs/stripe-cli) to forward webhook events:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

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

### Connecting a Custom Domain

1. In Vercel project settings, go to **Domains**
2. Add `mafiakilty.co.uk`
3. Update your DNS records as instructed by Vercel
