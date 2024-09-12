import { getUserTeams } from "@/services/apiTeams";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getCurrentUser } from "@/context/userSlice";

export const useUserTeams = () => {
  const user = useSelector(getCurrentUser());

  if (!user || !user.id) {
    return { isLoading: true, teams: null, error: null, isFetching: false };
  }

  const {
    isLoading,
    data: teams,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["team_members_teams"],
    queryFn: () => getUserTeams(user.id ?? 0),
  });

  return { isLoading, teams, error, isFetching };
};
