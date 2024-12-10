import { deleteEvent } from "@/services/apiEvents";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeleteEvent() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      toast("Event deleted");
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
    },
    onError: (error) => {
      toast("Error deleting event");
      console.error(error);
    },
  });

  return { mutate, isPending };
}
