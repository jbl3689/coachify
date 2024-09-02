import { getSelectedTeam } from "@/context/teamSlice";
import { addWeek } from "@/services/apiWeeks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export function useAddWeek() {
  const queryClient = useQueryClient();
  const teamId = useSelector(getSelectedTeam());

  const { mutate, isPending } = useMutation({
    mutationFn: (weekStartDate: string) => addWeek(weekStartDate, teamId),
    onSuccess: () => {
      toast.success("Week added");
      queryClient.invalidateQueries({
        queryKey: ["weeks"],
      });
    },
    onError: (error) => {
      toast.error("Error adding week");
      console.error(error);
    },
  });

  return { createWeek: mutate, isCreatingWeek: isPending };
}
