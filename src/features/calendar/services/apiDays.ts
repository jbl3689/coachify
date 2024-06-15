import supabase from "../../../services/supabase";

export async function getDaysByWeekId(weekId: number) {
  const { data: days, error } = await supabase
    .from("days")
    .select(`*`)
    .eq("week_id", weekId);

  if (error) {
    console.error(error);
    throw new Error("Days could not be loaded");
  }
  return days;
}
