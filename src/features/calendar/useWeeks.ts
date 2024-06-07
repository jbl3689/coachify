import { useQuery } from "@tanstack/react-query";
import { getWeeksByTeamId } from "../../services/apiTeams";
import { useSelector } from "react-redux";
import { getSelectedTeam } from "../../context/teamSlice";

export function useWeeks() {
  const teamId = useSelector(getSelectedTeam());
  console.log("TEAM ID", teamId);
  const {
    isLoading,
    data: weeks,
    error,
  } = useQuery({
    queryKey: ["weeks"],
    queryFn: () => getWeeksByTeamId(teamId),
  });

  return { isLoading, weeks, error };
}
