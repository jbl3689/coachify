import { EventAttendanceState, EventState } from "../types/types";
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

export async function createEvent(newEvent: EventState) {
  const { data, error } = await supabase.from("events").insert([newEvent]);

  if (error) {
    console.error(error);
    throw new Error("Event could not be created");
  }

  return data;
}

export async function updateEvent(eventId: number, updatedEvent: EventState) {
  const { data, error } = await supabase
    .from("events")
    .update(updatedEvent)
    .eq("id", eventId);

  if (error) {
    console.error(error);
    throw new Error("Event could not be updated");
  }

  return data;
}

export async function getEventAttendanceById(eventId: number) {
  const { data, error } = await supabase
    .from("eventsAttendance")
    .select("*")
    .eq("event_id", eventId);
  if (error) {
    console.error(error);
    throw new Error("Events could not be loaded");
  }
  return data as EventAttendanceState[];
}
