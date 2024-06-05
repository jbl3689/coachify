import React from "react";
import { Database } from "../../services/databaseTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../../services/apiUsers";
import { HiTrash } from "react-icons/hi2";

interface UserListRowProps {
  user: {
    id: number;
    pos_primary: string;
    first_name: string;
    last_name: string;
  };
  rowKey: number;
}

function UserListRow({ user, rowKey }: UserListRowProps) {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      alert("User deleted");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (error) => {
      alert("Error deleting user");
      console.error(error);
    },
  });

  return (
    <li
      className={`${rowKey % 2 === 0 ? "bg-bgLight" : "bg-bgGray"} rounded-md flex items-center justify-between text-black p-0.5 px-3`}
    >
      <span>
        {user.pos_primary} | {user.first_name} {user.last_name}
      </span>
      <span className="text-2xl cursor-pointer hover:text-dangerColor">
        <HiTrash onClick={() => mutate(user.id)} />
      </span>
    </li>
  );
}

export default UserListRow;
