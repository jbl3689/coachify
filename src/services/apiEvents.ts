import { useSelector } from "react-redux";
import { EventAttendanceState, EventState } from "../types/types";
import supabase from "./supabase";
import { getSelectedTeam } from "@/context/teamSlice";
import { getTeamUsers } from "./apiUsers";

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

export async function createEvent(newEvent: EventState, teamId: number) {
  const { data, error } = await supabase
    .from("events")
    .insert([newEvent])
    .select("id");

  if (error) {
    console.error(error);
    throw new Error("Event could not be created");
  }

  const teamUsers = await getTeamUsers(teamId);
  const eventAttendance = teamUsers.map(
    (user) =>
      ({
        event_id: data[0].id,
        user_id: user.id,
      }) as EventAttendanceState
  );

  const { error: attendanceError } = await supabase
    .from("eventsAttendance")
    .insert([...eventAttendance]);

  if (attendanceError) {
    console.error(attendanceError);
    throw new Error("Event attendance could not be created");
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

export async function deleteEvent(eventId: number) {
  const { data, error } = await supabase
    .from("events")
    .delete()
    .eq("id", eventId);

  if (error) {
    console.error(error);
    throw new Error("Event could not be deleted");
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
