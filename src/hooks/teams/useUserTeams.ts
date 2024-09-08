import { getUserTeams } from "@/services/apiTeams";
import { useQuery } from "@tanstack/react-query";

export const useUserTeams = () => {
  const {
    isLoading,
    data: teams,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["team_members_teams"],
    queryFn: getUserTeams,
  });

  return { isLoading, teams, error, isFetching };
};
