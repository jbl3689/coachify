import { useEffect } from "react";
import { tempUserData } from "../../data/tempData";
import { getUsers } from "../../services/apiUsers";
import { useQuery } from "@tanstack/react-query";

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

  console.log(users?.at(0));

  return (
    <div>
      <ul className="flex flex-col gap-2">
        {users &&
          users.map((user, key) => (
            <li
              className={`${key % 2 === 0 ? "bg-bgLight" : "bg-bgGray"} rounded-md text-black p-0.5`}
              key={user.id}
            >
              {user.first_name} {user.last_name}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default UserList;
