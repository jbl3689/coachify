import { createEvent } from "@/services/apiEvents";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface AddEventProps {
  eventData: any;
  teamId: number;
}
export function useAddEvent() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ eventData, teamId }: AddEventProps) =>
      createEvent(eventData, teamId),
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
