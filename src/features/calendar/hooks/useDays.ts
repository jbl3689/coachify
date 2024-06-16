import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { AddDayParams, addDay, getDaysByWeekId } from "../services/apiDays";
import { DayState } from "../types";
import toast from "react-hot-toast";
import { isPending } from "@reduxjs/toolkit";

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

export function useAddDay() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (params: AddDayParams) => addDay(params),
    onSuccess: () => {
      toast.success("Day added");
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

export function getDayObject(days: DayState[], currentDate: Date) {
  const formattedDate = currentDate.toLocaleDateString("en-CA");

  return days.find((day: DayState) => day.date === formattedDate);
}
