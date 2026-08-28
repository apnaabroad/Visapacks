# Document set: Canada - Visitor Visa (Temporary Resident Visa)

Eleven deliverable files for the four package tiers on **Canada → Visitor
Visa (TRV)**, written specifically for this route under IRPA/IRPR - not
adapted from the US, UK, or any other country's content.

## Important: read before uploading or selling against these

- **Accuracy and currency.** These were written from general, stable
  knowledge of the Canadian TRV process (IRCC visa officers, the "dual
  intent" doctrine, VAC biometrics, judicial review, etc.) - not scraped
  or verified against the live canada.ca/IRCC pages at upload time. Every
  document includes a "verify before you apply" notice, but **please read
  through each file yourself before putting them in front of paying
  customers**, and spot-check the specifics (fees, processing times, form
  numbers) against IRCC's website. Nothing here should be treated as
  legal advice.
- **Format choices**: guides/checklists are PDF; the two letter-template
  sets are DOCX; the financial planning calculator is a real Excel
  workbook (.xlsx) with live formulas.

## What's in here

| File | Tier | Title |
| --- | --- | --- |
| `ca-visitor-01-starter-application-walkthrough.pdf` | Starter | Field-by-Field Online Application Walkthrough |
| `ca-visitor-02-refusal-reasons.pdf` | Starter | Common Refusal Reasons & How to Avoid Them |
| `ca-visitor-03-master-guide.pdf` | Essential | Visitor Visa (TRV) Master Guide |
| `ca-visitor-04-document-checklist.pdf` | Essential | Document Checklist by Applicant Type |
| `ca-visitor-05-financial-overview.pdf` | Essential | Financial Requirements Overview |
| `ca-visitor-09-cover-letter-templates.docx` | Complete | Cover Letter Templates |
| `ca-visitor-10-employer-sponsor-templates.docx` | Complete | Employer & Sponsor Letter Templates |
| `ca-visitor-06-appointment-checklist.pdf` | Complete | Visa Application Centre Appointment Checklist |
| `ca-visitor-11-financial-calculator.xlsx` | Premium | Financial Planning Calculator |
| `ca-visitor-07-refusal-decision-guide.pdf` | Premium | Refusal Decision Guide |
| `ca-visitor-08-pre-departure-checklist.pdf` | Premium | Pre-Departure Checklist |

Every tier includes everything from the tiers below it, matching what the
pricing page promises.

## What makes this genuinely Canada-specific

- Governing law: **IRPA/IRPR**, decided by an **IRCC visa officer** - not
  a "consular officer" or "Entry Clearance Officer"
- The statutory **"dual intent" doctrine (IRPA s.22(2))**: an applicant
  can lawfully intend future permanent residence while still qualifying
  for a temporary visa now - explicitly different framing from countries
  where any immigrant intent counts against a visitor application
- The **TRV vs. eTA** distinction based on nationality and mode of travel
- **No fixed published minimum bank balance** for this route (explicitly
  contrasted with the Study Permit's formula-based requirement in its own
  document set)
- **Visitor Record** as the extension mechanism, and the visa-validity vs.
  authorized-stay distinction (a 10-year multi-entry visa doesn't mean a
  10-year stay)
- **Federal Court judicial review** (not an "appeal" or "Administrative
  Review") as the narrow post-refusal legal remedy, requiring the Court's
  leave
- **Canada Border Services Agency (CBSA)** officers making the actual
  entry decision, distinct from IRCC's visa decision

## The financial planning calculator

`ca-visitor-11-financial-calculator.xlsx` is a real Excel workbook with
live formulas (built with openpyxl, verified with LibreOffice's
`recalc.py`, and cross-checked by hand under two different scenarios) -
trip length, traveller count, a travel-style daily rate in CAD via
`INDEX`/`MATCH`, flight cost, and whether accommodation is already paid,
computing a suggested planning total. Framed as a planning aid, since the
TRV has no official published minimum.

## How to upload these to the live site

1. Go to `<your-frontend-url>/admin` and enter your `ADMIN_UPLOAD_SECRET`.
2. Find **Canada · Visitor Visa (TRV) · \<tier\>** and click to expand.
3. Upload each file above with the title from the table.

Already verified working locally for all 4 tiers via a full Playwright
checkout run - correct document counts (2/3/3/3), correct titles, all
downloads returning 200 with the correct content type.
