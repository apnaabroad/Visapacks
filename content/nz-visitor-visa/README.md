# Document set: New Zealand - Visitor Visa

Eleven deliverable files for the four package tiers on **New Zealand →
Visitor Visa**, written specifically for this route's genuinely distinct
system - not adapted from any other country's visitor-visa content in
this catalogue.

## Important: read before uploading or selling against these

- **Accuracy and currency.** These were written from general, stable
  knowledge of the New Zealand Visitor Visa process (Immigration New
  Zealand/INZ, the NZeTA/full-visa split, the International Visitor
  Conservation and Tourism Levy, INZ's published per-month financial
  guideline, the INZ 1025 Sponsorship Form, the "genuine visitor" test,
  and the Immigration and Protection Tribunal's limited jurisdiction
  over standard visitor refusals) - not scraped or verified against
  live government pages at upload time. Every document includes a
  "verify before you apply" notice, but **please read through each file
  yourself before putting them in front of paying customers**, and
  spot-check the specifics (the current published monthly figures, visa
  and IVL fees, and processing times) against official sources. Nothing
  here should be treated as legal advice.
- **Format choices**: guides/checklists are PDF; the two letter-template
  sets are DOCX (cover letters and sponsor/host letters); the financial
  calculator is a real Excel workbook (.xlsx) with live formulas.

## What's in here

| File | Tier | Title |
| --- | --- | --- |
| `nz-01-starter-application-walkthrough.pdf` | Starter | Field-by-Field Application Walkthrough |
| `nz-02-refusal-reasons.pdf` | Starter | Common Refusal Reasons & How to Avoid Them |
| `nz-03-master-guide.pdf` | Essential | Visitor Visa Master Guide |
| `nz-04-document-checklist.pdf` | Essential | Document Checklist by Applicant Type |
| `nz-05-financial-overview.pdf` | Essential | Financial Requirements Overview |
| `nz-06-application-checklist.pdf` | Complete | Application Submission Checklist |
| `nz-09-cover-letter-templates.docx` | Complete | Cover Letter Templates |
| `nz-10-sponsor-host-templates.docx` | Complete | Sponsor & Host Letter Templates |
| `nz-07-refusal-decision-guide.pdf` | Premium | Refusal Decision Guide |
| `nz-08-pre-departure-checklist.pdf` | Premium | Pre-Departure Checklist |
| `nz-11-financial-calculator.xlsx` | Premium | Financial Planning Calculator |

Every tier includes everything from the tiers below it, matching what the
pricing page promises.

## What makes this genuinely New Zealand-specific

- **The NZeTA/full-visa split**: most nationalities don't apply for a
  Visitor Visa at all - they request an NZeTA (New Zealand Electronic
  Travel Authority), a separate, simpler online authorisation that
  isn't a visa. This pack is explicit that a full Visitor Visa
  application is only for non-waiver nationalities or specific
  circumstances the NZeTA doesn't cover, rather than assuming every
  reader needs the full process.
- **A specific, published per-month financial guideline** - NZD 1,000
  per month for self-funded accommodation, or NZD 400 per month if
  accommodation is already paid for - unlike the open-ended "show you
  can support yourself" framing used for most other visitor visas in
  this catalogue.
- **The INZ 1025 Sponsorship Form**, a specific official form a New
  Zealand-based sponsor completes to formally guarantee accommodation
  and/or maintenance costs - a genuinely different mechanism from an
  informal invitation letter.
- **The "genuine visitor" test** as the single overarching standard INZ
  applies, rather than separate pass/fail financial and intent
  thresholds.
- **Limited formal appeal rights**: a standard Visitor Visa refusal
  generally carries no statutory right of appeal to the Immigration and
  Protection Tribunal, which mainly handles residence and deportation
  matters - genuinely more restrictive than the appeal mechanisms
  described for most other countries in this catalogue. The Refusal
  Decision Guide explains what's actually available instead (an
  Ombudsman complaint about process, judicial review, or reapplication).
- **The Parent Boost Visitor Visa**, a distinct long-stay category for
  parents/grandparents of New Zealand citizens or residents, flagged
  separately from the standard Visitor Visa's rules.
- Real New Zealand-specific pre-departure content: the eVisa (not a
  physical sticker), and the country's strict biosecurity declaration
  requirements at the border.

## The financial planning calculator

`nz-11-financial-calculator.xlsx` models Immigration New Zealand's own
published per-month guideline directly - a specific reference figure,
not a generic daily-rate-by-travel-style table like most other
calculators in this catalogue. It looks up the applicable monthly rate
(NZD 1,000 or 400, depending on whether accommodation is already paid
for) via `INDEX`/`MATCH`, and includes a sponsor-offset line item for an
INZ 1025 Sponsorship Form, clamped so the total never goes negative.
Built with openpyxl, verified with LibreOffice's `recalc.py` (0 errors),
and cross-checked by hand under three scenarios, including one where a
large sponsorship amount correctly floors the total at exactly NZD 0.

## How to upload these to the live site

1. Go to `<your-frontend-url>/admin` and enter your `ADMIN_UPLOAD_SECRET`.
2. Find **New Zealand · Visitor Visa · \<tier\>** and click to expand.
3. Upload each file above with the title from the table.

Already verified working locally for all 4 tiers via a full Playwright
checkout run - correct document counts (2/3/3/3), correct titles, all
downloads returning 200 with the correct content type.
