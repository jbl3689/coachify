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
            <DashboardCard>24km ran this week</DashboardCard>
            <DashboardCard>Upcoming Training: 5th Sep 18:00</DashboardCard>
            <DashboardCard>Upcoming Game: 9th Sep 14:00</DashboardCard>
            <DashboardCard>Manager: James Blake </DashboardCard>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:grid-cols-3">
            {/* <DashboardCard>
              <img
                className="rounded-2xl"
                src={selectedTeam?.logo}
                alt={selectedTeam?.team_name}
              ></img>
            </DashboardCard> */}
            <DashboardCard className="col-span-2">
              <FlexBox
                container
                flexDirection="column"
                justifyContent="space-between"
                height="auto"
              ></FlexBox>
            </DashboardCard>

            <Table className="overflow-hidden border-2 border-white ">
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
