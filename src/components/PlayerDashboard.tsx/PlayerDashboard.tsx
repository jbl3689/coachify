import { useUserTeams } from "@/hooks/teams/useUserTeams";

import DashboardCard from "../ui/DashboardCard";
import { FlexBox } from "@/components/ui/FlexBox";
import Loader from "../ui/Loader";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/Table";
import { useTeamUsers } from "@/hooks/user/useTeamUsers";
import TeamSelectDropdown from "../TeamSelectDropdown/TeamSelectDropdown";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedTeam, setSelectedTeam } from "@/context/teamSlice";
import { Calendar, Dumbbell, Swords, Users } from "lucide-react";

function PlayerDashboard() {
  const { teams, isLoading, isFetching } = useUserTeams();
  const { users } = useTeamUsers();

  const selectedTeamId = useSelector(getSelectedTeam());
  const dispatch = useDispatch();

  if (isLoading || isFetching || teams === undefined || teams === null) {
    return <Loader />;
  }

  function handleUpdateTeam(value: string) {
    dispatch(setSelectedTeam(parseInt(value)));
  }

  const isTeamListEmpty = !teams || teams.length === 0;

  return (
    <FlexBox container flexDirection="column" gap="25px">
      <TeamSelectDropdown
        teams={teams}
        selectedTeamId={selectedTeamId}
        handleUpdateTeam={handleUpdateTeam}
      />

      {!isTeamListEmpty ? (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <DashboardCard
              title="Squad size"
              statistic="25"
              Icon={<Users />}
              subtext="2 players injured"
            />
            <DashboardCard
              title="Upcoming Training"
              statistic="5th Sep 18:00"
              Icon={<Calendar />}
              subtext="Pitch 1"
            />
            <DashboardCard
              title="Upcoming Game"
              statistic="9th Sep 14:00"
              Icon={<Swords />}
              subtext="Home"
            />
            <DashboardCard
              title="Training Attendance"
              statistic="90%"
              Icon={<Dumbbell />}
              subtext={"Great work!"}
            />
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
            {/* <DashboardCard>
              <img
                className="rounded-2xl"
                src={selectedTeam?.logo}
                alt={selectedTeam?.team_name}
              ></img>
            </DashboardCard> */}
            <Table className="overflow-hidden border-2 border-white lg:col-span-2">
              <TableHeader className="bg-bgPrimary">
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Position(s)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users &&
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.full_name}</TableCell>
                      <TableCell>{user.pos_primary ?? "-"}</TableCell>
                      <TableCell>{user.pos_secondary ?? "-"}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell>Total number of users: {users?.length}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </>
      ) : null}
    </FlexBox>
  );
}

export default PlayerDashboard;
