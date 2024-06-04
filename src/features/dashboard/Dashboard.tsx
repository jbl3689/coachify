import React from "react";
import UserList from "../user/UserList";
import ClubDetails from "./ClubDetails";
import Button from "../../ui/Button";

function Dashboard() {
  const boxStyles =
    "p-6 border border-8 h-64 flex items-center justify-center rounded shadow";

  return (
    <>
      <div>
        <h1 className="mb-8 text-4xl font-semibold text-center sm:text-3xl text-accentLightColor">
          Admin Dashboard
        </h1>
      </div>
      <div className="flex gap-12">
        <div className="grid grid-cols-2 grid-rows-2 gap-8 grow">
          <div className={`${boxStyles} `}>
            <ClubDetails />
          </div>
          <div className={`${boxStyles} flex flex-col gap-8`}>
            <Button type="secondary" to="/user/add">
              Add a player
            </Button>
            <Button type="danger" to="/user/remove">
              Remove a player
            </Button>
          </div>
          <div className={boxStyles}>
            <span>Next Training</span>
          </div>
          <div className={boxStyles}>Next Game</div>
        </div>

        <div className="w-1/4">
          <div
            className={`${boxStyles} h-[550px] flex flex-col justify-between`}
          >
            <h1 className="text-3xl font-semibold text-dangerLightColor">
              Team List
            </h1>
            <div className="w-full align-center">
              <UserList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
