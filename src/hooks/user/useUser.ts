import { setCurrentUser } from "@/context/userSlice";
import { getUser } from "@/services/apiUsers";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTeamAdmins } from "./useTeamAdmins";
import { useGuestMode } from "@/demo/session";

export const useUser = (enabled = true) => {
  const dispatch = useDispatch();
  const isGuest = useGuestMode();

  const {
    isLoading,
    data: user,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["users", isGuest ? "guest" : "live"],
    queryFn: getUser,
    enabled,
  });

  const { admins } = useTeamAdmins();

  useEffect(() => {
    if (user) {
      const isUserAdmin =
        admins?.some((admin) => admin.id === user.id) ?? false;

      dispatch(
        setCurrentUser({
          id: user.id,
          auth_user_id: user.auth_user_id || "guest-coach",
          full_name: user.full_name,
          email: user.email,
          isUserAdmin: isUserAdmin,
        }),
      );
    }
  }, [user, admins, dispatch]);

  return { isLoading, user, error, isFetching, refetch };
};
