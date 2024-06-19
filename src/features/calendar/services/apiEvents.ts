import supabase from "../../../services/supabase";

export async function getEventsByDayId(dayId: number) {
  if (dayId === -1) {
    return [];
  }
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("day_id", dayId);

  if (error) {
    console.error(error);
    throw new Error("Events could not be loaded");
  }
  return data;
}
