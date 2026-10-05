import { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Moon,
  Sun,
  Users,
} from "lucide-react";
import { useTheme } from "@/context/themeProvider";
import styles from "./DemoExperience.module.css";

type View = "dashboard" | "calendar";
type Role = "coach" | "player";
type Session = {
  id: number;
  day: number;
  time: string;
  title: string;
  type: "Training" | "Match" | "Team event";
  location: string;
  detail: string;
  attending: number;
};

const sessions: Session[] = [
  {
    id: 1,
    day: 0,
    time: "18:30",
    title: "First team training",
    type: "Training",
    location: "Northside Training Ground",
    detail:
      "Warm-up, small-sided games and set pieces. Bring boots and a water bottle.",
    attending: 18,
  },
  {
    id: 2,
    day: 2,
    time: "19:00",
    title: "Technical session",
    type: "Training",
    location: "Pitch 2",
    detail: "Passing patterns, finishing and unit work.",
    attending: 16,
  },
  {
    id: 3,
    day: 5,
    time: "15:00",
    title: "Northside vs Riverside",
    type: "Match",
    location: "Northside Stadium",
    detail:
      "Arrive by 14:00. Team selection will be confirmed before kick-off.",
    attending: 21,
  },
  {
    id: 4,
    day: 6,
    time: "11:00",
    title: "Club breakfast",
    type: "Team event",
    location: "Clubhouse",
    detail: "A relaxed catch-up for players and coaches.",
    attending: 12,
  },
];

const players = [
  {
    initials: "AM",
    name: "Alex Morgan",
    position: "Midfielder",
    status: "Available",
  },
  {
    initials: "JT",
    name: "Jordan Taylor",
    position: "Forward",
    status: "Available",
  },
  {
    initials: "SC",
    name: "Sam Carter",
    position: "Defender",
    status: "Available",
  },
  { initials: "RL", name: "Riley Lee", position: "Goalkeeper", status: "Away" },
];

const weekday = new Intl.DateTimeFormat("en-GB", { weekday: "short" });
const dayMonth = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
});

function mondayOf(date: Date) {
  const monday = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
  return monday;
}

function weekDays(offset: number) {
  const monday = mondayOf(new Date());
  monday.setDate(monday.getDate() + offset * 7);
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday);
    date.setDate(date.getDate() + index);
    return date;
  });
}

function DemoExperience() {
  const [view, setView] = useState<View>("dashboard");
  const [role, setRole] = useState<Role>("coach");
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [rsvps, setRsvps] = useState<Record<number, boolean>>({
    1: true,
    2: true,
  });
  const { theme, setTheme } = useTheme();
  const days = useMemo(() => weekDays(weekOffset), [weekOffset]);
  const selected = sessions.find((session) => session.id === selectedId);
  const attendingCount = sessions.filter((session) => rsvps[session.id]).length;
  const nextSession = sessions[0];

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.brand}>
          Coachify<span className={styles.brandDot}>.</span>
        </div>
        <div className={styles.headerActions}>
          <span className={styles.sampleBadge}>Sample workspace</span>
          <button
            className={styles.iconButton}
            type="button"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <span className={styles.avatar} aria-label="Northside Athletic">
            NA
          </span>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.intro}>
          <div>
            <p className={styles.eyebrow}>Northside Athletic · First team</p>
            <h1>Keep the whole team in play.</h1>
            <p className={styles.lead}>
              One place for the week ahead, the squad and everyone’s
              availability.
            </p>
          </div>
          <div className={styles.roleControl} aria-label="Preview role">
            <span>Preview as</span>
            <select
              value={role}
              onChange={(event) => setRole(event.target.value as Role)}
              aria-label="Preview role"
            >
              <option value="coach">Coach</option>
              <option value="player">Player</option>
            </select>
          </div>
        </div>

        <div className={styles.notice} role="note">
          You’re exploring a sample team. Your RSVP choices stay in this browser
          session.
        </div>

        <nav className={styles.tabs} aria-label="Demo sections">
          <button
            type="button"
            className={view === "dashboard" ? styles.activeTab : ""}
            aria-current={view === "dashboard" ? "page" : undefined}
            onClick={() => setView("dashboard")}
          >
            Dashboard
          </button>
          <button
            type="button"
            className={view === "calendar" ? styles.activeTab : ""}
            aria-current={view === "calendar" ? "page" : undefined}
            onClick={() => setView("calendar")}
          >
            Calendar
          </button>
        </nav>

        {view === "dashboard" ? (
          <div className={styles.content}>
            <section className={styles.stats} aria-label="Team overview">
              <div className={styles.statCard}>
                <span className={styles.statLabel}>
                  <Users size={17} /> Squad size
                </span>
                <strong>24</strong>
                <small>4 featured players below</small>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>
                  <CalendarDays size={17} /> Next session
                </span>
                <strong>{nextSession.time}</strong>
                <small>
                  {weekday.format(days[nextSession.day])},{" "}
                  {dayMonth.format(days[nextSession.day])} · Training
                </small>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>Upcoming match</span>
                <strong>Saturday</strong>
                <small>Northside vs Riverside</small>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>
                  {role === "coach" ? "Training replies" : "Your replies"}
                </span>
                <strong>
                  {role === "coach"
                    ? `${nextSession.attending}/24`
                    : `${attendingCount}/4`}
                </strong>
                <small>
                  {role === "coach"
                    ? "Players attending next session"
                    : "Events you’re attending"}
                </small>
              </div>
            </section>

            <div className={styles.columns}>
              <section
                className={styles.panel}
                aria-labelledby="upcoming-title"
              >
                <div className={styles.panelHeading}>
                  <div>
                    <p className={styles.eyebrow}>The week ahead</p>
                    <h2 id="upcoming-title">Upcoming events</h2>
                  </div>
                  <button
                    type="button"
                    className={styles.textButton}
                    onClick={() => setView("calendar")}
                  >
                    Open calendar →
                  </button>
                </div>
                <div className={styles.eventList}>
                  {sessions.map((session) => (
                    <button
                      type="button"
                      className={styles.eventRow}
                      key={session.id}
                      onClick={() => {
                        setSelectedId(session.id);
                        setView("calendar");
                      }}
                    >
                      <span className={styles.dateTile}>
                        <strong>{days[session.day].getDate()}</strong>
                        <small>{weekday.format(days[session.day])}</small>
                      </span>
                      <span className={styles.eventCopy}>
                        <strong>{session.title}</strong>
                        <small>
                          {session.time} · {session.location}
                        </small>
                      </span>
                      <span className={styles.typeBadge}>{session.type}</span>
                    </button>
                  ))}
                </div>
              </section>

              <div className={styles.sideColumn}>
                <section
                  className={styles.panel}
                  aria-labelledby="announcement-title"
                >
                  <p className={styles.eyebrow}>From the coaching team</p>
                  <h2 id="announcement-title">This week’s note</h2>
                  <p className={styles.announcement}>
                    A full week ahead. Please confirm your availability before
                    Wednesday so we can plan the matchday squad.
                  </p>
                  <small className={styles.muted}>
                    Coach Sam · Team announcement
                  </small>
                </section>
                <section className={styles.panel} aria-labelledby="squad-title">
                  <div className={styles.panelHeading}>
                    <div>
                      <p className={styles.eyebrow}>People</p>
                      <h2 id="squad-title">Squad snapshot</h2>
                    </div>
                    <span className={styles.muted}>24 players</span>
                  </div>
                  <div className={styles.playerList}>
                    {players.map((player) => (
                      <div className={styles.playerRow} key={player.name}>
                        <span className={styles.playerAvatar}>
                          {player.initials}
                        </span>
                        <span>
                          <strong>{player.name}</strong>
                          <small>{player.position}</small>
                        </span>
                        <span
                          className={
                            player.status === "Available"
                              ? styles.available
                              : styles.away
                          }
                        >
                          {player.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        ) : (
          <section className={styles.panel} aria-labelledby="calendar-title">
            <div className={styles.calendarHeading}>
              <div>
                <p className={styles.eyebrow}>Team schedule</p>
                <h2 id="calendar-title">Week of {dayMonth.format(days[0])}</h2>
              </div>
              <div className={styles.weekControls}>
                <button
                  type="button"
                  aria-label="Previous week"
                  onClick={() => {
                    setWeekOffset((value) => value - 1);
                    setSelectedId(null);
                  }}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setWeekOffset(0);
                    setSelectedId(null);
                  }}
                >
                  Today
                </button>
                <button
                  type="button"
                  aria-label="Next week"
                  onClick={() => {
                    setWeekOffset((value) => value + 1);
                    setSelectedId(null);
                  }}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
            <div className={styles.weekGrid}>
              {days.map((day, index) => (
                <div className={styles.dayColumn} key={day.toISOString()}>
                  <div className={styles.dayHeading}>
                    <span>{weekday.format(day)}</span>
                    <strong>{day.getDate()}</strong>
                  </div>
                  {weekOffset === 0 &&
                    sessions
                      .filter((session) => session.day === index)
                      .map((session) => (
                        <button
                          type="button"
                          key={session.id}
                          className={`${styles.calendarEvent} ${selectedId === session.id ? styles.selectedEvent : ""}`}
                          onClick={() => setSelectedId(session.id)}
                        >
                          <small>
                            {session.time} · {session.type}
                          </small>
                          <strong>{session.title}</strong>
                          <span>{session.location}</span>
                        </button>
                      ))}
                </div>
              ))}
            </div>
            {selected && weekOffset === 0 ? (
              <div className={styles.detail}>
                <div>
                  <p className={styles.eyebrow}>
                    {selected.type} · {weekday.format(days[selected.day])},{" "}
                    {dayMonth.format(days[selected.day])} at {selected.time}
                  </p>
                  <h3>{selected.title}</h3>
                  <p>{selected.detail}</p>
                  <span className={styles.location}>
                    <MapPin size={16} />
                    {selected.location}
                  </span>
                </div>
                <div className={styles.detailAction}>
                  <span>
                    {role === "coach"
                      ? `${selected.attending} players attending`
                      : rsvps[selected.id]
                        ? "You’re attending"
                        : "Please confirm your availability"}
                  </span>
                  {role === "player" && (
                    <button
                      type="button"
                      onClick={() =>
                        setRsvps((previous) => ({
                          ...previous,
                          [selected.id]: !previous[selected.id],
                        }))
                      }
                    >
                      {rsvps[selected.id]
                        ? "Change to not attending"
                        : "Confirm attendance"}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <p className={styles.calendarHint}>
                Select an event to see its details. Events are shown in the
                current sample week.
              </p>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default DemoExperience;
