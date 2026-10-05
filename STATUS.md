# Coachify status

Updated: 2026-10-05

- Goal: a polished, web-only portfolio demo that visitors can explore without login; preserve the existing visual direction and refine its dark slate/teal palette. Source: James's direct answers, 2026-10-05.
- Current branch: `feat/public-demo`; [PR #4](https://github.com/jbl3689/coachify/pull/4) is open for review. No deployment has been made.
- Demo: `/demo` uses explicitly labelled sample data, separate from Supabase. Dashboard, calendar, role preview, theme switch and transient player RSVP are available.
- Validation: production build passes; focused lint on changed TypeScript files passes. Browser checks passed at desktop and mobile sizes. Repository-wide lint reports 458 older issues after its obsolete config entry was fixed.
- Open: review demo visuals and scope with James; release hosting and portfolio link need separate approval. Real team/account flows, database migrations and dependency upgrades remain future work.
- PR and learning review: PR #4 open/unmerged; all five review questions pending.
