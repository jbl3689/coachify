import { useQuery } from "@tanstack/react-query";

import { getDaysByWeekId } from "../services/apiDays";

export function useDays({ weekId: number }) {
  const {
    isLoading,
    data: days,
    error,
  } = useQuery({
    queryKey: ["weeks"],
    queryFn: () => getDaysByWeekId(weekId),
  });

  return { days, isLoading, error };
}
