import supabase from "../../../services/supabase";

export async function getWeeksByTeamId(teamId: number) {
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
