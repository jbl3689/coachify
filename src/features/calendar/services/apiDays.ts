import supabase from "../../../services/supabase";

export async function getDaysByWeekId(weekId: number) {
  const { data: days, error } = await supabase
    .from("days")
    .select(`*`)
    .eq("team_id", weekId);

  if (error) {
    console.error(error);
    throw new Error("Weeks could not be loaded");
  }
  return days;
}
