# Coachify journal

## 2026-10-05 — Public web demo slice

James chose a polished web demo before a full coach/player MVP, web before mobile, access without login, and modest visual refinement rather than a redesign. These are confirmed project directions from his direct answers on 2026-10-05.

The initial audit found a clean `main` branch, an obsolete ESLint config entry, a TypeScript unused import that prevented the build, hardcoded dashboard figures alongside Supabase data, and no checked-in database migrations or tests. The signed-in app's behaviour and database policies have not been verified.

Created a separate `/demo` route with sample data so visitors can inspect the product without a Supabase account. Isolated signed-in route imports so missing Supabase environment variables do not block the public demo. Added a dashboard, calendar, event detail, role preview, transient RSVP, theme switch, refined slate/teal styling and screenshot assets. Kept the existing signed-in routes intact. Corrected the baseline TypeScript error and obsolete ESLint extension; the broader lint backlog is left for a dedicated cleanup.

Checks: `npm run build` passed; focused ESLint passed; browser checks covered dashboard/calendar navigation, coach/player switch, RSVP, theme and a narrow mobile viewport. Full ESLint now runs and reports 458 issues across older files, mostly formatting. No deployment or live database action was taken.

Next: review screenshots and demo behaviour, open the PR, then tackle real account/team/event workflows and dependency updates in separately scoped slices. Hosting and portfolio integration require James's approval.
