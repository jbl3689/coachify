# Coachify

Coachify is a full-stack coaching management dashboard built with modern web technologies. It helps coaches run training sessions, manage teams & players, schedule a calendar of sessions, and track attendance — all backed by Supabase and packaged as a web + native mobile app using Capacitor.

---

## 🚀 What is this project?

**Coachify** is a responsive web application with a mobile-ready foundation (Android + iOS). It provides:

- 🔐 **Email/password auth** using Supabase Auth
- 👥 **User & team management** (coaches vs players)
- 📅 **Weekly calendar view** + session/event creation
- ✅ **Player attendance tracking** per session
- 🧩 **Drag & drop scheduling** for sessions
- 🌓 **Theme toggle** (dark/light)

This is a showcase project to demonstrate a real-world React + TypeScript stack, modern state management, and full-stack integration.

---

## 🧰 Tech stack

### Frontend

- **React 18 + TypeScript**
- **Vite** (dev server, build tooling)
- **Tailwind CSS** + **Radix UI** for styling & accessible components
- **Redux Toolkit** + **React Query** for state + server data
- **React Router v6** for routing
- **React DnD** for drag + drop interactions
- **Zod + React Hook Form** for validation (forms)
- **React Hot Toast** for notifications

### Backend / Data

- **Supabase**
  - Auth (email/password)
  - Postgres database (users, teams, weeks, days, events, attendance)
  - Supabase JS client

### Mobile

- **Capacitor** (Android + iOS scaffolding)

---

## ⚙️ Project structure (high level)

- `src/` – application source
  - `pages/` – top-level route pages (Login, Signup, Dashboard, Calendar, etc.)
  - `components/` – UI components (forms, modals, calendar, tables, etc.)
  - `services/` – Supabase API wrapper functions
  - `hooks/` – custom React hooks for data fetching and state
  - `context/` – app-wide context providers (theme, user, calendar, etc.)
  - `types/` – TypeScript types for domain models
- `android/` & `ios/` – Capacitor native projects
- `public/` – static assets

---

## 🏁 Getting started (local development)

### 1) Clone repository

```bash
git clone https://github.com/<your-org>/coachify.git
cd coachify
```

### 2) Install dependencies

```bash
npm install
```

### 3) Setup Supabase

Create a Supabase project and configure the following tables at a minimum (column names are inferred from the app types):

- `users` (includes `auth_user_id`, `full_name`, `email`, `pos_primary`, `pos_secondary`, `avatar_url`)
- `teams` (includes `team_name`, `location`, `logo`)
- `team_members` (relation table between users + teams, with `is_admin` flag)
- `weeks` (contains `week_start_date`, `team_id`, `is_populated`)
- `days` (contains `date`, `day`, `week_id`, `num_of_sessions`)
- `events` (contains `day_id`, `event_start_time`, `event_end_time`, `event_type`, `location`, `session_number`)
- `eventsAttendance` (contains `event_id`, `user_id`, `isAttending`)

> ✅ Tip: The app assumes Supabase uses the default `public` schema and that the Supabase Auth user IDs get stored in `users.auth_user_id`.

### 4) Add environment variables

Create a `.env` file in the project root (this file is ignored by Git):

```text
VITE_SUPABASE_URL=https://<your-supabase-project>.supabase.co
VITE_SUPABASE_KEY=<your-supabase-anon-key>
```

### 5) Run the app (web)

```bash
npm run dev
```

Then open http://localhost:5173

---

## 📱 Running on mobile (Capacitor)

### Android

```bash
npm run build
npx cap sync android
npx cap open android
```

### iOS

```bash
npm run build
npx cap sync ios
npx cap open ios
```

> ⚠️ You will need Xcode for iOS and Android Studio for Android.

---

## ✅ Useful scripts

- `npm run dev` – start local dev server
- `npm run build` – build production bundles
- `npm run preview` – preview production build locally
- `npm run lint` – run ESLint

---

## 🧩 Notes / How it works

- Auth is handled via **Supabase Auth**; once signed in, the app fetches the current user from the `users` table using the Supabase `auth.getUser()` ID.
- The calendar is built from a combination of `weeks`, `days`, and `events`, stored in Supabase and fetched via custom hooks.
- Team membership is modeled in `team_members`, and the UI switches between coach/admin views and player views depending on the user’s role.

---

## 📌 Future improvements (ideas)

- Add automated Supabase migrations (e.g. using `supabase migrations` or SQL files)
- Add stronger form validation rules and inline error messages
- Add a refreshable offline mode for the mobile app
- Add a user profile management screen

## Further improvements to get to MVP stage

For an admin/coach:

- Update my details (name, ph number?, profile picture)
- Update the team’s name, image, location
- Register a list of users to that team & send them email’s to signup with an account & link it to their team (unless they have one??)
- View/update (i.e. delete & maybe add, but probably not edit) the list of players in the team
- Invite coaches/admins to sign up to their team & help them out (with an email or link?)
- Create/update/delete trainings/games/misc events for the team to view the details of
- Be able to add general information about the events after they have been created
- View which users have RVSP’d to their events
- Post announcements so that the team can view them

For a player:

- Register an account after clicking on a link provided to me in an email (which will also link me to that team automatically)
- Update my details (name, ph number?, profile picture, preferred position(s))
- View events and the details about them
- RVSP to events
- View the coaches’ announcements

---

## 🧑‍💻 Contact / Links

If you’d like to demo this project, drop me a message or run it locally following the instructions above.
