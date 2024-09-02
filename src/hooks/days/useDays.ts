import { useQuery } from "@tanstack/react-query";

import { getDaysByWeekId } from "../../services/apiDays";

export function useDays(weekId: number) {
  const {
    data: days,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["days", weekId],
    queryFn: () => getDaysByWeekId(weekId),
    enabled: weekId > 0,
  });

  return { days, isLoading, error, refetch };
}
