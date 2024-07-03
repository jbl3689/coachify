import supabase from "./supabase";

export async function getEventsByDayId(dayId: number) {
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
