import { useState } from "react";
import { IoMdArrowDropdownCircle as DropdownArrow } from "react-icons/io";
import { IoMdArrowDropupCircle as DropupArrow } from "react-icons/io";

import UserList from "../user/UserList";
import ClubDetails from "./ClubDetails";
import AddUserForm from "../user/AddUserForm";
import Button from "../../ui/Button";

function Dashboard() {
  const [formShown, setFormShown] = useState<boolean>(false);

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
        <div className="grid w-8/12 grid-cols-2 gap-8">
          <div className={`${boxStyles} `}>
            <ClubDetails />
          </div>
          <div className={`${boxStyles} flex flex-col gap-8`}>
            <span>Next Training</span>
          </div>
          <Button type="accent" onClick={() => setFormShown(!formShown)}>
            {formShown ? (
              <span className="flex items-center justify-between">
                Hide Form <DropupArrow />
              </span>
            ) : (
              <span className="flex items-center justify-between">
                Add a new Player <DropdownArrow />
              </span>
            )}
          </Button>
          {formShown && (
            <div className={`border-8 rounded col-span-2`}>
              <AddUserForm />
            </div>
          )}
        </div>

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
