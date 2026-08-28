# Document set: United Kingdom - Student Visa

Eleven deliverable files for the four package tiers on **United Kingdom →
Student Visa**, written specifically for this route under Appendix
Student of the UK Immigration Rules - deliberately not reused from the
Standard Visitor set, which is governed by different rules entirely.

## Important: read before uploading or selling against these

- **Accuracy and currency.** These were written from general, stable
  knowledge of the UK Student visa process (the points-based system, CAS,
  the maintenance-fund formula, ATAS, IHS, work rights, etc.) - not
  scraped or verified against the live gov.uk pages at upload time. Every
  document includes a "verify before you apply" notice, and the financial
  calculator specifically flags that its monthly living-cost rates are
  periodically updated by the Home Office and must be checked before
  relying on them. **Please read through each file yourself before
  putting them in front of paying customers.** Nothing here should be
  treated as legal advice.
- **Format choices**: guides/checklists are PDF; the two letter/statement
  template sets are DOCX; the financial planning calculator is a real
  Excel workbook (.xlsx) with live formulas.

## What's in here

| File | Tier | Title |
| --- | --- | --- |
| `uk-student-01-starter-application-walkthrough.pdf` | Starter | Field-by-Field Online Application Walkthrough |
| `uk-student-02-refusal-reasons.pdf` | Starter | Common Refusal Reasons & How to Avoid Them |
| `uk-student-03-master-guide.pdf` | Essential | Student Visa Master Guide |
| `uk-student-04-document-checklist.pdf` | Essential | Document Checklist by Applicant Type |
| `uk-student-05-financial-overview.pdf` | Essential | Financial Requirements Overview |
| `uk-student-09-genuine-student-statement-templates.docx` | Complete | Genuine Student Statement Templates |
| `uk-student-10-sponsor-financial-letter-templates.docx` | Complete | Sponsor & Financial Letter Templates |
| `uk-student-06-appointment-checklist.pdf` | Complete | Visa Application Centre Appointment Checklist |
| `uk-student-11-financial-calculator.xlsx` | Premium | Financial Planning Calculator |
| `uk-student-07-refusal-decision-guide.pdf` | Premium | Refusal Decision Guide |
| `uk-student-08-pre-departure-checklist.pdf` | Premium | Pre-Departure Checklist |

Every tier includes everything from the tiers below it, matching what the
pricing page promises.

## What makes this genuinely different from the Visitor route

- Governing rules: **Appendix Student**, decided on a **70-point,
  points-based system** (50 for CAS/course, 10 English language, 10
  financial) - nothing like the Visitor route's Appendix V test
- Requires a **CAS (Confirmation of Acceptance for Studies)** from a
  licensed Student sponsor - has no Visitor-route equivalent at all
- **A published, formula-based maintenance requirement** (course fees
  payable + a fixed monthly living-cost rate for up to 9 months, held for
  a continuous **28-day period**), explicitly contrasted with the
  Visitor route's "no fixed minimum" framing
- **ATAS certificates** for eligible postgraduate research courses,
  **Immigration Health Surcharge (IHS)**, and **TB testing** - none of
  which apply to Visitor applications
- **Part-time work rights during study** (commonly up to 20 hrs/week at
  degree level), a real structural contrast with the Visitor route's "no
  work at all"
- The **"Genuine Student" credibility interview**, a materially different
  mechanism from the Visitor route's largely paper-based, no-interview
  decisions
- Narrowed **dependant rights** (broadly limited to postgraduate research
  and specific government-sponsored routes under current rules)
- **Academic progression** requirements when switching from one Student
  visa to another

## The financial planning calculator

`uk-student-11-financial-calculator.xlsx` implements the actual published
maintenance-fund formula as live formulas (built with openpyxl, verified
with LibreOffice's `recalc.py`, and cross-checked by hand against two
different scenarios): course length capped at 9 months of living costs
(`MIN(9, ROUNDUP(months))`), a London/outside-London rate looked up via
`INDEX`/`MATCH`, and course fees minus any deposit already paid. The
monthly rate cells are editable (blue/yellow) with a comment pointing at
gov.uk, since the rate itself is periodically updated even though the
formula's structure is stable.

## How to upload these to the live site

1. Go to `<your-frontend-url>/admin` and enter your `ADMIN_UPLOAD_SECRET`.
2. Find **United Kingdom · Student Visa · \<tier\>** and click to expand.
3. Upload each file above with the title from the table.

Already verified working locally for all 4 tiers via a full Playwright
checkout run - correct document counts (2/3/3/3), correct titles, all
downloads returning 200 with the correct content type.
