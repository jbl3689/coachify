import { increaseDaySessionNumber } from "@/services/apiDays";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useIncreaseDaySession() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (dayId: number) => increaseDaySessionNumber(dayId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["days"],
      });
    },
    onError: (error) => {
      toast.error("Error incrementing the day's session number");
      console.error(error);
    },
  });

  return { increaseDaySession: mutate, isIncreasingDaySession: isPending };
}
