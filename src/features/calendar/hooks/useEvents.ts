import { useQuery } from "@tanstack/react-query";
import { getEventsByDayId } from "../services/apiEvents";

export function useEvents(dayId: number) {
  const {
    data: events,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["events"],
    queryFn: () => getEventsByDayId(dayId),
  });

  return { events, isLoading, error };
}
