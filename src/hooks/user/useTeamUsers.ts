import { getSelectedTeam } from "@/context/teamSlice";
import { getTeamUsers } from "@/services/apiUsers";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useTeamUsers = () => {
  const selectedTeamId = useSelector(getSelectedTeam());

  const {
    isLoading,
    data: users,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["team_members_users"],
    queryFn: () => getTeamUsers(selectedTeamId),
  });

  return { isLoading, users, error, isFetching, refetch };
};
