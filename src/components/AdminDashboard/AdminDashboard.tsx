import { Calendar, CircleUser, Swords, Users } from "lucide-react";

import DashboardCard from "../ui/DashboardCard";
import { Card, CardContent } from "../ui/card";
import Loader from "../ui/Loader";
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
import { useBreakpoint } from "use-breakpoint";
import { BREAKPOINTS } from "@/types/types";
import { Button } from "../ui/button";

function AdminDashboard({ onShowCalendar }: { onShowCalendar: () => void }) {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
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
  const scheduledAt = (event: (typeof guestEvents)[number]) =>
    parse(
      `${event.date} ${event.event_start_time}`,
      "yyyy-MM-dd HH:mm:ss",
      new Date(),
    );
  const upcomingGuestEvents = guestEvents
    .filter((event) => scheduledAt(event) >= new Date())
    .sort((a, b) => scheduledAt(a).getTime() - scheduledAt(b).getTime());
  const nextTraining = upcomingGuestEvents.find(
    (event) => event.event_type === "Training",
  );
  const nextGame = upcomingGuestEvents.find(
    (event) => event.event_type === "Game",
  );
  const allFixtures = isGuest ? upcomingGuestEvents : upcomingFixtures;
  const isSmallScreen = breakpoint === "mobile" || breakpoint === "mobileLarge";
  const visibleFixtures = isSmallScreen ? allFixtures.slice(0, 3) : allFixtures;

  if (isLoading || isFetching || teams === undefined || teams === null) {
    return <Loader />;
  }
  const isTeamListEmpty = !teams || teams.length === 0;

  return (
    <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-4">
      {!isTeamListEmpty ? (
        <>
          <DashboardDataCard
            className="lg:col-span-1"
            title="Upcoming Fixtures"
          >
            <div className="min-w-0 space-y-4">
              {visibleFixtures.map((fixture) => (
                <div
                  key={fixture.id}
                  className="flex min-w-0 flex-col justify-between gap-2 rounded-lg bg-muted p-3 text-left sm:flex-row sm:items-center sm:p-4"
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
            {isSmallScreen && (
              <Button
                type="button"
                variant="outline"
                className="mt-4 w-full"
                onClick={onShowCalendar}
              >
                View full calendar
              </Button>
            )}
          </DashboardDataCard>

          {/* <AddUserSheet />

            <Uploader /> */}

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-3 lg:grid-cols-2">
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
          <Card className="min-w-0 lg:col-span-4">
            <CardContent>
              <UserListTable />
            </CardContent>
          </Card>
        </>
      ) : null}
    </div>
  );
}

export default AdminDashboard;
