import React from "react";
import { tempUserData } from "../../data/tempData";

function UserList() {
  return (
    <div className="w-full ">
      <ul className="flex flex-col gap-2">
        {tempUserData.map((user, key) => (
          <li
            className={`${key % 2 === 0 ? "bg-bgLight" : "bg-bgGray"} rounded-md text-black p-0.5`}
            key={user.id}
          >
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
