# Mafia Kilty — Marketing Website

Live social deduction events in Edinburgh & Glasgow.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

- `/` — Home page with hero, how it works, FAQ, and more
- `/signup` — Sign-up form (Tally embed)
- `/photos` — Event photo gallery with lightbox

## Adding / Replacing Photos

1. Add new `.jpg` files to `public/photos/`
2. Update `src/data/photos.ts` with the new filename and descriptive alt text
3. Photos display in B&W by default and reveal colour on hover

## Updating the Tally Form

Edit the `tallyFormUrl` value in `src/config/site.ts`.

## Deploying to Vercel

1. Push this repo to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Vercel auto-detects Next.js — no extra config needed
4. Pushes to `main` trigger automatic deployments

### Connecting a Custom Domain

1. In Vercel project settings, go to **Domains**
2. Add `mafiakilty.co.uk`
3. Update your DNS records as instructed by Vercel

## Payment Upgrade Paths

The site is designed with a `paymentsEnabled` flag in `src/config/site.ts`.

- **Quick option**: Use [Stripe Payment Links](https://stripe.com/gb/payments/payment-links) — generate a link in Stripe Dashboard and set it as `paymentUrl`
- **Custom option**: Integrate Stripe Checkout with a serverless API route for full control over pricing and checkout flow
