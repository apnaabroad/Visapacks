# Pilot document set: United States - Tourist Visa (B-2)

Eleven real deliverable files for the four package tiers on **United States →
Tourist Visa (B-2)**, built to prove out the [package-document delivery
system](../README.md#package-documents) end to end before producing the
remaining 51 country/visa-type combinations.

## Important: read before uploading or selling against these

- **Accuracy and currency.** These were written from general, stable
  knowledge of the U.S. B-2 process (the DS-160 form, the INA 214(b) legal
  standard, the interview format, I-94/I-539 status rules, etc.) - not
  scraped or verified against the live state.gov/travel.state.gov pages at
  upload time. Every document includes a "verify before you apply" notice,
  but **please read through each file yourself before putting them in front
  of paying customers**, and spot-check the specifics (form names, the legal
  citations, the described process) against the official government site.
  Nothing here should be treated as legal advice.
- **This is one visa type, not the whole catalog.** The other 7 countries
  and 12 remaining visa types don't have documents yet - packages without
  uploads just show no "Your documents" section on the confirmation page
  (verified - it degrades gracefully, doesn't break anything).
- **Format choices**: guides/checklists are PDF (read-only reference);
  the two letter-template sets are DOCX (customers need to edit them); the
  financial proof calculator is a self-contained interactive HTML file (see
  below).

## What's in here

| File | Tier | Title |
| --- | --- | --- |
| `01-starter-ds160-walkthrough.pdf` | Starter | Field-by-Field DS-160 Walkthrough |
| `02-starter-rejection-reasons.pdf` | Starter | Common Rejection Reasons & How to Avoid Them |
| `03-essential-master-guide.pdf` | Essential | US Tourist Visa (B-2) Master Guide |
| `04-essential-document-checklist.pdf` | Essential | Document Checklist by Applicant Type |
| `05-essential-financial-overview.pdf` | Essential | Financial Requirements Overview |
| `09-complete-cover-letter-templates.docx` | Complete | Cover Letter Templates |
| `10-complete-employer-sponsor-templates.docx` | Complete | Employer & Sponsor Letter Templates |
| `06-complete-appointment-checklist.pdf` | Complete | Embassy/Visa Center Appointment Checklist |
| `11-premium-financial-proof-calculator.html` | Premium | Financial Proof Calculator |
| `07-premium-refusal-decision-guide.pdf` | Premium | Refusal Decision Guide |
| `08-premium-pre-departure-checklist.pdf` | Premium | Pre-Departure Checklist |

Every tier includes everything from the tiers below it (Essential's 3 files
are in addition to Starter's 2, and so on) - matches what the pricing page
already promises.

## How to upload these to the live site

1. Go to `<your-frontend-url>/admin` and enter your `ADMIN_UPLOAD_SECRET`.
2. Find **United States · Tourist Visa (B-2) · \<tier\>** and click it to expand.
3. For each file above that belongs to that tier, upload it with the title
   from the table (the description column in the admin form is optional -
   the descriptions used during testing are in the upload log/commit
   message if you want to reuse them).

Once uploaded, they appear automatically on the order confirmation page for
anyone who buys that package - already verified working locally for all 4
tiers (correct file, correct content type, downloads successfully).

## The financial proof calculator

`11-premium-financial-proof-calculator.html` is a real interactive tool, not
a static mockup - open it directly in a browser and it works fully offline
(no external requests, no build step). It computes a suggested planning
estimate from trip length, traveler count, a travel-style daily rate, flight
cost, and whether accommodation is already paid - clearly labeled throughout
as a planning aid, since B-2 has no official published minimum bank balance.
