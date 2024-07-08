export const BREAKPOINTS = { mobile: 0, tablet: 768, desktop: 1280 };

export interface ReduxAppState {
  calendar: ReduxCalendarState;
  team: ReduxTeamState;
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

export type ReduxDayState = {
  id: number;
  date: string;
  week_id: number;
  day: string;
  events: EventState[];
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
};
