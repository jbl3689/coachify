import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { AddDayParams, addDay, getDaysByWeekId } from "../services/apiDays";
import { DayState } from "../types";
import toast from "react-hot-toast";

export function useDays(weekId: number) {
  console.log(`Fetching days for weekId: ${weekId}`);
  const {
    data: days,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["days"],
    queryFn: () => getDaysByWeekId(weekId),
  });

  return { days, isLoading, error };
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
  console.log(`days: ${JSON.stringify(days, null, 2)}`);
  console.log(`Looking for day with formatted date: ${formattedDate}`);
  console.log(
    `Found date: ${days.find((day: DayState) => day.date === formattedDate)}`
  );
  return days.find((day: DayState) => day.date === formattedDate);
}
