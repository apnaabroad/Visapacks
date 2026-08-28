# Document set: Schengen Area - Short-Stay Tourist Visa (Type C)

Eleven deliverable files for the four package tiers on **Schengen Area →
Short-Stay Tourist Visa (Type C)**, written specifically for this route
under the EU Visa Code (Regulation (EC) No 810/2009) - not adapted from
any single-country content, since Schengen is 29 states sharing one legal
framework but each deciding applications through their own consulates.

## Important: read before uploading or selling against these

- **Accuracy and currency.** These were written from general, stable
  knowledge of the Schengen short-stay process (the competent-consulate
  rule, mandatory travel insurance, the 90/180-day rule, the "cascade"
  multi-entry mechanism, Annex VI refusal grounds, etc.) - not scraped or
  verified against any specific consulate's live requirements at upload
  time. Every document includes a "verify before you apply" notice, and
  the financial calculator specifically flags that its per-country
  reference amounts are illustrative only. **Please read through each
  file yourself before putting them in front of paying customers**, and
  spot-check the specifics (the current insurance minimum, fees,
  processing times, and the current reference amount) against the actual
  consulate a customer will apply to. Nothing here should be treated as
  legal advice.
- **This covers one visa type, not one country.** Only the "main
  destination" concept and a handful of illustrative countries (France,
  Germany, Italy, Spain, Netherlands) appear by name in the financial
  calculator - customers applying through other Schengen states'
  consulates should add a row with that country's own reference amount.
- **Format choices**: guides/checklists are PDF; the two letter-template
  sets are DOCX; the financial planning calculator is a real Excel
  workbook (.xlsx) with live formulas.

## What's in here

| File | Tier | Title |
| --- | --- | --- |
| `sch-01-starter-application-walkthrough.pdf` | Starter | Field-by-Field Application Walkthrough |
| `sch-02-refusal-reasons.pdf` | Starter | Common Refusal Reasons & How to Avoid Them |
| `sch-03-master-guide.pdf` | Essential | Short-Stay Visa (Type C) Master Guide |
| `sch-04-document-checklist.pdf` | Essential | Document Checklist by Applicant Type |
| `sch-05-financial-overview.pdf` | Essential | Financial Requirements Overview |
| `sch-09-cover-letter-templates.docx` | Complete | Cover Letter Templates |
| `sch-10-employer-sponsor-templates.docx` | Complete | Employer & Sponsor Letter Templates |
| `sch-06-appointment-checklist.pdf` | Complete | Visa Appointment Checklist |
| `sch-11-financial-calculator.xlsx` | Premium | Financial Planning Calculator |
| `sch-07-refusal-decision-guide.pdf` | Premium | Refusal Decision Guide |
| `sch-08-pre-departure-checklist.pdf` | Premium | Pre-Departure Checklist |

Every tier includes everything from the tiers below it, matching what the
pricing page promises.

## What makes this genuinely Schengen-specific

- Governing law: the **EU Visa Code (Regulation (EC) No 810/2009)** -
  decided by the individual member state's consulate responsible for the
  application, not a single EU-wide authority
- The **"competent consulate" rule** (main destination, or first point of
  entry if time is split evenly) - a structurally different concept from
  any single-country visa route
- **Mandatory travel medical insurance** with a minimum coverage amount,
  checked as a hard requirement - not just advisable, unlike every other
  country built in this project so far
- **Reference amounts for "means of subsistence" that genuinely vary by
  member state** - not a single figure, and not just a figure that
  changes over time
- The **multi-entry "cascade" principle**, letting compliant repeat
  applicants build up to longer-validity visas over successive
  applications
- The **90/180-day rule calculated across the whole Schengen area
  combined**, not per country
- A **standardised EU-wide refusal form (Annex VI)** listing specific
  checked grounds, and - unlike the UK/Canada/US pattern built so
  far - a genuine **right of appeal**, governed by the refusing state's
  own national law
- Country-varying sponsorship declarations (e.g. France's attestation
  d'accueil, Germany's Verpflichtungserklärung), explicitly flagged as
  not interchangeable with a generic letter

## The financial planning calculator

`sch-11-financial-calculator.xlsx` is a real Excel workbook with live
formulas (built with openpyxl, verified with LibreOffice's `recalc.py`,
and cross-checked by hand under two different scenarios) - trip length,
traveller count, a per-destination-country daily reference amount via
`INDEX`/`MATCH` (editable, with five illustrative countries), flight
cost, whether accommodation is already paid, and - uniquely among this
project's calculators so far - a **mandatory travel medical insurance
premium** as its own priced line item, computing a suggested planning
total.

## How to upload these to the live site

1. Go to `<your-frontend-url>/admin` and enter your `ADMIN_UPLOAD_SECRET`.
2. Find **Schengen Area · Short-Stay Tourist Visa (Type C) · \<tier\>**
   and click to expand.
3. Upload each file above with the title from the table.

Already verified working locally for all 4 tiers via a full Playwright
checkout run - correct document counts (2/3/3/3), correct titles, all
downloads returning 200 with the correct content type.
