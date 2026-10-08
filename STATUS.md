# Status

- 2026-10-08: Responsive layout fixes and coach dashboard redesign are on `fix/mobile-responsive-layout`.
- Browser checked at 390, 800, and 1440 px with the local guest demo; no horizontal page overflow observed. The coach view now puts upcoming events beside the roster on desktop and stacks them on mobile.
- Latest production build and changed-file lint pass; ESLint reports one existing unused-parameter warning in the table column callback. Full lint previously reported existing issues elsewhere in the repository.
- PR #7 remains open and unmerged. James approved adding the dashboard redesign to the PR and asked to skip the learning review. Do not merge without separate approval.
- Added the selected team's name and location to the coach dashboard identity panel, alongside player and coach totals. Replaced the guest demo's misleading Coachify logo/sample squad label with an Arsenal FC monogram, consistent with the existing demo roster.
