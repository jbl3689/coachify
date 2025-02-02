import { Calendar, CircleUser, Swords, Users } from "lucide-react";

import DashboardCard from "../ui/DashboardCard";
import { Card, CardContent } from "../ui/card";
import Loader from "../ui/Loader";
import { FlexBox } from "@/components/ui/FlexBox";
import UserListTable from "../UserListTable/UserListTable";
import DashboardDataCard from "../ui/DashboardDataCard";
import { Badge } from "../ui/Badge";

import { useUserTeams } from "@/hooks/teams/useUserTeams";
import { useTeamAdmins } from "@/hooks/user/useTeamAdmins";
import { upcomingFixtures } from "@/data/mockFixtureData";

function AdminDashboard() {
  const { teams, isLoading, isFetching } = useUserTeams();
  const { admins } = useTeamAdmins();

  if (isLoading || isFetching || teams === undefined || teams === null) {
    return <Loader />;
  }
  const isTeamListEmpty = !teams || teams.length === 0;

  return (
    <FlexBox container flexDirection="column" gap="25px">
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
              statistic="Feb 3 15:00"
              Icon={<Swords />}
              subtext="Home"
            />
            <DashboardCard
              title="Admins"
              statistic="James Blake"
              Icon={<CircleUser />}
              subtext={
                admins && admins.map((admin) => admin.full_name).join(", ")
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-8 lg:grid-cols-3">
            <DashboardDataCard
              className="col-span-2 lg:col-span-1"
              title="Upcoming Fixtures"
            >
              <div className="space-y-4">
                {upcomingFixtures.map((fixture) => (
                  <div
                    key={fixture.id}
                    className="flex items-center justify-between p-4 text-left rounded-lg bg-muted"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{fixture.opponent}</span>
                        <Badge
                          variant={fixture.isHome ? "default" : "destructive"}
                        >
                          {fixture.isHome ? "Home" : "Away"}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {fixture.competition}
                      </div>
                      <div className="text-sm">
                        {fixture.date} at {fixture.time}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {fixture.venue}
                    </div>
                  </div>
                ))}
              </div>
            </DashboardDataCard>

            {/* <AddUserSheet />

            <Uploader /> */}

            <Card className="col-span-2">
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
