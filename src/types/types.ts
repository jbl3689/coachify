import { ReduxUserState } from "@/context/userSlice";

export const BREAKPOINTS = {
  mobile: 0,
  mobileLarge: 500,
  tablet: 768,
  desktop: 1280,
};

export interface ReduxAppState {
  calendar: ReduxCalendarState;
  team: ReduxTeamState;
  user: ReduxUserState;
}

export type ReduxTeamState = {
  selectedTeam: number;
};

export type ReduxCalendarState = {
  prevWeek: {
    date: WeekState | null;
    days: ReduxDayState[] | null;
  };
  currWeek: {
    date: WeekState | null;
    days: ReduxDayState[] | null;
  };
  nextWeek: {
    date: WeekState | null;
    days: ReduxDayState[] | null;
  };
};

export type dayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export const dayOfWeekAbbreviations: { [key in dayOfWeek]: string } = {
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
  Sunday: "Sun",
};

export type ReduxDayState = DayState & { events: ReduxEventState[] };
export type ReduxEventState = EventState & {
  eventAttendance: EventAttendanceState[];
};

export const daysOfWeek = [
  { id: 0, abbreviation: "Mon", label: "Monday" },
  { id: 1, abbreviation: "Tue", label: "Tuesday" },
  { id: 2, abbreviation: "Wed", label: "Wednesday" },
  { id: 3, abbreviation: "Thu", label: "Thursday" },
  { id: 4, abbreviation: "Fri", label: "Friday" },
  { id: 5, abbreviation: "Sat", label: "Saturday" },
  { id: 6, abbreviation: "Sun", label: "Sunday" },
];

export const eventTypes = [
  "Training",
  "Game",
  "Whiteboard",
  "Bonding",
  "Other",
];

export type TeamState = {
  id: number;
  team_name: string;
  location: string;
  logo: string;
};

export type WeekState = {
  id: number;
  week_start_date: string;
  is_populated: boolean;
  team_id: number;
};

export type DayState = {
  id: number;
  created_at?: Date;
  date: string;
  week_id: number;
  day: string;
};

export type EventState = {
  id: number;
  event_start_time: string;
  event_end_time: string;
  event_type: string;
  day_id: number;
  location: string;
  is_morning: boolean;
  session_number: number;
};

export type EventAttendanceState = {
  id: number;
  isAttending: boolean;
  event_id: number;
  user_id: number;
};

export type UserState = {
  id: number;
  auth_user_id?: string;
  full_name: string;
  email: string;
  pos_primary?: PositionAcronym;
  pos_secondary?: PositionAcronym;
  avatar_url?: string;
};

export type PositionAcronym =
  | "GK"
  | "CB"
  | "LB"
  | "RB"
  | "LWB"
  | "RWB"
  | "CDM"
  | "CM"
  | "CAM"
  | "LM"
  | "RM"
  | "LW"
  | "RW"
  | "CF"
  | "ST";

export const positionAcronymArray: PositionAcronym[] = [
  "GK",
  "CB",
  "LB",
  "RB",
  "LWB",
  "RWB",
  "CDM",
  "CM",
  "CAM",
  "LM",
  "RM",
  "LW",
  "RW",
  "CF",
  "ST",
];
