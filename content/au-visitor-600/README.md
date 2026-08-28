# Document set: Australia - Visitor Visa (Subclass 600, Tourist stream)

Eleven deliverable files for the four package tiers on **Australia →
Visitor Visa (Subclass 600)**, written specifically for this route under
the Migration Act 1958 and Migration Regulations 1994 - not adapted from
any other country's content.

## Important: read before uploading or selling against these

- **Accuracy and currency.** These were written from general, stable
  knowledge of the Australian Visitor visa process (the Department of
  Home Affairs, the Genuine Temporary Entrant test, the electronic visa
  system, Reciprocal Health Care Agreements, etc.) - not scraped or
  verified against the live homeaffairs.gov.au pages at upload time.
  Every document includes a "verify before you apply" notice, but
  **please read through each file yourself before putting them in front
  of paying customers**, and spot-check the specifics (fees, processing
  times, review rights) against the official government site. Nothing
  here should be treated as legal advice.
- **Format choices**: guides/checklists are PDF; the two letter-template
  sets are DOCX; the financial planning calculator is a real Excel
  workbook (.xlsx) with live formulas.

## What's in here

| File | Tier | Title |
| --- | --- | --- |
| `au-visitor-01-starter-application-walkthrough.pdf` | Starter | Field-by-Field Online Application Walkthrough |
| `au-visitor-02-refusal-reasons.pdf` | Starter | Common Refusal Reasons & How to Avoid Them |
| `au-visitor-03-master-guide.pdf` | Essential | Visitor Visa (Subclass 600) Master Guide |
| `au-visitor-04-document-checklist.pdf` | Essential | Document Checklist by Applicant Type |
| `au-visitor-05-financial-overview.pdf` | Essential | Financial Requirements Overview |
| `au-visitor-09-cover-letter-templates.docx` | Complete | Cover Letter Templates |
| `au-visitor-10-employer-sponsor-templates.docx` | Complete | Employer & Sponsor Letter Templates |
| `au-visitor-06-appointment-checklist.pdf` | Complete | Application Follow-Up Checklist |
| `au-visitor-11-financial-calculator.xlsx` | Premium | Financial Planning Calculator |
| `au-visitor-07-refusal-decision-guide.pdf` | Premium | Refusal Decision Guide |
| `au-visitor-08-pre-departure-checklist.pdf` | Premium | Pre-Departure Checklist |

Every tier includes everything from the tiers below it, matching what the
pricing page promises.

## What makes this genuinely Australia-specific

- Governing law: the **Migration Act 1958 and Migration Regulations
  1994**, decided by a **Department of Home Affairs case officer** - not
  an ECO, consular officer, or IRCC visa officer
- The **named "Genuine Temporary Entrant (GTE)" criterion** - a formal,
  explicitly labelled test, unlike the informal "ties to home country"
  framing used elsewhere
- A **fully electronic, label-free visa system** - no passport vignette
  at all, checked via passport number and the VEVO service
- **Reciprocal Health Care Agreements (RHCAs)** giving eligible visitors
  from specific countries limited Medicare access, a structurally
  different concept from Schengen's mandatory insurance or the US/UK/
  Canada "advisable but not required" framing
- **Generally limited or no independent merits review** for a refused
  Tourist stream application - correctly distinguished from Schengen's
  genuine right of appeal
- Australia's own institutions: **ImmiAccount**, the **Visa Application
  Charge (VAC)**, **Australian Border Force**, and strict **biosecurity
  declarations** at arrival

## The financial planning calculator

`au-visitor-11-financial-calculator.xlsx` is a real Excel workbook with
live formulas (built with openpyxl, verified with LibreOffice's
`recalc.py`, and cross-checked by hand under two different scenarios) -
trip length, traveller count, a travel-style daily rate in AUD via
`INDEX`/`MATCH`, flight cost, and whether accommodation is already paid,
computing a suggested planning total. Framed as a planning aid, since the
Tourist stream has no official published minimum.

## How to upload these to the live site

1. Go to `<your-frontend-url>/admin` and enter your `ADMIN_UPLOAD_SECRET`.
2. Find **Australia · Visitor Visa (Subclass 600) · \<tier\>** and click
   to expand.
3. Upload each file above with the title from the table.

Already verified working locally for all 4 tiers via a full Playwright
checkout run - correct document counts (2/3/3/3), correct titles, all
downloads returning 200 with the correct content type.
