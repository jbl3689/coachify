import { useQuery } from "@tanstack/react-query";

import { getDaysByWeekId } from "../../services/apiDays";
import { useGuestMode } from "@/demo/session";

export function useDays(weekId: number) {
  const isGuest = useGuestMode();
  const {
    data: days,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["days", isGuest ? "guest" : "live", weekId],
    queryFn: () => getDaysByWeekId(weekId),
    enabled: weekId > 0,
  });

  return { days, isLoading, error, refetch };
}
