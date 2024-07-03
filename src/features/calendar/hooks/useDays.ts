import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { AddDayParams, addDay, getDaysByWeekId } from "../services/apiDays";
import { DayState } from "../types";
import toast from "react-hot-toast";

export function useDays(weekId: number) {
  console.log(weekId);
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

export function useAddDay() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (params: AddDayParams) => addDay(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["days"],
      });
    },
    onError: (error) => {
      toast.error("Error adding day");
      console.error(error);
    },
  });

  return { createDay: mutate, isCreatingDay: isPending };
}

export async function getDayObject(days: DayState[], currentDate: Date) {
  const formattedDate = currentDate.toLocaleDateString("en-CA");

  return days.find((day: DayState) => day.date === formattedDate);
}
