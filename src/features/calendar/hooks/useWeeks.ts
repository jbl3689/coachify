import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import { getWeeksByTeamId } from "../services/apiWeeks";
import { getSelectedTeam } from "../../../context/teamSlice";
import { WeekState } from "../types";

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

export function getCurrentWeek(weeks: WeekState[], currentWeek: Date) {
  const formattedWeek = currentWeek.toISOString().split("T")[0];
  console.log(weeks, currentWeek);

  return weeks.find(
    (week: WeekState) => week.week_start_date === formattedWeek
  );
}
