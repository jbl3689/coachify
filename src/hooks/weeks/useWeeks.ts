import { useSelector } from "react-redux";

import { useQuery } from "@tanstack/react-query";

import { getSelectedTeam } from "@/context/teamSlice";
import { getWeeksByTeamId } from "@/services/apiWeeks";

export function useWeeks() {
  const teamId = useSelector(getSelectedTeam());

  const {
    isLoading: isLoadingWeeks,
    data: allWeeks,
    error,
    refetch,
  } = useQuery({
    queryKey: ["weeks"],
    queryFn: () => getWeeksByTeamId(teamId),
  });

  return { allWeeks, isLoadingWeeks, error, refetch };
}
