import { createEvent } from "@/services/apiEvents";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

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
