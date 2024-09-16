import { createUpdateUser } from "@/services/apiUsers";
import { UserState } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

interface UpdateUserParams {
  newUserData: UserState;
  id: number | null;
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: ({ newUserData, id }: UpdateUserParams) =>
      createUpdateUser(newUserData, id),
    onSuccess: () => {
      toast.success("User details updated");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isPending };
}
