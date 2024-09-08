import { getCurrentUser } from "@/services/apiAuth";
import { useQuery } from "@tanstack/react-query";

export const useAuthUser = () => {
  const {
    isLoading,
    data: user,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const isAuthenticated = user?.role === "authenticated";

  return { isLoading, user, error, isAuthenticated, isFetching };
};
