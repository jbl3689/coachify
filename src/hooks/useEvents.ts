import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createEvent, getEventsByDayId } from "../services/apiEvents";
import toast from "react-hot-toast";

export function useEvents(dayId: number) {
  const {
    data: events,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["events", dayId],
    queryFn: () => getEventsByDayId(dayId),
  });

  return { events, isLoading, error, refetch };
}

export function useAddEvent(dayId: number) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      toast("Event added");
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
    },
    onError: (error) => {
      toast("Error adding event");
      console.error(error);
    },
  });

  return { mutate, isPending };
}
