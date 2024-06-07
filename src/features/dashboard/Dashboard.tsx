import { useState } from "react";
import { IoMdArrowDropdownCircle as DropdownArrow } from "react-icons/io";
import { IoMdArrowDropupCircle as DropupArrow } from "react-icons/io";

import UserList from "../user/UserList";
import ClubDetails from "./ClubDetails";
import AddUserForm from "../user/AddUserForm";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";

function Dashboard() {
  const [formShown, setFormShown] = useState<boolean>(true);

  const boxStyles =
    "border border-8 h-64 p-4 flex items-center justify-center rounded shadow";

  return (
    <>
      <div>
        <h1 className="mb-8 text-4xl font-semibold text-center sm:text-3xl text-accentLightColor">
          Admin Dashboard
        </h1>
      </div>
      <div className="flex gap-12">
        {/* Club Details + Next Event*/}
        <div className="grid w-8/12 grid-cols-2 gap-8">
          <div className={`${boxStyles} `}>
            <ClubDetails />
          </div>
          <div className={`${boxStyles} flex flex-col gap-8`}>
            <span>Next Event</span>
          </div>

          {/* Add a new player form */}
          <div className="col-span-2 p-2 border-8 rounded">
            {formShown ? (
              <>
                <div className="flex justify-center gap-16 pt-2">
                  <Heading as="h3" className="text-accentColor">
                    Add a Player
                  </Heading>

                  <span
                    onClick={() => setFormShown(!formShown)}
                    className="flex items-center justify-between text-4xl cursor-pointer hover:text-accentColor"
                  >
                    <DropupArrow />
                  </span>
                </div>
                <AddUserForm />
              </>
            ) : (
              <div className="flex flex-col justify-evenly gap-14">
                <span
                  onClick={() => setFormShown(!formShown)}
                  className="flex items-center w-4/6 mx-auto text-3xl transition-all rounded-lg cursor-pointer justify-evenly bg-secondaryColor"
                >
                  Add New Player
                  <DropdownArrow />
                </span>
                <span
                  onClick={() => setFormShown(!formShown)}
                  className="flex items-center w-4/6 mx-auto text-3xl transition-all rounded-lg cursor-pointer justify-evenly bg-secondaryColor"
                >
                  Add New Player
                  <DropdownArrow />
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Team List */}
        <div className="w-4/12">
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
