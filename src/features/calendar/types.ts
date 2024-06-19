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
  team_id: number;
};

export type DayState = {
  id: number;
  date: string;
  week_id: number;
};

export type EventState = {
  id: number;
  event_start_time: string;
  event_end_time: string;
  event_type: string;
  day_id: number;
};
