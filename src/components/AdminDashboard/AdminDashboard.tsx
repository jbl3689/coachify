import { useDispatch, useSelector } from "react-redux";

import { getSelectedTeam, setSelectedTeam } from "@/context/teamSlice";
import { useUserTeams } from "@/hooks/teams/useUserTeams";

import DashboardCard from "../ui/DashboardCard";

import { FlexBox } from "@/components/ui/FlexBox";
import Heading from "../ui/Heading";
import Loader from "../ui/Loader";
import UserListTable from "../UserListTable/UserListTable";
import { Card, CardContent } from "../ui/card";
import AddUserSheet from "../AddUserSheet/AddUserSheet";
import Uploader from "@/data/Uploader";
import TeamSelectDropdown from "../TeamSelectDropdown/TeamSelectDropdown";
import { useTeamAdmins } from "@/hooks/user/useTeamAdmins";

function AdminDashboard() {
  const { teams, isLoading, isFetching } = useUserTeams();
  const { admins } = useTeamAdmins();

  const selectedTeamId = useSelector(getSelectedTeam());
  // const selectedTeam = teams?.find((team) => team.id === selectedTeamId);
  const dispatch = useDispatch();

  function handleUpdateTeam(value: string) {
    dispatch(setSelectedTeam(parseInt(value)));
  }

  if (isLoading || isFetching || teams === undefined || teams === null) {
    return <Loader />;
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
            <DashboardCard>
              <Heading as="h4" className="mb-4">
                Admins
              </Heading>
              <ul>
                {admins &&
                  admins.map((admin) => (
                    <li key={admin.id}>- {admin.full_name}</li>
                  ))}
              </ul>
            </DashboardCard>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:grid-cols-3">
            <DashboardCard className="col-span-2 lg:col-span-1">
              <FlexBox
                container
                flexDirection="column"
                justifyContent="space-between"
                height="auto"
              >
                <Heading as="h3">Admin Tools</Heading>
                <FlexBox
                  container
                  flexDirection="column"
                  justifyContent="space-between"
                  gap="16px"
                  width="80%"
                  margin="15px auto"
                >
                  <AddUserSheet />

                  <Uploader />
                </FlexBox>
              </FlexBox>
            </DashboardCard>
            <Card className="col-span-2">
              {/* <CardHeader>
                <CardTitle>
                  <Heading as="h3" className="text-left">
                    Player List
                  </Heading>
                </CardTitle>
              </CardHeader> */}
              <CardContent>
                <UserListTable />
              </CardContent>
            </Card>
          </div>
        </>
      ) : null}
    </FlexBox>
  );
}

export default AdminDashboard;
