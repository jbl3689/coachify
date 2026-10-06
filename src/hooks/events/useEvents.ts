import { useQuery } from "@tanstack/react-query";
import { getEventsByDayId } from "../../services/apiEvents";
import { useGuestMode } from "@/demo/session";

export function useEvents(dayId: number) {
  const isGuest = useGuestMode();
  const {
    data: events,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["events", isGuest ? "guest" : "live", dayId],
    queryFn: () => getEventsByDayId(dayId),
  });

  return { events, isLoading, error, refetch };
}
