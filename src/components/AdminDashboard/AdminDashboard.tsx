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
import { useGuestMode } from "@/demo/session";
import { demoDays, demoEvents } from "@/demo/fixtures";
import { useTeamUsers } from "@/hooks/user/useTeamUsers";
import { format, parse } from "date-fns";

function AdminDashboard() {
  const { teams, isLoading, isFetching } = useUserTeams();
  const { admins } = useTeamAdmins();
  const { users } = useTeamUsers();
  const isGuest = useGuestMode();

  const guestEvents = demoEvents.map((event) => {
    const day = demoDays.find((candidate) => candidate.id === event.day_id);
    return {
      ...event,
      date: day?.date ?? "",
      displayDate: day ? format(new Date(day.date), "d MMM") : "",
      displayTime: format(
        parse(event.event_start_time, "HH:mm:ss", new Date()),
        "HH:mm",
      ),
    };
  });
  const nextTraining = guestEvents.find(
    (event) => event.event_type === "Training",
  );
  const nextGame = guestEvents.find((event) => event.event_type === "Game");

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
              statistic={isGuest ? String(users?.length ?? 0) : "25"}
              Icon={<Users />}
              subtext={isGuest ? "Sample squad" : "2 players injured"}
            />
            <DashboardCard
              title="Upcoming Training"
              statistic={
                isGuest && nextTraining
                  ? `${nextTraining.displayDate} ${nextTraining.displayTime}`
                  : "5th Sep 18:00"
              }
              Icon={<Calendar />}
              subtext={isGuest ? nextTraining?.location : "Pitch 1"}
            />
            <DashboardCard
              title="Upcoming Game"
              statistic={
                isGuest && nextGame
                  ? `${nextGame.displayDate} ${nextGame.displayTime}`
                  : "Feb 3 15:00"
              }
              Icon={<Swords />}
              subtext={isGuest ? nextGame?.location : "Home"}
            />
            <DashboardCard
              title="Admins"
              statistic={isGuest ? "1" : "James Blake"}
              Icon={<CircleUser />}
              subtext={
                admins && admins.map((admin) => admin.full_name).join(", ")
              }
            />
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
            <DashboardDataCard
              className="col-span-2 lg:col-span-1"
              title="Upcoming Fixtures"
            >
              <div className="min-w-0 space-y-4">
                {(isGuest ? guestEvents : upcomingFixtures).map((fixture) => (
                  <div
                    key={fixture.id}
                    className="flex min-w-0 flex-col justify-between gap-2 rounded-lg bg-muted p-4 text-left sm:flex-row sm:items-center"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {"opponent" in fixture
                            ? fixture.opponent
                            : fixture.event_type}
                        </span>
                        <Badge
                          variant={
                            "isHome" in fixture
                              ? fixture.isHome
                                ? "default"
                                : "destructive"
                              : "default"
                          }
                        >
                          {"isHome" in fixture
                            ? fixture.isHome
                              ? "Home"
                              : "Away"
                            : "Sample event"}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {"competition" in fixture
                          ? fixture.competition
                          : fixture.event_type}
                      </div>
                      <div className="text-sm">
                        {"opponent" in fixture
                          ? `${fixture.date} at ${fixture.time}`
                          : `${fixture.displayDate} at ${fixture.displayTime}`}
                      </div>
                    </div>
                    <div className="break-words text-sm text-muted-foreground sm:text-right">
                      {"venue" in fixture ? fixture.venue : fixture.location}
                    </div>
                  </div>
                ))}
              </div>
            </DashboardDataCard>

            {/* <AddUserSheet />

            <Uploader /> */}

            <Card className="min-w-0 lg:col-span-2">
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
