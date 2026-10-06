import { useSelector } from "react-redux";

import { useQuery } from "@tanstack/react-query";

import { getSelectedTeam } from "@/context/teamSlice";
import { getWeeksByTeamId } from "@/services/apiWeeks";
import { useGuestMode } from "@/demo/session";
import { guestTeamId } from "@/demo/fixtures";

export function useWeeks() {
  const isGuest = useGuestMode();
  const teamId = useSelector(getSelectedTeam());
  const effectiveTeamId = isGuest ? guestTeamId : teamId;

  const {
    isLoading: isLoadingWeeks,
    data: allWeeks,
    error,
    refetch,
  } = useQuery({
    queryKey: ["weeks", isGuest ? "guest" : "live", effectiveTeamId],
    queryFn: () => getWeeksByTeamId(effectiveTeamId),
  });

  return { allWeeks, isLoadingWeeks, error, refetch };
}
