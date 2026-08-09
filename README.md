# VisaPacks

A self-service visa application platform. Customers pick a country and visa
type, then buy a Basic, Standard, or Premium assistance package to help them
prepare and submit their own visa application (this is not a filing service -
customers always apply themselves).

## Stack

- **Frontend**: React 18 + Vite + React Router + Tailwind CSS v4
- **Backend**: Node.js + Express
- **Database**: SQLite via Prisma ORM (see [Switching to Postgres](#switching-to-postgres))

## Project structure

```
Visapacks/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma      # Country, VisaType, Package, Order models
│   │   ├── seed.js            # Seeds the 8 launch countries - see "Adding a country"
│   │   └── migrations/
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

Requires Node.js 18+.

```bash
npm install                 # installs root, backend, and frontend workspaces
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
npm run db:migrate          # creates the SQLite database and tables
npm run db:seed             # seeds the 8 launch countries/visa types/packages
npm run dev                 # runs backend (http://localhost:4000) and frontend (http://localhost:5173) together
```

Or run everything in one shot: `npm run setup && npm run dev`.

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

## Switching to Postgres

The default SQLite setup requires no external services, which makes local
development and this initial setup frictionless. To move to Postgres for
production:

1. In `backend/prisma/schema.prisma`, change the datasource provider from
   `sqlite` to `postgresql`.
2. Set `DATABASE_URL` in `backend/.env` to your Postgres connection string.
3. Run `npm run db:migrate` again to create the schema in the new database.

No model or application code changes are needed.
