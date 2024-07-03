import supabase from "./supabase";
import { WeekState } from "../features/calendar/types";

export async function getWeeksByTeamId(teamId: number) {
  if (teamId === 0) {
    return [];
  }
  const { data, error } = await supabase
    .from("weeks")
    .select("*")
    .eq("team_id", teamId);

  if (error) {
    console.error(error);
    throw new Error("Weeks could not be loaded");
  }
  return data;
}

export async function addWeek(weekStartDate: string, teamId: number) {
  const { data, error } = await supabase
    .from("weeks")
    .insert([{ week_start_date: weekStartDate, team_id: teamId }]);

  if (error) {
    console.error(error);
    throw new Error("Week could not be added");
  }
  return data;
}

export interface UpdateWeekParams {
  weekId: number;
  weekData: WeekState;
}
export async function updateWeek({ weekId, weekData }: UpdateWeekParams) {
  const { data, error } = await supabase
    .from("weeks")
    .update(weekData)
    .eq("id", weekId);

  if (error) {
    console.error(error);
    throw new Error("Week could not be updated");
  }
  return data;
}
