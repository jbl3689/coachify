export const daysOfWeek = [
  { id: 1, abbreviation: "Mon", label: "Monday" },
  { id: 2, abbreviation: "Tue", label: "Tuesday" },
  { id: 3, abbreviation: "Wed", label: "Wednesday" },
  { id: 4, abbreviation: "Thu", label: "Thursday" },
  { id: 5, abbreviation: "Fri", label: "Friday" },
  { id: 6, abbreviation: "Sat", label: "Saturday" },
  { id: 7, abbreviation: "Sun", label: "Sunday" },
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
