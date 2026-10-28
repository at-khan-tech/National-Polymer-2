# National-Polymer-2

Polymer & Plastic Resin Distributor Web Platform for **National Polymers FZ LLC** (Dubai, UAE).

Built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and interactive multi-theme support.

## Features
- **Dynamic Theme Switcher:** 
  - *Theme 1 (Corporate Theme, default):* Orange primary (#E95220), dark hover (#B11A00), and corporate dark blue (#2F46D8).
  - *Theme 2 (Logo Brand):* Industrial Crimson Red & Ocean Cyan palette extracted directly from the official National Polymers logo.
- **Hero Stage:** Watermark marquee, rotating slide titles, countdown timer, team cutouts carousel.
- **Interactive Material Finder:** 3-step application wizard for polymer grade selection.
- **Animated 21 Years Badge:** Custom intersection observer count-up animation.
- **Live Event & News Ticker:** Interactive feed and schedule preview.
- **Fully Responsive & SEO Ready:** Mobile slide-out drawer, Montserrat typography, and optimized metadata.

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
Open [http://localhost:3000](http://localhost:3000) to view in browser.

## Admin Panel

The admin panel is available at `/admin`. Set `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and
`ADMIN_SESSION_SECRET` in `.env.local` for local development and in the deployment
environment for production. Use a long, unique session secret; do not commit credentials.
Admin sessions use an HTTP-only cookie and expire after eight hours.

The admin workspace has a dedicated sidebar for the dashboard, blogs, products,
categories, orders, settings, and sign-out. Administrators can create, edit, publish,
and delete blog posts; new posts are drafts by default and only published posts appear
on the public blog pages. Categories can be managed for blogs and products. The orders
area supports manually recording orders and tracking their fulfillment status; it is
an administrative order book and is not connected to checkout or payment processing.
Deleting a category moves its assigned products or posts into another category (or
creates an "Uncategorized" category) so content is preserved.
## Supabase Database

Products, blog posts, categories, admin orders, and submitted RFQs are stored in
Supabase PostgreSQL. The server uses the service-role key only in server-side code;
never expose it as a `NEXT_PUBLIC_*` variable or commit it.

1. Copy `.env.example` values into `.env.local` and set `SUPABASE_URL` plus
   `SUPABASE_SERVICE_ROLE_KEY` from your Supabase project settings.
2. In the Supabase SQL Editor, run
   [`supabase/migrations/20261028000000_initial_schema.sql`](./supabase/migrations/20261028000000_initial_schema.sql).
3. Run `npm run db:seed` to import the built-in products/blogs and any existing
   `data/content-store.json` products, posts, categories, and admin orders.
   The seed is safe to rerun: existing database rows are not overwritten.
4. Start the application with `npm run dev`.

The migration enables row-level security and grants data access only to the backend
service role. RFQs are written through the server API; product names are checked
against the database before saving. Admin pages continue to require the configured
admin session.

Cover images must use a host configured in `next.config.ts` (including
`images.unsplash.com`).
