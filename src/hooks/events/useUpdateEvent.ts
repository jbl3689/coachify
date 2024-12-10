import { updateEvent } from "@/services/apiEvents";
import { EventState } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

interface UpdateEventParams {
  id: number;
  newEventData: EventState;
}

export function useUpdateEvent() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, newEventData }: UpdateEventParams) =>
      updateEvent(id, newEventData),
    onSuccess: () => {
      toast.success("Event details updated");
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutate, isPending };
}
