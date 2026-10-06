import { getSelectedTeam } from "@/context/teamSlice";
import { getTeamAdmins } from "@/services/apiUsers";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useGuestMode } from "@/demo/session";
import { guestTeamId } from "@/demo/fixtures";

export const useTeamAdmins = () => {
  const isGuest = useGuestMode();
  const selectedTeamId = useSelector(getSelectedTeam());
  const effectiveTeamId = isGuest ? guestTeamId : selectedTeamId;

  const {
    isLoading,
    data: admins,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [
      "team_members_admins",
      isGuest ? "guest" : "live",
      effectiveTeamId,
    ],
    queryFn: () => getTeamAdmins(effectiveTeamId),
  });

  return { isLoading, admins, error, isFetching, refetch };
};
