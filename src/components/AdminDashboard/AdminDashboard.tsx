import { useUserTeams } from "@/hooks/teams/useUserTeams";
import UserList from "../UserList";
import DashboardCard from "./DashboardCard";
import { useSelector } from "react-redux";
import { getSelectedTeam } from "@/context/teamSlice";

function AdminDashboard() {
  const { teams } = useUserTeams();

  const selectedTeamId = useSelector(getSelectedTeam());

  return (
    <>
      <div className="flex gap-12">
        {/* Club Details + Next Event*/}
        <div className="grid w-8/12 grid-cols-2 gap-8">
          <DashboardCard
            Title={
              <div className="text-2xl text-amber-300">
                Ellerslie AFC Diamonds
              </div>
            }
          >
            <div className="flex gap-4">
              <img
                src="/logo.png"
                alt="team logo"
                height="300"
                width="150"
                className="rounded-xl"
              ></img>
              <div className="flex flex-col text-xl justify-evenly text-secondaryLightColor">
                <span>Michaels Ave</span>
                <span>NRF Division 1</span>
                <span>Football ⚽️</span>
              </div>
            </div>
          </DashboardCard>

          <DashboardCard Title={<span>Next Event</span>}></DashboardCard>

          <div className="col-span-2">
            <DashboardCard Title={<span> Add a Player</span>}>
              <div className="flex justify-center gap-16 pt-2"></div>
              {/* <AddUserForm /> */}
            </DashboardCard>
          </div>
        </div>

        {/* Team List */}
        <div className="w-4/12">
          <DashboardCard
            Title={
              <h1 className="text-3xl font-semibold text-dangerLight">
                Team List
              </h1>
            }
          >
            <div className="w-full align-center">
              <UserList />
            </div>
          </DashboardCard>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
