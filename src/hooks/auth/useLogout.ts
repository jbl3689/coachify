import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout as logoutApi } from "@/services/apiAuth";
import { getGuestMode, leaveGuestMode } from "@/demo/session";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: async () => {
      if (getGuestMode()) await leaveGuestMode();
      else await logoutApi();
    },
    onSuccess: () => {
      queryClient.clear();
      navigate("/login", { replace: true });
    },
  });

  return { logout, isPending };
}
