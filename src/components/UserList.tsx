import { useQuery } from "@tanstack/react-query";
import UserListRow from "./UserListRow";
import { getUsers } from "../services/apiUsers";

function UserList() {
  const {
    isLoading,
    data: users,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ul className="flex flex-col gap-2">
        {users &&
          users.map((user, key) => (
            <UserListRow user={user} key={user.id} rowKey={key} />
          ))}
      </ul>
    </div>
  );
}

export default UserList;
