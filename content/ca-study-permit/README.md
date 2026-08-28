# Document set: Canada - Study Permit

Eleven deliverable files for the four package tiers on **Canada → Study
Permit**, written specifically for this route under IRPA/IRPR -
deliberately not reused from the Visitor Visa set, which has a
structurally different financial test entirely.

## Important: read before uploading or selling against these

- **Accuracy and currency.** These were written from general, stable
  knowledge of the Canadian Study Permit process (DLIs, the "dual intent"
  doctrine, the LICO-based cost-of-living formula, PGWP, work rights,
  etc.) - not scraped or verified against the live canada.ca/IRCC pages
  at upload time. Every document includes a "verify before you apply"
  notice, and the financial calculator specifically flags that its
  living-cost figures are periodically updated by IRCC and must be
  checked before relying on them. **Please read through each file
  yourself before putting them in front of paying customers.** Nothing
  here should be treated as legal advice.
- **Format choices**: guides/checklists are PDF; the two letter/statement
  template sets are DOCX; the financial planning calculator is a real
  Excel workbook (.xlsx) with live formulas.

## What's in here

| File | Tier | Title |
| --- | --- | --- |
| `ca-study-01-starter-application-walkthrough.pdf` | Starter | Field-by-Field Online Application Walkthrough |
| `ca-study-02-refusal-reasons.pdf` | Starter | Common Refusal Reasons & How to Avoid Them |
| `ca-study-03-master-guide.pdf` | Essential | Study Permit Master Guide |
| `ca-study-04-document-checklist.pdf` | Essential | Document Checklist by Applicant Type |
| `ca-study-05-financial-overview.pdf` | Essential | Financial Requirements Overview |
| `ca-study-09-study-plan-templates.docx` | Complete | Study Plan Templates |
| `ca-study-10-sponsor-financial-letter-templates.docx` | Complete | Sponsor & Financial Letter Templates |
| `ca-study-06-appointment-checklist.pdf` | Complete | Visa Application Centre Appointment Checklist |
| `ca-study-11-financial-calculator.xlsx` | Premium | Financial Planning Calculator |
| `ca-study-07-refusal-decision-guide.pdf` | Premium | Refusal Decision Guide |
| `ca-study-08-pre-departure-checklist.pdf` | Premium | Pre-Departure Checklist |

Every tier includes everything from the tiers below it, matching what the
pricing page promises.

## What makes this genuinely different from the Visitor Visa

- Requires a **Letter of Acceptance from a Designated Learning
  Institution (DLI)**, identified by its own **DLI number** - no Visitor
  Visa equivalent at all
- A **Provincial/Territorial Attestation Letter (PAL)**, introduced under
  Canada's international student cap policy, required for most (not all)
  applicants
- **A published, formula-based financial requirement**: tuition payable +
  a Low Income Cut-Off (LICO)-based living-cost figure (with a published
  addition per accompanying family member) + return transportation -
  explicitly contrasted with the Visitor Visa's "no fixed minimum"
- **Off-campus work rights during study**, subject to a weekly hour cap
  during term (the cap itself intentionally left unstated as a fixed
  number in the guide, since IRCC has changed it more than once in recent
  years - readers are pointed to check the current limit)
- The **Study Plan** as the genuineness-testing document (Canada's
  equivalent of a "Genuine Student" assessment), explicitly built on the
  same **"dual intent" doctrine (IRPA s.22(2))** that governs the Visitor
  Visa
- The **Post-Graduation Work Permit (PGWP)** as the post-study pathway,
  flagged with appropriate caution given how often its eligibility rules
  have changed
- **Custodianship requirements** for minor applicants, set provincially
- The **Port of Entry (POE) Letter of Introduction** mechanic: the actual
  Study Permit is issued by a CBSA officer at the border, not before

## The financial planning calculator

`ca-study-11-financial-calculator.xlsx` implements the actual published
cost-of-living formula as live formulas (built with openpyxl, verified
with LibreOffice's `recalc.py`, and cross-checked by hand under two
different scenarios, including one with accompanying family members):
tuition payable (fees minus any amount already paid), plus a base
living-cost figure with a per-accompanying-family-member addition, plus
return transportation. The living-cost cells are editable (blue/yellow)
with a comment pointing at IRCC's website, since the rate itself is
periodically updated even though the formula's structure is stable.

## How to upload these to the live site

1. Go to `<your-frontend-url>/admin` and enter your `ADMIN_UPLOAD_SECRET`.
2. Find **Canada · Study Permit · \<tier\>** and click to expand.
3. Upload each file above with the title from the table.

Already verified working locally for all 4 tiers via a full Playwright
checkout run - correct document counts (2/3/3/3), correct titles, all
downloads returning 200 with the correct content type.
