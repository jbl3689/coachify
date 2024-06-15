import { useQuery } from "@tanstack/react-query";

import { getDaysByWeekId } from "../services/apiDays";

export function useDays(weekId: number) {
  const {
    data: days,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["days"],
    queryFn: () => getDaysByWeekId(weekId),
  });

  return { days, isLoading, error };
}
