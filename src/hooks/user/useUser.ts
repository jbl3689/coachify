import { setCurrentUser } from "@/context/userSlice";
import { getUser } from "@/services/apiUsers";
import { useQuery } from "@tanstack/react-query";
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

  console.log("Fetched user:", user);

  if (user && user.id && user.auth_user_id && user.full_name && user.email) {
    dispatch(
      setCurrentUser({
        id: user.id,
        auth_user_id: user.auth_user_id,
        full_name: user.full_name,
        email: user.email,
      })
    );
  }

  return { isLoading, user, error, isFetching, refetch };
};
