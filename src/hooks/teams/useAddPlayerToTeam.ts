import { addPlayerToTeam } from "@/services/apiTeams";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useAddPlayerToTeam() {
  const queryClient = useQueryClient();

  const { mutate: addPlayer, isPending } = useMutation({
    mutationFn: addPlayerToTeam,
    onSuccess: () => {
      toast("Player added to team successfully");
      queryClient.invalidateQueries({
        queryKey: ["team_members_teams"],
      });
    },
    onError: (error) => {
      toast("Error adding player to team");
      console.error(error);
    },
  });

  return { addPlayer, isPending };
}
