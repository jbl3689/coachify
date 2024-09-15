import { getCurrentReduxUser } from "@/context/userSlice";
import { getUserTeams } from "@/services/apiTeams";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useUserTeams = () => {
  const user = useSelector(getCurrentReduxUser());

  const {
    isLoading,
    data: teams,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["team_members_teams", user.id],
    queryFn: () => getUserTeams(user.id!),
    enabled: !!user.id,
  });

  return { isLoading, teams, error, isFetching };
};
