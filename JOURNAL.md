# Journal

## 2026-10-08 — Mobile responsiveness review

- Reproduced the guest demo at 390 × 844. The dashboard fixture card rendered at half width because its column span was applied to the header and concatenated into an invalid class. The selected event panel was limited to 40% width, and account content used a fixed horizontal layout with an 80vh height.
- Found that calendar density did not fit the app's custom breakpoints: tablet showed five days in one row, while Tailwind's `lg` breakpoint changed other layouts earlier than the calendar's desktop breakpoint.
- Fixed dashboard grids and card class handling, made fixture rows wrap on small screens, and removed the empty placeholder card from the player dashboard.
- Changed calendar density to one day on phones, two on larger phones, three on tablets, and seven on desktop. Made day cards fit their grid cells, sized the selected event panel to the available width, and made week/day arrows keyboard-operable buttons.
- Updated shared page sizing, navbar, account layout, mobile dialog bounds, and table overflow behavior.
- Browser checked the guest demo at 390 × 844, 800 × 900, and 1440 × 900. No horizontal page overflow was present; calendar counts were one, three, and seven days respectively. Selecting a calendar event displayed its details across the mobile content width.
- `npm run build` passed. Changed-file ESLint passed with four pre-existing unused-parameter warnings. Repository-wide `npm run lint` still reports hundreds of issues outside these changes. No tests were run.
- Opened [PR #7](https://github.com/jbl3689/coachify/pull/7) against `main`; it remains unmerged until the five-question learning review is complete.
- James reported that the login heading lost its alignment after shared text alignment was removed. Scoped centering to the login/signup headings and kept field labels left aligned; phone inputs now use the available form width.
- Refined the coach mobile dashboard to show three upcoming fixtures first, a direct button to the full calendar, compact two-column summary cards, and the player list afterward. Kept the same semantic and visual order across screen widths. Sorted and filtered demo events by their scheduled date/time so past events no longer appear first.
- Rechecked login at 390 px and 2048 px, plus dashboard and the calendar CTA at 390 px. The CTA switches to the Calendar tab. Build and ESLint on changed files pass.
