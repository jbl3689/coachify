import React from "react";
import UserList from "../user/UserList";

function Dashboard() {
  const boxStyles =
    "p-6 border border-8 h-64 flex items-center justify-center rounded shadow";

  return (
    <>
      <div>
        <h1 className="mb-8 text-4xl font-semibold text-center text-accentColor">
          MyTeam FC
        </h1>
      </div>
      <div className="flex gap-12">
        <div className="grid grid-cols-2 grid-rows-2 gap-8 grow">
          <div className={boxStyles}>Club Details</div>
          <div className={boxStyles}>Box 2</div>
          <div className={boxStyles}>Upcoming Training</div>
          <div className={boxStyles}>Upcoming Game</div>
        </div>
        <div className="w-1/4">
          <div
            className={`${boxStyles} h-[550px] flex flex-col justify-between `}
          >
            <h1 className="text-3xl font-semibold text-dangerLightColor">
              Team List
            </h1>
            <UserList />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
