import { WeekState } from "@/types/types";

export function getCurrentWeek(weeks: WeekState[], currentWeek: Date) {
  const formattedWeek = currentWeek.toLocaleDateString("en-CA");

  return weeks.find(
    (week: WeekState) => week.week_start_date === formattedWeek
  );
}
