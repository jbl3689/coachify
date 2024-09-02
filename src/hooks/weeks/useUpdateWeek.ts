import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateWeek, UpdateWeekParams } from "@/services/apiWeeks";

export function useUpdateWeek() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (params: UpdateWeekParams) => updateWeek(params),
    onSuccess: () => {
      toast.success("Week updated");
      queryClient.invalidateQueries({
        queryKey: ["weeks"],
      });
    },
    onError: (error) => {
      toast.error("Error updating week");
      console.error(error);
    },
  });

  return { updateWeek: mutate, isUpdatingWeek: isPending };
}
