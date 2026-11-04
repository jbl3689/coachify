import { useQuery } from "@tanstack/react-query";
import { addDays, format, parseISO, startOfWeek } from "date-fns";
import { useWeeks } from "@/hooks/weeks/useWeeks";
import { useGuestMode } from "@/demo/session";
import { getDaysByWeekId } from "@/services/apiDays";
import { getEventsByDayIds } from "@/services/apiEvents";
import { DayState, EventState } from "@/types/types";

export type ScheduledEvent = EventState & { date: string; startsAt: Date };

export function useTeamSchedule() {
  const isGuest = useGuestMode();
  const { allWeeks, isLoadingWeeks, error: weeksError } = useWeeks();
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const start = format(weekStart, "yyyy-MM-dd");
  const end = format(addDays(weekStart, 14), "yyyy-MM-dd");
  const weeks = allWeeks?.filter(
    (week) => week.week_start_date >= start && week.week_start_date < end,
  );
  const weekIds = weeks?.map((week) => week.id) ?? [];
  const query = useQuery({
    queryKey: [
      "events",
      isGuest ? "guest" : "live",
      "schedule",
      start,
      weekIds,
    ],
    enabled: !!allWeeks,
    queryFn: async (): Promise<ScheduledEvent[]> => {
      const days: DayState[] = (
        await Promise.all(weekIds.map(getDaysByWeekId))
      ).flat();
      const dates = new Map(days.map((day) => [day.id, day.date]));
      const events: EventState[] = await getEventsByDayIds(
        days.map((day) => day.id),
      );
      return events
        .flatMap((event) => {
          const date = dates.get(event.day_id);
          return date
            ? [
                {
                  ...event,
                  date,
                  startsAt: parseISO(`${date}T${event.event_start_time}`),
                },
              ]
            : [];
        })
        .sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime());
    },
  });
  return {
    events: query.data ?? [],
    weekStart,
    isLoading: isLoadingWeeks || query.isLoading,
    error: weeksError || query.error,
  };
}
