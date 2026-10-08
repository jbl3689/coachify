# Journal

## 2026-10-08 — Mobile responsiveness review

- Reproduced the guest demo at 390 × 844. The dashboard fixture card rendered at half width because its column span was applied to the header and concatenated into an invalid class. The selected event panel was limited to 40% width, and account content used a fixed horizontal layout with an 80vh height.
- Found that calendar density did not fit the app's custom breakpoints: tablet showed five days in one row, while Tailwind's `lg` breakpoint changed other layouts earlier than the calendar's desktop breakpoint.
- Fixed dashboard grids and card class handling, made fixture rows wrap on small screens, and removed the empty placeholder card from the player dashboard.
- Changed calendar density to one day on phones, two on larger phones, three on tablets, and seven on desktop. Made day cards fit their grid cells, sized the selected event panel to the available width, and made week/day arrows keyboard-operable buttons.
- Updated shared page sizing, navbar, account layout, mobile dialog bounds, and table overflow behavior.
- Browser checked the guest demo at 390 × 844, 800 × 900, and 1440 × 900. No horizontal page overflow was present; calendar counts were one, three, and seven days respectively. Selecting a calendar event displayed its details across the mobile content width.
- `npm run build` passed. Changed-file ESLint passed with four pre-existing unused-parameter warnings. Repository-wide `npm run lint` still reports hundreds of issues outside these changes. No tests were run.
