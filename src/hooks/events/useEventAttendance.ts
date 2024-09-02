import { getEventAttendanceById } from "@/services/apiEvents";
import { useQuery } from "@tanstack/react-query";

export function useEventAttendance(eventId: number) {
  const {
    data: eventAttendance,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["eventsAttendance", eventId],
    queryFn: () => getEventAttendanceById(eventId),
  });

  return { eventAttendance, isLoading, error, refetch };
}
