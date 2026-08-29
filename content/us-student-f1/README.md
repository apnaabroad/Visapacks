# Document set: United States - F-1 Student Visa

Eleven deliverable files for the four package tiers on **United States →
F-1 Student Visa**, written specifically for this route's genuinely
distinct system - not adapted from the US Tourist (B-2) pack already
built for this catalogue, and not adapted from any other country's
student-visa content.

## Important: read before uploading or selling against these

- **Accuracy and currency.** These were written from general, stable
  knowledge of the F-1 process (SEVP/SEVIS, the Form I-20, the SEVIS
  I-901 fee, the DS-160, the 120-day/30-day entry-timing rules, the
  Designated School Official's role, INA 214(b), and CPT/OPT basics) -
  not scraped or verified against live government or school pages at
  upload time. Every document includes a "verify before you apply"
  notice, but **please read through each file yourself before putting
  them in front of paying customers**, and spot-check the specifics
  (the current SEVIS and visa fees, and processing times) against
  official sources. Nothing here should be treated as legal advice.
- **Format choices**: guides/checklists are PDF; the two letter-template
  sets are DOCX (study plan templates and sponsor/funding letters); the
  financial calculator is a real Excel workbook (.xlsx) with live
  formulas.

## What's in here

| File | Tier | Title |
| --- | --- | --- |
| `us-f1-01-starter-application-walkthrough.pdf` | Starter | Field-by-Field Application Walkthrough |
| `us-f1-02-refusal-reasons.pdf` | Starter | Common Refusal Reasons & How to Avoid Them |
| `us-f1-03-master-guide.pdf` | Essential | F-1 Student Visa Master Guide |
| `us-f1-04-document-checklist.pdf` | Essential | Document Checklist by Funding Type |
| `us-f1-05-financial-overview.pdf` | Essential | Financial Requirements Overview |
| `us-f1-06-interview-appointment-checklist.pdf` | Complete | Visa Interview Appointment Checklist |
| `us-f1-09-study-plan-templates.docx` | Complete | Study Plan Templates |
| `us-f1-10-sponsor-funding-templates.docx` | Complete | Sponsor & Funding Letter Templates |
| `us-f1-07-refusal-decision-guide.pdf` | Premium | Refusal Decision Guide |
| `us-f1-08-pre-departure-checklist.pdf` | Premium | Pre-Departure Checklist |
| `us-f1-11-financial-calculator.xlsx` | Premium | Financial Planning Calculator |

Every tier includes everything from the tiers below it, matching what the
pricing page promises.

## What makes this genuinely F-1-specific

- **SEVIS and the I-20 as the anchor of the whole process**: unlike a
  tourist visa, an F-1 application can't even begin until an SEVP-
  approved school issues a Form I-20 through SEVIS - the content is
  built around that dependency from the first page, rather than
  treating the I-20 as just another supporting document.
- **The I-20's own financial figure as the reference amount**, not a
  government-set minimum - each school sets its own tuition-plus-living
  figure for its programme and location, which is what the Financial
  Requirements Overview and the calculator are built around.
- **The SEVIS I-901 fee**, paid separately from the visa application
  fee and tied to the applicant's SEVIS ID - a distinct financial and
  procedural step from the standard MRV visa fee.
- **The 120-day/30-day entry-timing rules**: a visa can't be issued more
  than 120 days before the I-20's program start date, and entry to the
  US can't happen more than 30 days before it - both specific to
  student and exchange visitor visas.
- **The Designated School Official (DSO)** as an ongoing point of
  contact, including the option to defer a program start date on the
  I-20 if a visa is delayed or refused close to term start - a
  genuinely F-1-specific safety valve with no equivalent in the B-2
  pack.
- **INA 214(b)** examined through F-1-specific evidence - study plan
  coherence, funding source clarity, and post-graduation intent -
  rather than repeating the general B-2 framing.
- **Funding-type-specific document guidance** (self/family-funded,
  scholarship, teaching/research assistantship for graduate students,
  F-2 dependents), and the mandatory post-arrival international student
  check-in that validates the SEVIS record as "active" - a genuine
  legal requirement distinct from simply enrolling in classes.

## The financial planning calculator

`us-f1-11-financial-calculator.xlsx` models the I-20's own cost figure
directly (`MAX(I-20 figure - funding already covered, 0)`), the same
clamp pattern used for Canada's and Australia's study-permit
calculators, but combined here with a per-F-2-dependent add-on and both
the SEVIS I-901 fee and the MRV visa application fee as separate line
items - a fee combination unique to this calculator in the catalogue.
Built with openpyxl, verified with LibreOffice's `recalc.py` (0
errors), and cross-checked by hand under two scenarios, including one
where full scholarship funding correctly zeroes out the net cost while
the dependent add-on and fees still apply.

## How to upload these to the live site

1. Go to `<your-frontend-url>/admin` and enter your `ADMIN_UPLOAD_SECRET`.
2. Find **United States · F-1 Student Visa · \<tier\>** and click to
   expand.
3. Upload each file above with the title from the table.

Already verified working locally for all 4 tiers via a full Playwright
checkout run - correct document counts (2/3/3/3), correct titles, all
downloads returning 200 with the correct content type.
