import supabase from "./supabase";

export async function getWeeksByTeamId(teamId: number) {
  const { data, error } = await supabase
    .from("weeks")
    .select("*")
    .eq("team_id", teamId);
  console.log(`DATA: ${data}, ${error}`);

  if (error) {
    console.error(error);
    throw new Error("Weeks could not be loaded");
  }
  return data;
}
