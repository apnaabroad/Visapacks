# Document set: Australia - Student Visa (Subclass 500)

Eleven deliverable files for the four package tiers on **Australia →
Student Visa (Subclass 500)**, written specifically for this route under
the Migration Act 1958 and Migration Regulations 1994 - deliberately not
reused from the Visitor visa set, which has no fixed financial
requirement and no mandatory insurance at all.

## Important: read before uploading or selling against these

- **Accuracy and currency.** These were written from general, stable
  knowledge of the Australian Student visa process (CRICOS, the CoE, the
  Genuine Student requirement, OSHC, work-rights caps, the Temporary
  Graduate visa, etc.) - not scraped or verified against the live
  homeaffairs.gov.au pages at upload time. Several elements of Australian
  student visa policy (the Genuine Student framing, work-hour caps, and
  Temporary Graduate visa eligibility) have changed more than once in
  recent years, and every document flags this explicitly rather than
  committing to a figure that may already be out of date. **Please read
  through each file yourself before putting them in front of paying
  customers**, and confirm current specifics on the department's website.
  Nothing here should be treated as legal advice.
- **Format choices**: guides/checklists are PDF; the two letter/statement
  template sets are DOCX; the financial planning calculator is a real
  Excel workbook (.xlsx) with live formulas.

## What's in here

| File | Tier | Title |
| --- | --- | --- |
| `au-student-01-starter-application-walkthrough.pdf` | Starter | Field-by-Field Online Application Walkthrough |
| `au-student-02-refusal-reasons.pdf` | Starter | Common Refusal Reasons & How to Avoid Them |
| `au-student-03-master-guide.pdf` | Essential | Student Visa (Subclass 500) Master Guide |
| `au-student-04-document-checklist.pdf` | Essential | Document Checklist by Applicant Type |
| `au-student-05-financial-overview.pdf` | Essential | Financial Requirements Overview |
| `au-student-09-genuine-student-statement-templates.docx` | Complete | Genuine Student Statement Templates |
| `au-student-10-sponsor-financial-letter-templates.docx` | Complete | Sponsor & Financial Letter Templates |
| `au-student-06-appointment-checklist.pdf` | Complete | Application Follow-Up Checklist |
| `au-student-11-financial-calculator.xlsx` | Premium | Financial Planning Calculator |
| `au-student-07-refusal-decision-guide.pdf` | Premium | Refusal Decision Guide |
| `au-student-08-pre-departure-checklist.pdf` | Premium | Pre-Departure Checklist |

Every tier includes everything from the tiers below it, matching what the
pricing page promises.

## What makes this genuinely different from the Visitor route

- Requires a **Confirmation of Enrolment (CoE)** from a **CRICOS**-
  registered provider (Australia's equivalent of a Letter of Acceptance,
  CAS, or DLI Letter of Acceptance) - no Visitor-route equivalent at all
- **Overseas Student Health Cover (OSHC)**, mandatory for the entire
  visa duration - a hard, checked requirement, unlike the Visitor route's
  optional Reciprocal Health Care Agreement framing
- **A published, formula-based financial requirement**: course fees
  payable + a published annual living-cost figure (with a published
  addition per accompanying family member) + travel costs - explicitly
  contrasted with the Visitor visa's "no fixed minimum"
- The **"Genuine Student" requirement**, Australia's course-specific
  genuineness test, explicitly flagged as having been updated in recent
  policy rounds rather than assumed fixed
- **Capped part-time work rights during study**, deliberately left
  unstated as a fixed number given how often the cap has changed
  in recent years
- The **Temporary Graduate visa (subclass 485)** as the distinct
  post-study pathway
- **Welfare arrangements for under-18 applicants** (custodianship or
  provider-arranged accommodation)

## The financial planning calculator

`au-student-11-financial-calculator.xlsx` implements the published AUD
cost-of-living formula as live formulas (built with openpyxl, verified
with LibreOffice's `recalc.py`, and cross-checked by hand under two
scenarios, including one with accompanying family members): course fees
payable (fees minus any amount already paid), plus a base living-cost
figure with a per-accompanying-family-member addition, plus travel costs.
The living-cost cells are editable (blue/yellow) with a comment pointing
at homeaffairs.gov.au, since the rate itself is periodically updated even
though the formula's structure is stable.

## How to upload these to the live site

1. Go to `<your-frontend-url>/admin` and enter your `ADMIN_UPLOAD_SECRET`.
2. Find **Australia · Student Visa (Subclass 500) · \<tier\>** and click
   to expand.
3. Upload each file above with the title from the table.

Already verified working locally for all 4 tiers via a full Playwright
checkout run - correct document counts (2/3/3/3), correct titles, all
downloads returning 200 with the correct content type.
