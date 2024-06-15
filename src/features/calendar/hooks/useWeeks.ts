import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import { addWeek, getWeeksByTeamId } from "../services/apiWeeks";
import { getSelectedTeam } from "../../../context/teamSlice";
import { WeekState } from "../types";
import toast from "react-hot-toast";

export function useWeeks() {
  const teamId = useSelector(getSelectedTeam());

  const {
    isLoading,
    data: weeks,
    error,
  } = useQuery({
    queryKey: ["weeks"],
    queryFn: () => getWeeksByTeamId(teamId),
  });

  return { weeks, isLoading, error };
}

export function useAddWeek() {
  const queryClient = useQueryClient();
  const teamId = useSelector(getSelectedTeam());

  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: (weekStartDate: string) => addWeek(weekStartDate, teamId),
    onSuccess: () => {
      toast.success("Week added");
      queryClient.invalidateQueries({
        queryKey: ["weeks"],
      });
    },
    onError: (error) => {
      toast.error("Error adding week");
      console.error(error);
    },
  });

  return { mutate, isCreating };
}

export function getCurrentWeek(weeks: WeekState[], currentWeek: Date) {
  const formattedWeek = currentWeek.toLocaleDateString("en-CA");

  return weeks.find(
    (week: WeekState) => week.week_start_date === formattedWeek
  );
}
