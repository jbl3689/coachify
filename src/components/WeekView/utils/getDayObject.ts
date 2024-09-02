import { DayState } from "@/types/types";

export async function getDayObject(days: DayState[], currentDate: Date) {
  const formattedDate = currentDate.toLocaleDateString("en-CA");

  return days.find((day: DayState) => day.date === formattedDate);
}
