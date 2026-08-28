# Document set: United Arab Emirates - Tourist Visa

Eleven deliverable files for the four package tiers on **United Arab
Emirates → Tourist Visa**, written specifically for this route's genuinely
distinct system - not adapted from any other country's content.

## Important: read before uploading or selling against these

- **Accuracy and currency.** These were written from general, stable
  knowledge of the UAE tourist visa process (ICP, GDRFA Dubai, the
  sponsor model, the visa-exempt/visa-on-arrival/pre-arranged e-visa
  split, mandatory health insurance, etc.) - not scraped or verified
  against live government or airline/agency pages at upload time. Every
  document includes a "verify before you apply" notice, but **please
  read through each file yourself before putting them in front of paying
  customers**, and spot-check the specifics (fees, current visa lengths,
  overstay fine amounts) against official sources or your chosen
  sponsor. Nothing here should be treated as legal advice.
- **This is fundamentally a different kind of visa system.** Unlike
  every other country in this catalogue, the standard UAE Tourist Visa
  is not applied for directly by the traveller to a government body - an
  airline, hotel, tour operator, or UAE resident sponsor applies on
  their behalf. The content reflects this throughout (see "What makes
  this genuinely UAE-specific" below) rather than forcing it into the
  "apply directly, get a refusal letter, appeal if refused" template
  used elsewhere.
- **Format choices**: guides/checklists are PDF; the two document sets
  are DOCX (a sponsor invitation/undertaking template and a traveller
  information sheet + employer/financial letters); the cost calculator
  is a real Excel workbook (.xlsx) with live formulas.

## What's in here

| File | Tier | Title |
| --- | --- | --- |
| `ae-01-starter-application-walkthrough.pdf` | Starter | Field-by-Field Application Walkthrough |
| `ae-02-refusal-reasons.pdf` | Starter | Common Reasons Applications Don't Succeed & How to Avoid Them |
| `ae-03-master-guide.pdf` | Essential | Tourist Visa Master Guide |
| `ae-04-document-checklist.pdf` | Essential | Document Checklist by Sponsor Type |
| `ae-05-financial-overview.pdf` | Essential | Costs & Financial Overview |
| `ae-09-sponsor-invitation-templates.docx` | Complete | Sponsor Invitation & Undertaking Letter Templates |
| `ae-10-traveller-employer-templates.docx` | Complete | Traveller Information Sheet & Employer Letter Templates |
| `ae-06-pre-travel-checklist.pdf` | Complete | Pre-Travel Document Checklist |
| `ae-11-trip-cost-calculator.xlsx` | Premium | Trip Cost Planning Calculator |
| `ae-07-refusal-decision-guide.pdf` | Premium | Refusal & Reapplication Guide |
| `ae-08-pre-departure-checklist.pdf` | Premium | Pre-Departure Checklist |

Every tier includes everything from the tiers below it, matching what the
pricing page promises.

## What makes this genuinely UAE-specific

- **The sponsor-based application model**: an airline, hotel, licensed
  tour operator, or UAE resident/citizen applies on the traveller's
  behalf - individuals generally don't apply directly to a government
  portal, unlike every other country covered in this catalogue
- **A three-way nationality split**: visa-exempt, visa-on-arrival, and
  pre-arranged e-visa required, explicitly flagged as the first thing to
  check before assuming the e-visa process applies
- **Dual issuing authorities**: the federal ICP (Federal Authority for
  Identity, Citizenship, Customs & Port Security) for most of the UAE,
  and Dubai's own, materially separate GDRFA Dubai system for entry via
  Dubai specifically
- **A printed e-visa document, not a passport sticker** - a genuinely
  different physical/digital artefact from a UK/Schengen-style vignette
  or a US-style visa stamp
- **Mandatory health insurance**, a hard checked requirement like
  Schengen's (though for different structural reasons), unlike the
  optional-insurance framing used for most other visitor visas in this
  catalogue
- **No stated refusal reason and no formal appeal process** for
  individual tourist applications - explicitly and honestly flagged as
  different from every other country built so far, where a written
  refusal letter and some review mechanism generally exist
- Real UAE-specific pre-departure content: strict medication import
  rules, and cultural/legal compliance notes (alcohol, public conduct,
  photography) that carry genuine legal weight locally

## The trip cost calculator

`ae-11-trip-cost-calculator.xlsx` is framed differently from every other
country's Premium calculator in this catalogue: since there's no fixed
minimum bank balance to evidence for the standard UAE Tourist Visa, this
is a **total trip-cost budgeting tool**, not a "funds to evidence"
calculator - the government visa fee (looked up by visa type via
`INDEX`/`MATCH`), the sponsor/agency service fee, the mandatory health
insurance premium, and daily living costs by travel style. Built with
openpyxl, verified with LibreOffice's `recalc.py`, and cross-checked by
hand under two different scenarios (including a different visa type and
multiple travellers).

## How to upload these to the live site

1. Go to `<your-frontend-url>/admin` and enter your `ADMIN_UPLOAD_SECRET`.
2. Find **United Arab Emirates · Tourist Visa · \<tier\>** and click to
   expand.
3. Upload each file above with the title from the table.

Already verified working locally for all 4 tiers via a full Playwright
checkout run - correct document counts (2/3/3/3), correct titles, all
downloads returning 200 with the correct content type.
