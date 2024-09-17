import { setCurrentUser } from "@/context/userSlice";
import { getUser } from "@/services/apiUsers";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useUser = () => {
  const dispatch = useDispatch();

  const {
    isLoading,
    data: user,
    error,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUser,
  });

  useEffect(() => {
    if (user) {
      dispatch(
        setCurrentUser({
          id: user.id,
          auth_user_id: user.auth_user_id!,
          full_name: user.full_name,
          email: user.email,
        })
      );
    }
  }, [user, dispatch]);

  return { isLoading, user, error, isFetching, refetch };
};
