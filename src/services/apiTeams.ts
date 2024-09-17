import supabase from "./supabase";

export async function getUserTeams(reduxUserId: number) {
  let { data: teamIds, error: teamIdsError } = await supabase
    .from("team_members")
    .select("team_id")
    .eq("user_id", reduxUserId);

  if (teamIdsError) {
    console.error(teamIdsError);
    throw new Error("Team members could not be loaded");
  }

  // Extract the list of team IDs
  const teamIdList = teamIds?.map((item) => item.team_id);

  if (teamIdList === undefined || (teamIdList && teamIdList.length === 0)) {
    return []; // Return an empty array if the user has no associated teams
  }

  // Fetch only the teams that have an id in the teamIdList
  let { data: teams, error: teamsError } = await supabase
    .from("teams")
    .select("*")
    .in("id", teamIdList);

  if (teamsError) {
    console.error(teamsError);
    throw new Error("Teams could not be loaded");
  }

  return teams;
}

interface AddPlayerToTeamProps {
  teamId: number;
  userId: number;
}

export async function addPlayerToTeam({
  teamId,
  userId,
}: AddPlayerToTeamProps) {
  const { data, error } = await supabase
    .from("team_members")
    .insert([{ team_id: teamId, user_id: userId }]);

  if (error) {
    console.error(error);
    throw new Error("Player could not be added to the team");
  }

  return data;
}
