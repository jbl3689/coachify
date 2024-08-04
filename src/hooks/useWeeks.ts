import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getSelectedTeam } from '../context/teamSlice';
import { addWeek, getWeeksByTeamId, updateWeek, UpdateWeekParams } from '../services/apiWeeks';
import { WeekState } from '../types/types';

export function useWeeks() {
  const teamId = useSelector(getSelectedTeam());

  const {
    isLoading: isLoadingWeeks,
    data: allWeeks,
    error,
    refetch,
  } = useQuery({
    queryKey: ["weeks"],
    queryFn: () => getWeeksByTeamId(teamId),
  });

  return { allWeeks, isLoadingWeeks, error, refetch };
}

export function useAddWeek() {
  const queryClient = useQueryClient();
  const teamId = useSelector(getSelectedTeam());

  const { mutate, isPending } = useMutation({
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

  return { createWeek: mutate, isCreatingWeek: isPending };
}

export function useUpdateWeek() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (params: UpdateWeekParams) => updateWeek(params),
    onSuccess: () => {
      toast.success("Week updated");
      queryClient.invalidateQueries({
        queryKey: ["weeks"],
      });
    },
    onError: (error) => {
      toast.error("Error updating week");
      console.error(error);
    },
  });

  return { updateWeek: mutate, isUpdatingWeek: isPending };
}

export function getCurrentWeek(weeks: WeekState[], currentWeek: Date) {
  const formattedWeek = currentWeek.toLocaleDateString("en-CA");

  return weeks.find(
    (week: WeekState) => week.week_start_date === formattedWeek
  );
}
