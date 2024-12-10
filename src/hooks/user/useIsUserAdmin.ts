import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentReduxUser, setIsUserAdmin } from "@/context/userSlice";
import { useTeamAdmins } from "@/hooks/user/useTeamAdmins";

export const useIsUserAdmin = () => {
  const dispatch = useDispatch();
  const { id, isUserAdmin } = useSelector(getCurrentReduxUser());
  const { admins } = useTeamAdmins();

  useEffect(() => {
    const isUserAdmin = admins?.some((admin) => admin.id === id) ?? false;
    dispatch(setIsUserAdmin(isUserAdmin));
  }, [admins, id, dispatch]);

  return isUserAdmin;
};
