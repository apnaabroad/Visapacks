# Document set: Germany - Schengen Tourist Visa (Type C)

Eleven deliverable files for the four package tiers on **Germany →
Schengen Tourist Visa**, written specifically for Germany's own
Schengen procedure - not adapted from the general Schengen pack already
built for the other Schengen-area entry.

## Important: read before uploading or selling against these

- **Accuracy and currency.** These were written from general, stable
  knowledge of the German Schengen short-stay process (the Auswärtiges
  Amt/consulate system, VFS Global appointment booking in many
  jurisdictions, the Verpflichtungserklärung mechanism, mandatory travel
  medical insurance, Remonstrationsverfahren, and the
  Verwaltungsgericht Berlin judicial route) - not scraped or verified
  against live government pages at upload time. Every document includes
  a "verify before you apply" notice, but **please read through each
  file yourself before putting them in front of paying customers**, and
  spot-check the specifics (fees, processing times, current published
  reference amounts) against official sources. Nothing here should be
  treated as legal advice.
- **Format choices**: guides/checklists are PDF; the two letter-template
  sets are DOCX (cover letters and host/employer letters); the financial
  calculator is a real Excel workbook (.xlsx) with live formulas.

## What's in here

| File | Tier | Title |
| --- | --- | --- |
| `de-tourist-01-starter-application-walkthrough.pdf` | Starter | Field-by-Field Application Walkthrough |
| `de-tourist-02-refusal-reasons.pdf` | Starter | Common Reasons Applications Don't Succeed & How to Avoid Them |
| `de-tourist-03-master-guide.pdf` | Essential | Schengen Tourist Visa Master Guide |
| `de-tourist-04-document-checklist.pdf` | Essential | Document Checklist by Applicant Type |
| `de-tourist-05-financial-overview.pdf` | Essential | Financial Requirements Overview |
| `de-tourist-06-appointment-checklist.pdf` | Complete | Visa Appointment Checklist |
| `de-tourist-09-cover-letter-templates.docx` | Complete | Cover Letter Templates |
| `de-tourist-10-host-employer-templates.docx` | Complete | Host Invitation & Employer Letter Templates |
| `de-tourist-07-refusal-decision-guide.pdf` | Premium | Refusal Decision Guide |
| `de-tourist-08-pre-departure-checklist.pdf` | Premium | Pre-Departure Checklist |
| `de-tourist-11-financial-calculator.xlsx` | Premium | Financial Planning Calculator |

Every tier includes everything from the tiers below it, matching what the
pricing page promises.

## What makes this genuinely Germany-specific

- **The Verpflichtungserklärung**: a formal declaration of commitment a
  German-resident host obtains *in person* at their own local
  Ausländerbehörde - not a letter the host simply writes and signs, and
  a mechanism specific to Germany within the Schengen area. The content
  explains this correctly rather than treating it as an ordinary
  invitation letter.
- **Mandatory travel medical insurance** with the specific Schengen-area
  coverage minimum, checked as a hard document requirement.
- **A two-stage refusal process unique to this catalogue's German
  entries**: a Remonstrationsverfahren (an internal objection filed with
  the *same* consulate that refused the application) as the first step,
  followed by judicial review at the Verwaltungsgericht Berlin if that
  doesn't succeed - genuinely different from the appeal mechanisms
  described for other Schengen countries.
- Real German-specific procedural detail: VFS Global appointment
  booking used by many German consulates, and what to expect at the
  application/biometric appointment itself.

## The financial planning calculator

`de-tourist-11-financial-calculator.xlsx` is a trip-cost **planning
estimate**, not an official minimum - Germany doesn't publish a single
fixed figure for this route. It includes a distinctive offset line item
not present in the general Schengen calculator built earlier in this
project: an amount already covered by a Verpflichtungserklärung, which
reduces the suggested total the traveller needs to evidence themselves
(clamped so the total never goes negative). Built with openpyxl,
verified with LibreOffice's `recalc.py` (0 errors), and cross-checked by
hand under three scenarios, including one where a large
Verpflichtungserklärung amount correctly floors the total at exactly
€0.

## How to upload these to the live site

1. Go to `<your-frontend-url>/admin` and enter your `ADMIN_UPLOAD_SECRET`.
2. Find **Germany · Schengen Tourist Visa · \<tier\>** and click to
   expand.
3. Upload each file above with the title from the table.

Already verified working locally for all 4 tiers via a full Playwright
checkout run - correct document counts (2/3/3/3), correct titles, all
downloads returning 200 with the correct content type.
