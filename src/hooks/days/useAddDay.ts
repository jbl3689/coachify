import { addDay, AddDayParams } from "@/services/apiDays";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useAddDay() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (params: AddDayParams) => addDay(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["days"],
      });
    },
    onError: (error) => {
      toast.error("Error adding day");
      console.error(error);
    },
  });

  return { createDay: mutate, isCreatingDay: isPending };
}
