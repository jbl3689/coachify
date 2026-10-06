import { getSelectedTeam } from "@/context/teamSlice";
import { getTeamUsers } from "@/services/apiUsers";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useGuestMode } from "@/demo/session";
import { guestTeamId, guestUserId } from "@/demo/fixtures";

export const useTeamUsers = () => {
  const isGuest = useGuestMode();
  const selectedTeamId = useSelector(getSelectedTeam());
  const effectiveTeamId = isGuest ? guestTeamId : selectedTeamId;

  const {
    isLoading,
    data: users,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: [
      "team_members_users",
      isGuest ? "guest" : "live",
      effectiveTeamId,
    ],
    queryFn: async () => {
      const users = await getTeamUsers(effectiveTeamId);
      return isGuest ? users.filter((user) => user.id !== guestUserId) : users;
    },
  });

  return { isLoading, users, error, isFetching, refetch };
};
