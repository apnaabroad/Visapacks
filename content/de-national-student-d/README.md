# Document set: Germany - National Student Visa (Type D)

Eleven deliverable files for the four package tiers on **Germany →
National Student Visa**, written specifically for this route's own
financial mechanism and process - not adapted from any other country's
student-visa content in this catalogue.

## Important: read before uploading or selling against these

- **Accuracy and currency.** These were written from general, stable
  knowledge of the German National (Type D) student visa process
  (Zulassungsbescheid/university admission, the APS certification
  requirement for certain nationalities, the Sperrkonto blocked-account
  mechanism, GKV/private health insurance, the two-step visa-then-
  residence-permit process, Remonstrationsverfahren, and the
  Verwaltungsgericht Berlin judicial route) - not scraped or verified
  against live government or university pages at upload time. Every
  document includes a "verify before you apply" notice, but **please
  read through each file yourself before putting them in front of
  paying customers**, and spot-check the specifics (the current
  published Sperrkonto annual figure, insurance premiums, fees, and
  processing times) against official sources. Nothing here should be
  treated as legal advice.
- **Format choices**: guides/checklists are PDF; the two letter-template
  sets are DOCX (Statement of Purpose templates across five scenarios,
  and sponsor/financial letter templates); the financial calculator is
  a real Excel workbook (.xlsx) with live formulas.

## What's in here

| File | Tier | Title |
| --- | --- | --- |
| `de-student-01-starter-application-walkthrough.pdf` | Starter | Field-by-Field Application Walkthrough |
| `de-student-02-refusal-reasons.pdf` | Starter | Common Reasons Applications Don't Succeed & How to Avoid Them |
| `de-student-03-master-guide.pdf` | Essential | National Student Visa Master Guide |
| `de-student-04-document-checklist.pdf` | Essential | Document Checklist by Applicant Type |
| `de-student-05-financial-overview.pdf` | Essential | Financial Requirements Overview |
| `de-student-06-appointment-checklist.pdf` | Complete | Visa Appointment Checklist |
| `de-student-09-statement-of-purpose-templates.docx` | Complete | Statement of Purpose Templates |
| `de-student-10-sponsor-financial-letter-templates.docx` | Complete | Sponsor & Financial Letter Templates |
| `de-student-07-refusal-decision-guide.pdf` | Premium | Refusal Decision Guide |
| `de-student-08-pre-departure-checklist.pdf` | Premium | Pre-Departure Checklist |
| `de-student-11-financial-calculator.xlsx` | Premium | Financial Planning Calculator |

Every tier includes everything from the tiers below it, matching what the
pricing page promises.

## What makes this genuinely Germany-specific

- **The Sperrkonto mechanism**: applicants deposit a specific, published
  annual amount into a blocked account with a German-approved provider.
  The funds aren't withdrawn as a lump sum - the account releases a
  capped monthly instalment (1/12 of the annual amount) once the student
  is in Germany. This is structurally different from a UK-style 28-day
  holding period or a Canada/Australia-style single lump-sum evidence
  requirement, and the content explains it correctly rather than
  treating it as an ordinary bank balance to show.
- **The APS certification requirement**, which applies only to certain
  nationalities and is flagged explicitly as a conditional step, not a
  universal one.
- **The dual GKV/private health insurance system**, distinct from the
  single-type mandatory travel insurance required for the Schengen
  Tourist route.
- **A genuine two-step post-arrival process with real deadlines**:
  Anmeldung (address registration at the local Bürgeramt/
  Einwohnermeldeamt) as a near-immediate prerequisite, followed by the
  Aufenthaltserlaubnis (residence permit) application at the local
  Ausländerbehörde before the entry visa expires - the entry visa alone
  does not authorise the full stay.
- **Some German missions interview National Student Visa applicants**,
  explicitly flagged as different from the Schengen Tourist Visa route
  in this same catalogue, where an interview is far less likely.
- The same two-stage refusal process built for Germany's Tourist Visa
  (Remonstrationsverfahren with the same consulate, then judicial review
  at the Verwaltungsgericht Berlin), applied here to the specific
  grounds that come up for student applications: a Zulassungsbescheid
  mismatch, a missing APS certificate, or insufficient Sperrkonto
  evidence.

## The financial planning calculator

`de-student-11-financial-calculator.xlsx` models the Sperrkonto
mechanism directly: the required annual deposit, the capped monthly
instalment it actually releases (`=deposit/12`), health insurance
(switching between GKV and private rates via a dropdown-driven `IF()`
formula), the twice-yearly Semesterbeitrag, and the APS certificate fee
where applicable. This is the most structurally novel calculator built
in this project so far - no other country's mechanism involves a capped
monthly disbursement from an annual deposit. Built with openpyxl,
verified with LibreOffice's `recalc.py` (0 errors), and cross-checked by
hand under two scenarios, including one that switches the insurance
type from GKV to Private and adds an APS fee, confirming the `IF()`
switch and monthly-disbursement math both work correctly.

## How to upload these to the live site

1. Go to `<your-frontend-url>/admin` and enter your `ADMIN_UPLOAD_SECRET`.
2. Find **Germany · National Student Visa · \<tier\>** and click to
   expand.
3. Upload each file above with the title from the table.

Already verified working locally for all 4 tiers via a full Playwright
checkout run - correct document counts (2/3/3/3), correct titles, all
downloads returning 200 with the correct content type.
