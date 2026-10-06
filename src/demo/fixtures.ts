import type {
  DayState,
  EventAttendanceState,
  EventState,
  TeamState,
  UserState,
  WeekState,
} from "@/types/types";

const monday = new Date();
monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
monday.setHours(0, 0, 0, 0);

function dateAt(dayOffset: number) {
  const date = new Date(monday);
  date.setDate(date.getDate() + dayOffset);
  return date;
}

function localDate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export const guestUserId = 1;
export const guestTeamId = 1;

export const demoTeams: TeamState[] = [
  {
    id: guestTeamId,
    team_name: "Arsenal Sample Squad",
    location: "North London",
    logo: "/coachify-logo.png",
  },
];

export const demoUsers: UserState[] = [
  {
    id: 1,
    auth_user_id: "guest-coach",
    full_name: "Mikel Arteta",
    email: "coach@example.invalid",
  },
  {
    id: 2,
    full_name: "Bukayo Saka",
    email: "alex@example.invalid",
    pos_primary: "CM",
  },
  {
    id: 3,
    full_name: "Martin Ødegaard",
    email: "jordan@example.invalid",
    pos_primary: "ST",
  },
  {
    id: 4,
    full_name: "David Raya",
    email: "riley@example.invalid",
    pos_primary: "GK",
  },
  {
    id: 5,
    full_name: "William Saliba",
    email: "casey@example.invalid",
    pos_primary: "CB",
  },
  {
    id: 6,
    full_name: "Gabriel Martinelli",
    email: "charlie@example.invalid",
    pos_primary: "LW",
  },
  {
    id: 7,
    full_name: "Declan Rice",
    email: "taylor@example.invalid",
    pos_primary: "RB",
  },
  {
    id: 8,
    full_name: "Ben White",
    email: "jamie@example.invalid",
    pos_primary: "CAM",
  },
];

export const demoMembers = demoUsers.map((user) => ({
  team_id: guestTeamId,
  user_id: user.id,
  is_admin: user.id === guestUserId,
}));

export const demoWeeks: WeekState[] = [-3, -2, -1, 0, 1, 2, 3].map(
  (offset) => ({
    id: offset + 4,
    week_start_date: localDate(dateAt(offset * 7)),
    is_populated: true,
    team_id: guestTeamId,
  }),
);

export const demoDays: DayState[] = demoWeeks.flatMap((week, weekIndex) =>
  Array.from({ length: 7 }, (_, dayIndex) => {
    const date = dateAt((weekIndex - 3) * 7 + dayIndex);
    return {
      id: week.id * 10 + dayIndex,
      date: localDate(date),
      week_id: week.id,
      day: date.toLocaleDateString("en-GB", { weekday: "long" }),
      num_of_sessions: 1,
    };
  }),
);

type DemoEventTemplate = Omit<EventState, "id" | "day_id" | "session_number">;
type DemoEvent = Omit<EventState, "id">;

const schedule: DemoEventTemplate[] = [
  {
    event_type: "Recovery",
    event_start_time: "10:00:00",
    event_end_time: "11:00:00",
    location: "Training Centre",
  },
  {
    event_type: "Training",
    event_start_time: "10:30:00",
    event_end_time: "12:00:00",
    location: "London Colney",
  },
  {
    event_type: "Training",
    event_start_time: "15:00:00",
    event_end_time: "16:30:00",
    location: "London Colney",
  },
  {
    event_type: "Game",
    event_start_time: "15:00:00",
    event_end_time: "17:00:00",
    location: "Emirates Stadium",
  },
  {
    event_type: "Video Analysis",
    event_start_time: "11:00:00",
    event_end_time: "11:45:00",
    location: "Training Centre",
  },
];

const trainingWeekdays = new Set([1, 3, 5]);
const scheduleByDate = new Map<string, DemoEvent[]>();

demoDays.forEach((day) => {
  const date = new Date(`${day.date}T12:00:00`);
  const weekOffset = Math.round(
    (date.getTime() - dateAt(0).getTime()) / (7 * 24 * 60 * 60 * 1000),
  );
  const weekday = (date.getDay() + 6) % 7;
  if (!trainingWeekdays.has(weekday)) return;

  const matchDay = Math.abs(weekOffset) % 2 === 0 ? 5 : 6;
  const isMatch = weekday === matchDay;
  const isRecovery = weekday === 1;
  const session = isMatch
    ? schedule[3]
    : isRecovery
      ? schedule[0]
      : schedule[weekday === 3 ? 2 : 1];
  const sessions = scheduleByDate.get(day.date) ?? [];
  sessions.push({ ...session, day_id: day.id, session_number: 1 });

  if (isMatch && Math.abs(weekOffset) % 3 === 1) {
    sessions.push({ ...schedule[4], day_id: day.id, session_number: 2 });
  }
  scheduleByDate.set(day.date, sessions);
});

export const demoEvents: EventState[] = [...scheduleByDate.values()]
  .flat()
  .map((event, index) => ({ id: index + 1, ...event }));

export const demoAttendance: EventAttendanceState[] = demoEvents.flatMap(
  (event) =>
    demoUsers.slice(1).map((user, index) => ({
      id: event.id! * 100 + user.id,
      event_id: event.id!,
      user_id: user.id,
      isAttending:
        (index + event.id!) % 7 !== 0 &&
        (event.event_type !== "Game" || index < 5),
    })),
);
