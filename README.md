# VisaPacks

A self-service visa application platform. Customers pick a country and visa
type, then buy a Basic, Standard, or Premium assistance package to help them
prepare and submit their own visa application (this is not a filing service -
customers always apply themselves).

## Stack

- **Frontend**: React 18 + Vite + React Router + Tailwind CSS v4
- **Backend**: Node.js + Express (runs as a normal server locally, and as a
  Vercel Serverless Function in production - see `backend/api/[[...path]].js`)
- **Database**: Postgres via Prisma ORM

## Project structure

```
Visapacks/
├── backend/
│   ├── api/
│   │   └── [[...path]].js     # Vercel Serverless Function - matches all of /api/* natively
│   ├── prisma/
│   │   ├── schema.prisma      # Country, VisaType, Package, Order models
│   │   └── seed.js            # Seeds the 8 launch countries - see "Adding a country"
│   ├── vercel.json            # Routes the non-/api paths ("/", "/health") to the same function
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
scope, not necessarily the deployment's public domain). Open `<that-url>/health`
in a browser - you should see `{"status":"ok"}`. Open `<that-url>/api/countries` -
you should see the 8 seeded countries as JSON.

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

### Troubleshooting: `/api/*` routes 404 but `/` doesn't

Vercel treats the `api/` directory as a reserved, filesystem-routed
namespace: any request path starting with `/api/` is matched directly
against files in that folder *before* `vercel.json`'s `rewrites` are
considered, regardless of what those rewrites say. That's why the Express
entry point is named `backend/api/[[...path]].js` - the optional catch-all
filename makes Vercel's own filesystem routing match every path under
`/api/*` (including the bare `/api`) natively, with no rewrite involved. If
you ever rename or restructure that file, keep it (or an equivalent
catch-all) directly inside `backend/api/`, or every `/api/*` route will 404
again even though non-`/api` paths keep working.

### Local dev after switching to a hosted database

Once you have a `DATABASE_URL` from step 2, run `npm run db:migrate` locally
(from a machine with normal network access to Postgres) instead of
`db:push` - this generates and commits a proper `backend/prisma/migrations/`
folder so future schema changes are tracked. `db:push` (used by the Vercel
build) is intentionally migration-free so first-time deploys never depend on
a migration history existing yet.
