import { getCurrentUser } from "@/services/apiAuth";
import { useQuery } from "@tanstack/react-query";
import { useGuestMode } from "@/demo/session";

export const useAuthUser = () => {
  const isGuest = useGuestMode();
  const {
    isLoading,
    data: user,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["user", isGuest ? "guest" : "live"],
    queryFn: getCurrentUser,
    enabled: !isGuest,
  });

  const isAuthenticated = isGuest || user?.role === "authenticated";

  return {
    isLoading: isGuest ? false : isLoading,
    user,
    error,
    isAuthenticated,
    isFetching: isGuest ? false : isFetching,
  };
};
