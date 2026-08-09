// Seed data for VisaPacks.
//
// HOW TO ADD A NEW COUNTRY:
// Just append a new entry to the `countries` array below, following the same
// shape (code, slug, name, flagEmoji, region, summary, visaTypes[]). Each visa
// type needs a slug/name/description and a base price - buildTiers() will
// generate the Basic/Standard/Premium packages for you. Re-run `npm run
// db:seed` and it will upsert the new data without touching existing rows.
// No frontend or backend code changes are required - everything is read
// from the database.

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Generates the standard three-tier package lineup for a visa type from a
// single base price. Pass `overrides` to customize a specific tier.
function buildTiers(basePrice, currency = "USD") {
  return [
    {
      tier: "BASIC",
      name: "Basic",
      tagline: "Do it yourself, with the right checklist",
      price: basePrice,
      currency,
      turnaround: "Self-paced",
      popular: false,
      features: [
        "Personalized document checklist",
        "Step-by-step application guide",
        "Access to official form links",
        "Email support (48h response)",
      ],
    },
    {
      tier: "STANDARD",
      name: "Standard",
      tagline: "Guided review before you submit",
      price: Math.round(basePrice * 2.2),
      currency,
      turnaround: "3-5 business days",
      popular: true,
      features: [
        "Everything in Basic",
        "Application form review by a visa expert",
        "Document verification & error checks",
        "Unlimited email support",
        "Live chat support (24h response)",
      ],
    },
    {
      tier: "PREMIUM",
      name: "Premium",
      tagline: "Full hand-holding from start to finish",
      price: Math.round(basePrice * 4),
      currency,
      turnaround: "1-2 business days",
      popular: false,
      features: [
        "Everything in Standard",
        "1-on-1 video consultation with an expert",
        "Mock visa interview & prep session",
        "Application submitted-with-you walkthrough",
        "Priority support (same-day response)",
        "Rejection-risk assessment report",
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
        basePrice: 59,
      },
      {
        slug: "student-f1",
        name: "Student Visa (F-1)",
        description: "For full-time academic study at a US institution.",
        basePrice: 79,
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
        basePrice: 55,
      },
      {
        slug: "student",
        name: "Student Visa",
        description: "For studying at a licensed UK student sponsor.",
        basePrice: 75,
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
        basePrice: 49,
      },
      {
        slug: "study-permit",
        name: "Study Permit",
        description: "For enrolling in a designated learning institution.",
        basePrice: 75,
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
        basePrice: 55,
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
        basePrice: 55,
      },
      {
        slug: "student-500",
        name: "Student Visa (Subclass 500)",
        description: "For full-time study at an Australian institution.",
        basePrice: 79,
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
        basePrice: 45,
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
        basePrice: 55,
      },
      {
        slug: "national-student-d",
        name: "National Student Visa (Type D)",
        description: "Long-stay visa for university study in Germany.",
        basePrice: 85,
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
        basePrice: 49,
      },
    ],
  },
];

async function main() {
  for (const [countryIndex, countryData] of countries.entries()) {
    const { visaTypes, ...countryFields } = countryData;

    const country = await prisma.country.upsert({
      where: { slug: countryFields.slug },
      update: { ...countryFields, sortOrder: countryIndex },
      create: { ...countryFields, sortOrder: countryIndex },
    });

    for (const [visaIndex, visaTypeData] of visaTypes.entries()) {
      const { basePrice, ...visaTypeFields } = visaTypeData;

      const visaType = await prisma.visaType.upsert({
        where: { countryId_slug: { countryId: country.id, slug: visaTypeFields.slug } },
        update: { ...visaTypeFields, sortOrder: visaIndex },
        create: { ...visaTypeFields, sortOrder: visaIndex, countryId: country.id },
      });

      for (const tierData of buildTiers(basePrice)) {
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
