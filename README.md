# VisaPacks

A self-service visa application platform. Customers pick a country and visa
type, then buy a Basic, Standard, or Premium assistance package to help them
prepare and submit their own visa application (this is not a filing service -
customers always apply themselves).

## Stack

- **Frontend**: React 18 + Vite + React Router + Tailwind CSS v4
- **Backend**: Node.js + Express (runs as a normal server locally, and as
  Vercel Serverless Functions in production - see `backend/api/`, and the
  troubleshooting note below on why it's several small files rather than one)
- **Database**: Postgres via Prisma ORM

## Project structure

```
Visapacks/
├── backend/
│   ├── api/                   # One Vercel Serverless Function file per route shape - see
│   │                          # the "Troubleshooting" section below for why
│   ├── prisma/
│   │   ├── schema.prisma      # Country, VisaType, Package, Order models
│   │   └── seed.js            # Seeds the 8 launch countries - see "Adding a country"
│   └── src/
│       ├── controllers/       # Request handlers
│       ├── routes/            # Express routers
│       ├── middleware/        # Error handling
│       ├── lib/prisma.js      # Prisma client singleton
│       ├── utils/
│       ├── app.js             # Express app (middleware + routes)
│       └── index.js           # Server entry point
└── frontend/
    └── src/
        ├── api/                # Axios client + API functions
        ├── components/         # Navbar, cards, etc.
        ├── pages/              # Home, CountryDetail, VisaTypeDetail, Checkout, OrderConfirmation
        ├── App.jsx             # Route definitions
        └── main.jsx
```

## Data model

```
Country 1---n VisaType 1---n Package 1---n Order
```

- **Country** - a destination (US, UK, Canada, Schengen, Australia, UAE, Germany, New Zealand at launch)
- **VisaType** - a visa category for a country (e.g. Tourist, Student)
- **Package** - a purchasable tier for a visa type: Basic / Standard / Premium, each with its own price and feature list
- **Order** - a guest checkout purchase of a package (no customer account required)

Countries, visa types, and packages are all stored in the database and
fetched dynamically by the frontend - nothing is hardcoded in the UI, so new
countries show up automatically everywhere (homepage grid, routing, etc.)
once they exist in the database.

## Setup

Requires Node.js 18+ and a reachable Postgres database (a local Postgres, Docker,
or a free hosted instance - see [Deploying to Vercel](#deploying-to-vercel) below
for how to get one in a couple of minutes; the same database works for both
local dev and production).

```bash
npm install                 # installs root, backend, and frontend workspaces
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
# edit backend/.env and set DATABASE_URL to your Postgres connection string
npm run db:migrate          # creates the tables (and records a migration you can commit)
npm run db:seed             # seeds the 8 launch countries/visa types/packages
npm run dev                 # runs backend (http://localhost:4000) and frontend (http://localhost:5173) together
```

Or run everything in one shot once `DATABASE_URL` is set: `npm run setup && npm run dev`.

Useful individual commands:

```bash
npm run dev:backend         # backend only
npm run dev:frontend        # frontend only
npm run db:studio           # visual DB browser (Prisma Studio)
npm run build               # production build of the frontend
```

## Adding a new country

No code changes are required. Open `backend/prisma/seed.js` and append a new
entry to the `countries` array, following the existing shape:

```js
{
  code: "JP",
  slug: "japan",
  name: "Japan",
  flagEmoji: "🇯🇵",
  region: "Asia",
  summary: "Tourist visas for Japan.",
  visaTypes: [
    {
      slug: "tourist-visa",
      name: "Tourist Visa",
      description: "For short-term tourism in Japan.",
      basePrice: 49, // Basic tier price - Standard/Premium are derived automatically
    },
  ],
},
```

Then re-run:

```bash
npm run db:seed
```

The seed script upserts by slug, so it's safe to re-run any time - existing
countries are updated in place and the new one is added. The homepage,
routing, and checkout all pick it up automatically since they read from the
API/database.

If you'd rather manage content without touching code at all, insert rows
directly with Prisma Studio (`npm run db:studio`) or build an admin API on
top of the existing `Country` / `VisaType` / `Package` models - the schema
was designed to support that without changes.

## API overview

| Method | Path                                                    | Description                          |
| ------ | -------------------------------------------------------- | ------------------------------------- |
| GET    | `/api/health`                                              | Health check (use this on Vercel, not bare `/health`) |
| GET    | `/api/countries`                                          | List active countries                 |
| GET    | `/api/countries/:slug`                                    | Country + its visa types              |
| GET    | `/api/countries/:countrySlug/visa-types/:visaTypeSlug`     | Visa type + its packages              |
| GET    | `/api/packages/:id`                                        | Single package + visa type + country  |
| POST   | `/api/orders`                                              | Create an order (guest checkout)      |
| GET    | `/api/orders/:id`                                          | Fetch an order                        |

## Payments

Checkout currently creates a `PENDING` order without collecting real payment
- there's no payment processor wired up yet. To go live, integrate a
provider (Stripe, Razorpay, etc.) in `backend/src/controllers/orders.controller.js`
and flip the order to `PAID` on a successful charge/webhook.

## Deploying to Vercel

The frontend and backend deploy as two separate Vercel projects from the same
GitHub repo. Everything below is done in the Vercel dashboard - no CLI or
local commands are required.

### 1. Create a free Vercel account

Go to [vercel.com](https://vercel.com) and sign up, ideally with **Continue
with GitHub** using the account that has access to this repo - that makes the
next steps a one-click "import" instead of a manual git connection.

### 2. Create a Postgres database

From the Vercel dashboard: **Storage → Create Database → Postgres** (the
option labeled for use with Prisma). Give it a name (e.g. `visapacks-db`) and
create it. Once it's created, open its **`.env.local`** / "Quickstart" tab and
copy the connection string shown there - you'll paste it as `DATABASE_URL` in
the next step. Free tier is enough for this project.

### 3. Deploy the backend

**Add New → Project → Import** this repo, then:

- **Root Directory**: `backend`
- **Framework Preset**: Other
- **Environment Variables**: add `DATABASE_URL` = *(the connection string from step 2)*
- Click **Deploy**

On deploy, Vercel runs `backend/package.json`'s `vercel-build` script, which
runs `prisma generate`, syncs the schema into your new database with
`prisma db push`, and seeds the 8 launch countries - all automatically, every
deploy. No separate migration step to run by hand.

When it finishes, get the definitive production URL from the project's
**Deployments** tab → the latest deployment → **Domains** (don't guess from
the dashboard/team URL in your browser's address bar - that's your account
scope, not necessarily the deployment's public domain). Open `<that-url>/api/health`
in a browser - you should see `{"status":"ok"}`. Open `<that-url>/api/countries` -
you should see the 8 seeded countries as JSON. (Use `/api/health`, not bare
`/health`, when checking a Vercel deployment - see the troubleshooting note
below for why only paths under `/api/*` are guaranteed to reach the app there.)

### 4. Deploy the frontend

**Add New → Project → Import** the same repo again, then:

- **Root Directory**: `frontend`
- **Framework Preset**: Vite (auto-detected)
- **Environment Variables**: add `VITE_API_URL` = `https://<your-backend-url-from-step-3>/api`
- Click **Deploy**

When it finishes, the resulting URL (e.g. `https://visapacks-frontend.vercel.app`)
is your public site - open it in a browser.

### 5. (Optional) Lock down CORS

By default the backend accepts requests from any origin (`CORS_ORIGIN` is
unset, which the app treats as `*`) so step 3 and 4 don't need to happen in a
particular order. Once you know your frontend's URL, you can go back to the
backend project's **Settings → Environment Variables**, add
`CORS_ORIGIN` = `https://<your-frontend-url>`, and redeploy to restrict it.

**If you add a custom domain** (e.g. `visapacks.com`) to the frontend
project later, `CORS_ORIGIN` needs to include it too, or every request from
that domain gets CORS-blocked even though the API itself works fine - the
browser shows this as "No 'Access-Control-Allow-Origin' header is present"
in the console. Set `CORS_ORIGIN` to your custom domain (either the apex,
`https://visapacks.com`, or the `www` subdomain, `https://www.visapacks.com`
- the backend automatically allows both once it sees either one, so you
don't need to list both explicitly), then redeploy the backend for the env
var change to take effect. If you serve both the apex and `www` as
independent domains and something else is stricter about matching, you can
still list them both explicitly, comma-separated:
`https://visapacks.com,https://www.visapacks.com`.

### Troubleshooting: `/api/*` routes 404 but `/api/health` doesn't

Vercel treats the `api/` directory as a reserved, filesystem-routed
namespace: any request path starting with `/api/` is matched directly
against files in that folder, natively - no `vercel.json` rewrite is
involved or needed.

Two earlier versions of this backend tried to serve every route from a
single catch-all file - first `backend/api/[[...path]].js` (Next.js's
"optional catch-all" convention), then `backend/api/[...path].js` (the
"required" variant, one-or-more segments). Both looked correct on paper and
matched Vercel's documented dynamic-segment syntax, but in production
neither one reliably matched paths with more than one segment: a one-segment
path like `/api/health` worked, while a two-segment path like
`/api/countries/united-states` still 404'd on the exact same deployment -
this was confirmed directly (browser network tab, not just reasoning) before
landing on the current approach. In other words, the "rest parameter" (`...`)
semantics that make catch-all files work throughout Next.js did not reliably
extend to plain Serverless Functions here.

The fix that actually worked: give up on wildcard/catch-all matching
entirely and add one small file per real route shape, using only literal
filenames and single-segment `[param].js` dynamic segments (never `...`) -
the most basic Vercel routing primitive there is, with no ambiguity about
how many segments it captures:

```
backend/api/
├── health.js                                        → GET  /api/health
├── countries/
│   ├── index.js                                      → GET  /api/countries
│   ├── [slug].js                                      → GET  /api/countries/:slug
│   └── [countrySlug]/visa-types/[visaTypeSlug].js      → GET  /api/countries/:countrySlug/visa-types/:visaTypeSlug
├── packages/
│   └── [id].js                                        → GET  /api/packages/:id
└── orders/
    ├── index.js                                       → POST /api/orders
    └── [id].js                                        → GET  /api/orders/:id
```

Every one of these files has identical, trivial content - `export default
createApp()` - because the actual routing logic still lives entirely in
Express (`backend/src/app.js` and `backend/src/routes/`), which correctly
sees the true request path regardless of which physical file Vercel used to
select the function. The shim files exist purely so Vercel's own router has
an unambiguous, single-segment-at-a-time file to match against for every
path shape the app needs - nothing here depends on multi-segment wildcard
behavior anymore.

If you add a new nested route to the Express app, add a matching shim file
under `backend/api/` following the same pattern, or that route will 404 in
production even though it works locally (`npm run dev` doesn't go through
Vercel's file-based routing at all, so this class of bug is invisible until
you deploy - test new routes against a real Vercel deployment before
assuming they work).

### Local dev after switching to a hosted database

Once you have a `DATABASE_URL` from step 2, run `npm run db:migrate` locally
(from a machine with normal network access to Postgres) instead of
`db:push` - this generates and commits a proper `backend/prisma/migrations/`
folder so future schema changes are tracked. `db:push` (used by the Vercel
build) is intentionally migration-free so first-time deploys never depend on
a migration history existing yet.
