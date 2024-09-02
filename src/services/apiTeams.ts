import supabase from "./supabase";

export async function getTeams() {
  const { data: teams, error } = await supabase.from("teams").select("*");

  if (error) {
    console.error(error);
    throw new Error("Teams could not be loaded");
  }

  return teams;
}
