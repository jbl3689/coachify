import { getEventAttendanceById } from "@/services/apiEvents";
import { useQuery } from "@tanstack/react-query";
import { useGuestMode } from "@/demo/session";

export function useEventAttendance(eventId: number) {
  const isGuest = useGuestMode();
  const {
    data: eventAttendance,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["eventsAttendance", isGuest ? "guest" : "live", eventId],
    queryFn: () => getEventAttendanceById(eventId),
  });

  return { eventAttendance, isLoading, error, refetch };
}
