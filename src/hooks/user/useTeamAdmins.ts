import { getSelectedTeam } from "@/context/teamSlice";
import { getTeamAdmins } from "@/services/apiUsers";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useTeamAdmins = () => {
  const selectedTeamId = useSelector(getSelectedTeam());

  const {
    isLoading,
    data: admins,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["team_members_admins"],
    queryFn: () => getTeamAdmins(selectedTeamId),
  });

  return { isLoading, admins, error, isFetching, refetch };
};
