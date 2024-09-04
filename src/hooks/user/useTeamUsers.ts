import { getTeamUsers } from "@/services/apiUsers";
import { useQuery } from "@tanstack/react-query";

export const useTeamUsers = () => {
  const {
    isLoading,
    data: users,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["team_members"],
    queryFn: getTeamUsers,
  });

  return { isLoading, users, error, isFetching };
};
