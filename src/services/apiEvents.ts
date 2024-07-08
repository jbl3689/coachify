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

export async function createEvent(newEvent: {
  event_start_time: string;
  event_end_time: string;
  event_type: string;
  day_id: number;
}) {
  const { data, error } = await supabase.from("events").insert([newEvent]);

  if (error) {
    console.error(error);
    throw new Error("Event could not be created");
  }

  return data;
}
