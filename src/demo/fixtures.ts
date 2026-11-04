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
    team_name: "Arsenal FC",
    location: "London Colney",
    logo: "/arsenal-crest.svg",
  },
];

// An illustrative demo squad. Contact details and all schedules/responses are fictional.
const squad: Pick<UserState, "full_name" | "pos_primary" | "pos_secondary">[] =
  [
    { full_name: "Bukayo Saka", pos_primary: "RW", pos_secondary: "RM" },
    { full_name: "Martin Ødegaard", pos_primary: "CAM", pos_secondary: "CM" },
    { full_name: "David Raya", pos_primary: "GK" },
    { full_name: "William Saliba", pos_primary: "CB" },
    { full_name: "Gabriel Martinelli", pos_primary: "LW", pos_secondary: "RW" },
    { full_name: "Declan Rice", pos_primary: "CDM", pos_secondary: "CM" },
    { full_name: "Ben White", pos_primary: "RB", pos_secondary: "CB" },
    { full_name: "Kepa Arrizabalaga", pos_primary: "GK" },
    { full_name: "Gabriel Magalhães", pos_primary: "CB" },
    { full_name: "Jurriën Timber", pos_primary: "RB", pos_secondary: "CB" },
    { full_name: "Riccardo Calafiori", pos_primary: "LB", pos_secondary: "CB" },
    { full_name: "Myles Lewis-Skelly", pos_primary: "LB", pos_secondary: "CM" },
    { full_name: "Cristhian Mosquera", pos_primary: "CB", pos_secondary: "RB" },
    { full_name: "Piero Hincapié", pos_primary: "CB", pos_secondary: "LB" },
    { full_name: "Martín Zubimendi", pos_primary: "CDM", pos_secondary: "CM" },
    { full_name: "Mikel Merino", pos_primary: "CM", pos_secondary: "CDM" },
    { full_name: "Eberechi Eze", pos_primary: "CAM", pos_secondary: "LW" },
    { full_name: "Kai Havertz", pos_primary: "ST", pos_secondary: "CAM" },
    { full_name: "Viktor Gyökeres", pos_primary: "ST" },
    { full_name: "Noni Madueke", pos_primary: "RW", pos_secondary: "LW" },
    { full_name: "Christos Tzolis", pos_primary: "LW", pos_secondary: "RW" },
    { full_name: "Max Dowman", pos_primary: "CAM", pos_secondary: "RW" },
    { full_name: "Khari Ranson", pos_primary: "GK" },
    { full_name: "Ezri Konsa", pos_primary: "CB", pos_secondary: "RB" },
  ];

export const demoUsers: UserState[] = [
  {
    id: guestUserId,
    auth_user_id: "guest-coach",
    full_name: "Mikel Arteta",
    email: "coach@example.invalid",
  },
  ...squad.map((player, index) => ({
    ...player,
    id: index + 2,
    email: `player${String(index + 1).padStart(2, "0")}@example.invalid`,
  })),
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

type DemoEventTemplate = Omit<EventState, "id" | "day_id" | "session_number">;

const session = (
  event_type: string,
  start: string,
  end: string,
  location: string,
): DemoEventTemplate => ({
  event_type,
  event_start_time: `${start}:00`,
  event_end_time: `${end}:00`,
  location,
});

function sessionsForDay(
  weekday: number,
  weekOffset: number,
): DemoEventTemplate[] {
  const saturdayMatch = Math.abs(weekOffset) % 2 === 0;
  const homeMatch = Math.abs(weekOffset) % 3 !== 1;
  switch (weekday) {
    case 0:
      return [
        session("Recovery", "10:00", "11:00", "Recovery Suite"),
        session("Video Analysis", "11:30", "12:15", "Analysis Room"),
      ];
    case 1:
      return [
        session("Training", "10:00", "11:30", "London Colney · Pitch 1"),
        session("Strength & Conditioning", "12:00", "12:45", "Performance Gym"),
        session("Whiteboard", "14:00", "14:30", "Tactics Room"),
      ];
    case 2:
      return [
        session("Whiteboard", "09:30", "10:15", "Tactics Room"),
        session(
          "Technical Training",
          "10:45",
          "11:45",
          "London Colney · Pitch 2",
        ),
      ];
    case 3:
      return [
        session("Training", "10:00", "11:30", "London Colney · Pitch 1"),
        session("Opposition Analysis", "14:00", "14:45", "Analysis Room"),
      ];
    case 4:
      return [
        session(
          "Match Preparation",
          "10:30",
          "11:30",
          "London Colney · Pitch 1",
        ),
        session("Set Pieces", "12:00", "12:30", "London Colney · Pitch 2"),
      ];
    case 5:
      return saturdayMatch
        ? [
            session(
              "Game",
              "15:00",
              "17:00",
              homeMatch ? "Emirates Stadium" : "Away Stadium",
            ),
          ]
        : [
            session(
              "Pre-match Activation",
              "10:00",
              "10:45",
              "Performance Gym",
            ),
          ];
    default:
      return saturdayMatch
        ? [session("Recovery", "10:30", "11:15", "Recovery Suite")]
        : [
            session(
              "Game",
              "16:30",
              "18:30",
              homeMatch ? "Emirates Stadium" : "Away Stadium",
            ),
          ];
  }
}

export const demoDays: DayState[] = demoWeeks.flatMap((week, weekIndex) =>
  Array.from({ length: 7 }, (_, dayIndex) => {
    const date = dateAt((weekIndex - 3) * 7 + dayIndex);
    return {
      id: week.id * 10 + dayIndex,
      date: localDate(date),
      week_id: week.id,
      day: date.toLocaleDateString("en-GB", { weekday: "long" }),
      num_of_sessions: sessionsForDay(dayIndex, weekIndex - 3).length,
    };
  }),
);

export const demoEvents: EventState[] = demoDays.flatMap((day) => {
  const weekday = day.id % 10;
  const weekOffset = day.week_id - 4;
  return sessionsForDay(weekday, weekOffset).map((event, index) => ({
    ...event,
    id: day.id * 10 + index + 1,
    day_id: day.id,
    session_number: index + 1,
  }));
});

export const demoAttendance: EventAttendanceState[] = demoEvents.flatMap(
  (event) => {
    const day = demoDays.find((candidate) => candidate.id === event.day_id)!;
    const isFuture =
      new Date(`${day.date}T${event.event_start_time}`) > new Date();
    return demoUsers.slice(1).flatMap((user, index) => {
      const seed = index + event.id!;
      // Missing records represent unanswered invitations, especially for future sessions.
      if (isFuture && seed % 9 === 0) return [];
      return [
        {
          id: event.id! * 100 + user.id,
          event_id: event.id!,
          user_id: user.id,
          isAttending: seed % (event.event_type === "Recovery" ? 5 : 11) !== 0,
        },
      ];
    });
  },
);
