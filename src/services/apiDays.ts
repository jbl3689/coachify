import supabase from "./supabase";

export async function getDaysByWeekId(weekId: number) {
  const { data: days, error } = await supabase
    .from("days")
    .select("*")
    .eq("week_id", weekId);

  if (error) {
    console.error(error);
    throw new Error("Days could not be loaded");
  }
  return days;
}

export interface AddDayParams {
  date: string;
  weekId: number;
  day: string;
}

export async function addDay({ date, weekId, day }: AddDayParams) {
  const { data, error } = await supabase
    .from("days")
    .insert([{ date: date, week_id: weekId, day: day }]);

  if (error) {
    console.error(error);
    throw new Error("Day could not be added");
  }
  return data;
}
