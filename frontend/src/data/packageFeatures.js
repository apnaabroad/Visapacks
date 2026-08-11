// Static feature-comparison matrix shown on every visa-type page. The four
// tiers and their pricing are seeded identically for every country/visa type
// (see backend/prisma/seed.js), so this table doesn't need to vary per page -
// it just documents what each tier unlocks.
export const TIER_ORDER = ["STARTER", "ESSENTIAL", "COMPLETE", "PREMIUM"];

export const TIER_LABELS = {
  STARTER: "Starter",
  ESSENTIAL: "Essential",
  COMPLETE: "Complete",
  PREMIUM: "Premium",
};

export const FEATURE_MATRIX = [
  { label: "Field-by-field visa form walkthrough", tiers: ["STARTER", "ESSENTIAL", "COMPLETE", "PREMIUM"] },
  { label: "Common rejection/refusal mistakes to avoid", tiers: ["STARTER", "ESSENTIAL", "COMPLETE", "PREMIUM"] },
  { label: "Free updates for 12 months", tiers: ["STARTER", "ESSENTIAL", "COMPLETE", "PREMIUM"] },
  { label: "Master guide (50-70 page PDF)", tiers: ["ESSENTIAL", "COMPLETE", "PREMIUM"] },
  { label: "Complete document checklist by applicant type", tiers: ["ESSENTIAL", "COMPLETE", "PREMIUM"] },
  { label: "Financial requirements overview", tiers: ["ESSENTIAL", "COMPLETE", "PREMIUM"] },
  { label: "Cover letter templates (5 scenarios)", tiers: ["COMPLETE", "PREMIUM"] },
  { label: "Employer & sponsor letter templates", tiers: ["COMPLETE", "PREMIUM"] },
  { label: "Embassy/visa center appointment checklist", tiers: ["COMPLETE", "PREMIUM"] },
  { label: "Financial proof calculator (interactive)", tiers: ["PREMIUM"] },
  { label: "Refusal decision guide", tiers: ["PREMIUM"] },
  { label: "Pre-departure checklist", tiers: ["PREMIUM"] },
];
