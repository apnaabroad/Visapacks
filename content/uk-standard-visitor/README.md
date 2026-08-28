# Document set: United Kingdom - Standard Visitor Visa

Eleven deliverable files for the four package tiers on **United Kingdom →
Standard Visitor Visa**, written specifically for this route under
Appendix V: Visitor of the UK Immigration Rules - not adapted from the US
pilot or any other country's content.

## Important: read before uploading or selling against these

- **Accuracy and currency.** These were written from general, stable
  knowledge of the UK Standard Visitor process (Appendix V, the genuine
  visitor test, UKVCAS biometrics, the eVisa system, Administrative
  Review, etc.) - not scraped or verified against the live gov.uk pages at
  upload time. Every document includes a "verify before you apply"
  notice, but **please read through each file yourself before putting
  them in front of paying customers**, and spot-check the specifics
  (fees, processing times, the exact permitted-activities list) against
  gov.uk. Nothing here should be treated as legal advice.
- **Format choices**: guides/checklists are PDF (read-only reference);
  the two letter-template sets are DOCX (customers need to edit them); the
  financial planning calculator is a real Excel workbook (.xlsx) with live
  formulas, not a static document.

## What's in here

| File | Tier | Title |
| --- | --- | --- |
| `uk-visitor-01-starter-application-walkthrough.pdf` | Starter | Field-by-Field Online Application Walkthrough |
| `uk-visitor-02-refusal-reasons.pdf` | Starter | Common Refusal Reasons & How to Avoid Them |
| `uk-visitor-03-master-guide.pdf` | Essential | Standard Visitor Visa Master Guide |
| `uk-visitor-04-document-checklist.pdf` | Essential | Document Checklist by Applicant Type |
| `uk-visitor-05-financial-overview.pdf` | Essential | Financial Requirements Overview |
| `uk-visitor-09-cover-letter-templates.docx` | Complete | Cover Letter Templates |
| `uk-visitor-10-employer-sponsor-templates.docx` | Complete | Employer & Sponsor Letter Templates |
| `uk-visitor-06-appointment-checklist.pdf` | Complete | Visa Application Centre Appointment Checklist |
| `uk-visitor-11-financial-calculator.xlsx` | Premium | Financial Planning Calculator |
| `uk-visitor-07-refusal-decision-guide.pdf` | Premium | Refusal Decision Guide |
| `uk-visitor-08-pre-departure-checklist.pdf` | Premium | Pre-Departure Checklist |

Every tier includes everything from the tiers below it, matching what the
pricing page promises.

## What makes this genuinely UK-specific (not reused US content)

- Governing rules: **Appendix V: Visitor** of the Immigration Rules, not
  any equivalent US statute
- Decision-maker: an **Entry Clearance Officer (ECO)**, not a "consular
  officer"
- Biometrics: **UKVCAS / VFS Global** appointment centres and the **ID
  Check** smartphone app, not a US-style embassy interview - most
  Standard Visitor applications are decided on paper, without an
  interview
- The **"genuine visitor" test**, the UK's own equivalent of "ties to
  home country," not a copy of INA 214(b)
- **No fixed published minimum bank balance** for this route (explicitly
  contrasted with the Student visa's formula-based requirement in its own
  document set)
- **Administrative Review**, not a US-style appeal, as the limited
  post-refusal remedy
- **eVisa** (digital immigration status) noted as increasingly replacing
  physical vignettes
- UK letter conventions throughout: "Yours faithfully," not "Sincerely"

## The financial planning calculator

`uk-visitor-11-financial-calculator.xlsx` is a real Excel workbook with
live formulas (built and verified with openpyxl + LibreOffice recalc, not
hardcoded numbers) - trip length, traveller count, a travel-style daily
rate (Budget/Moderate/Comfortable via `INDEX`/`MATCH`), flight cost, and
whether accommodation is already paid, computing a suggested planning
total. Explicitly framed as a planning aid, since the Standard Visitor
route has no official published minimum, matching the accompanying PDF
guide.

## How to upload these to the live site

1. Go to `<your-frontend-url>/admin` and enter your `ADMIN_UPLOAD_SECRET`.
2. Find **United Kingdom · Standard Visitor Visa · \<tier\>** and click to
   expand.
3. Upload each file above with the title from the table.

Already verified working locally for all 4 tiers via a full Playwright
checkout run - correct document counts (2/3/3/3), correct titles, all
downloads returning 200 with the correct content type (including the
`.xlsx` calculator, which required adding
`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` to
the backend's allowed upload MIME types).
