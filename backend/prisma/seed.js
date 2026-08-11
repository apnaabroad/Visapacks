// Seed data for VisaPacks.
//
// HOW TO ADD A NEW COUNTRY:
// Just append a new entry to the `countries` array below, following the same
// shape (code, slug, name, flagEmoji, region, summary, visaTypes[]). Each visa
// type just needs a slug/name/description - buildTiers() attaches the
// standard Starter/Essential/Complete/Premium lineup (same four tiers, same
// prices, for every visa type) automatically. Re-run `npm run db:seed` and it
// will upsert the new data without touching existing rows. No frontend or
// backend code changes are required - everything is read from the database.

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const TIER_SLUGS = ["STARTER", "ESSENTIAL", "COMPLETE", "PREMIUM"];

// Generates the standard four-tier package lineup, identical for every
// country and visa type - pricing is flat across the whole catalog.
function buildTiers() {
  return [
    {
      tier: "STARTER",
      name: "Starter",
      tagline: "The essentials to fill out your form correctly",
      price: 599,
      currency: "INR",
      turnaround: "1 file",
      popular: false,
      features: [
        "Field-by-field visa form walkthrough",
        "Common rejection/refusal mistakes to avoid",
        "Free updates for 12 months",
      ],
    },
    {
      tier: "ESSENTIAL",
      name: "Essential",
      tagline: "A complete guide plus your full document checklist",
      price: 999,
      currency: "INR",
      turnaround: "3 files",
      popular: false,
      features: [
        "Everything in Starter",
        "Master guide (comprehensive PDF, 50-70 pages)",
        "Complete document checklist (by applicant type - employed, self-employed, student, retired)",
        "Financial requirements overview",
      ],
    },
    {
      tier: "COMPLETE",
      name: "Complete",
      tagline: "Every template and checklist you need to apply with confidence",
      price: 1599,
      currency: "INR",
      turnaround: "8 files",
      popular: true,
      features: [
        "Everything in Essential",
        "Cover letter templates (solo traveler, family, business, wedding, reapplication)",
        "Employer & sponsor letter templates",
        "Embassy/visa center appointment checklist",
      ],
    },
    {
      tier: "PREMIUM",
      name: "Premium",
      tagline: "The full toolkit, from financial planning to pre-departure",
      price: 1999,
      currency: "INR",
      turnaround: "11 files",
      popular: false,
      features: [
        "Everything in Complete",
        "Financial proof calculator (interactive)",
        "Refusal decision guide (appeal vs reapply)",
        "Pre-departure checklist",
      ],
    },
  ];
}

const countries = [
  {
    code: "US",
    slug: "united-states",
    name: "United States",
    flagEmoji: "🇺🇸",
    region: "North America",
    summary: "Tourist, business and student visas for the United States.",
    visaTypes: [
      {
        slug: "tourist-b2",
        name: "Tourist Visa (B-2)",
        description: "For vacation, sightseeing, or visiting family and friends.",
      },
      {
        slug: "student-f1",
        name: "Student Visa (F-1)",
        description: "For full-time academic study at a US institution.",
      },
    ],
  },
  {
    code: "UK",
    slug: "united-kingdom",
    name: "United Kingdom",
    flagEmoji: "🇬🇧",
    region: "Europe",
    summary: "Standard Visitor and Student visas for the United Kingdom.",
    visaTypes: [
      {
        slug: "standard-visitor",
        name: "Standard Visitor Visa",
        description: "For tourism, visiting family, or short business trips.",
      },
      {
        slug: "student",
        name: "Student Visa",
        description: "For studying at a licensed UK student sponsor.",
      },
    ],
  },
  {
    code: "CA",
    slug: "canada",
    name: "Canada",
    flagEmoji: "🇨🇦",
    region: "North America",
    summary: "Visitor visas and study permits for Canada.",
    visaTypes: [
      {
        slug: "visitor-visa",
        name: "Visitor Visa (TRV)",
        description: "Temporary Resident Visa for tourism or visiting family.",
      },
      {
        slug: "study-permit",
        name: "Study Permit",
        description: "For enrolling in a designated learning institution.",
      },
    ],
  },
  {
    code: "SCHENGEN",
    slug: "schengen",
    name: "Schengen Area",
    flagEmoji: "🇪🇺",
    region: "Europe",
    summary: "Short-stay tourist visa valid across 27 Schengen countries.",
    visaTypes: [
      {
        slug: "short-stay-tourist",
        name: "Short-Stay Tourist Visa (Type C)",
        description: "Up to 90 days within a 180-day period, for tourism or family visits.",
      },
    ],
  },
  {
    code: "AU",
    slug: "australia",
    name: "Australia",
    flagEmoji: "🇦🇺",
    region: "Oceania",
    summary: "Visitor and student visas for Australia.",
    visaTypes: [
      {
        slug: "visitor-600",
        name: "Visitor Visa (Subclass 600)",
        description: "For tourism or visiting family in Australia.",
      },
      {
        slug: "student-500",
        name: "Student Visa (Subclass 500)",
        description: "For full-time study at an Australian institution.",
      },
    ],
  },
  {
    code: "AE",
    slug: "uae",
    name: "United Arab Emirates",
    flagEmoji: "🇦🇪",
    region: "Middle East",
    summary: "Tourist visas for the United Arab Emirates.",
    visaTypes: [
      {
        slug: "tourist-visa",
        name: "Tourist Visa",
        description: "30 or 60 day single/multiple entry tourist visa.",
      },
    ],
  },
  {
    code: "DE",
    slug: "germany",
    name: "Germany",
    flagEmoji: "🇩🇪",
    region: "Europe",
    summary: "Schengen tourist and national student visas for Germany.",
    visaTypes: [
      {
        slug: "schengen-tourist",
        name: "Schengen Tourist Visa",
        description: "Short-stay visa for tourism or visiting family in Germany.",
      },
      {
        slug: "national-student-d",
        name: "National Student Visa (Type D)",
        description: "Long-stay visa for university study in Germany.",
      },
    ],
  },
  {
    code: "NZ",
    slug: "new-zealand",
    name: "New Zealand",
    flagEmoji: "🇳🇿",
    region: "Oceania",
    summary: "Visitor visas for New Zealand.",
    visaTypes: [
      {
        slug: "visitor-visa",
        name: "Visitor Visa",
        description: "For tourism, or visiting friends and family in New Zealand.",
      },
    ],
  },
];

async function main() {
  // Retiring the old Basic/Standard/Premium lineup for the new four-tier
  // catalog: clear out any orders and packages left over from the previous
  // tier names so they don't linger as orphaned rows the app never shows.
  const staleOrders = await prisma.order.deleteMany({
    where: { package: { tier: { notIn: TIER_SLUGS } } },
  });
  const stalePackages = await prisma.package.deleteMany({
    where: { tier: { notIn: TIER_SLUGS } },
  });
  if (staleOrders.count || stalePackages.count) {
    console.log(`Cleared ${staleOrders.count} stale order(s) and ${stalePackages.count} stale package(s) from the old tier lineup`);
  }

  for (const [countryIndex, countryData] of countries.entries()) {
    const { visaTypes, ...countryFields } = countryData;

    const country = await prisma.country.upsert({
      where: { slug: countryFields.slug },
      update: { ...countryFields, sortOrder: countryIndex },
      create: { ...countryFields, sortOrder: countryIndex },
    });

    for (const [visaIndex, visaTypeFields] of visaTypes.entries()) {
      const visaType = await prisma.visaType.upsert({
        where: { countryId_slug: { countryId: country.id, slug: visaTypeFields.slug } },
        update: { ...visaTypeFields, sortOrder: visaIndex },
        create: { ...visaTypeFields, sortOrder: visaIndex, countryId: country.id },
      });

      for (const tierData of buildTiers()) {
        await prisma.package.upsert({
          where: { visaTypeId_tier: { visaTypeId: visaType.id, tier: tierData.tier } },
          update: tierData,
          create: { ...tierData, visaTypeId: visaType.id },
        });
      }
    }

    console.log(`Seeded ${country.name} (${visaTypes.length} visa type${visaTypes.length === 1 ? "" : "s"})`);
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
