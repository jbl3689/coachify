import { getCurrentReduxUser } from "@/context/userSlice";
import { getUserTeams } from "@/services/apiTeams";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useGuestMode } from "@/demo/session";
import { guestUserId } from "@/demo/fixtures";

export const useUserTeams = () => {
  const isGuest = useGuestMode();
  const user = useSelector(getCurrentReduxUser());
  const effectiveUserId = isGuest ? guestUserId : user.id;

  const {
    isLoading,
    data: teams,
    error,
    isFetching,
  } = useQuery({
    queryKey: [
      "team_members_teams",
      isGuest ? "guest" : "live",
      effectiveUserId,
    ],
    queryFn: () => getUserTeams(effectiveUserId!),
    enabled: isGuest || !!effectiveUserId,
  });

  return { isLoading, teams, error, isFetching };
};
