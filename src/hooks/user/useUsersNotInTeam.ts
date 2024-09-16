import { getSelectedTeam } from "@/context/teamSlice";
import { getUsersNotInTeam } from "@/services/apiUsers";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useUsersNotInTeam = () => {
  const selectedTeamId = useSelector(getSelectedTeam());

  const {
    isLoading,
    data: users,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["users_not_in_team"],
    queryFn: () => getUsersNotInTeam(selectedTeamId),
  });

  return { isLoading, users, error, isFetching, refetch };
};
