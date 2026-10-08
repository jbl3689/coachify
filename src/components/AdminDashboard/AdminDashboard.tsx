import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Loader from "../ui/Loader";
import UserListTable from "../UserListTable/UserListTable";
import { Badge } from "../ui/Badge";

import { useUserTeams } from "@/hooks/teams/useUserTeams";
import { useTeamAdmins } from "@/hooks/user/useTeamAdmins";
import { upcomingFixtures } from "@/data/mockFixtureData";
import { useGuestMode } from "@/demo/session";
import { demoDays, demoEvents } from "@/demo/fixtures";
import { useTeamUsers } from "@/hooks/user/useTeamUsers";
import { format, parse } from "date-fns";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { getSelectedTeam } from "@/context/teamSlice";
import { MapPin, UsersRound } from "lucide-react";

function AdminDashboard({ onShowCalendar }: { onShowCalendar: () => void }) {
  const { teams, isLoading, isFetching } = useUserTeams();
  const { admins } = useTeamAdmins();
  const { users } = useTeamUsers();
  const isGuest = useGuestMode();
  const selectedTeamId = useSelector(getSelectedTeam());

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
  const allFixtures = isGuest ? upcomingGuestEvents : upcomingFixtures;
  const visibleFixtures = allFixtures.slice(0, 3);

  if (isLoading || isFetching || teams === undefined || teams === null) {
    return <Loader />;
  }
  const isTeamListEmpty = !teams || teams.length === 0;
  const selectedTeam =
    teams.find((team) => team.id === selectedTeamId) ?? teams[0];

  return (
    <div className="space-y-5">
      <header className="flex min-w-0 flex-col gap-4 rounded-xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="flex min-w-0 items-center gap-4">
          {selectedTeam?.logo ? (
            <img
              src={selectedTeam.logo}
              alt=""
              className="h-14 w-14 shrink-0 rounded-xl border bg-background object-contain p-1.5"
            />
          ) : (
            <div
              aria-hidden="true"
              className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-primary/10 text-xl font-bold text-primary"
            >
              {selectedTeam?.team_name?.slice(0, 1) ?? "T"}
            </div>
          )}
          <div className="min-w-0 text-left">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Team overview
            </p>
            <h1 className="truncate text-2xl font-semibold sm:text-3xl">
              {selectedTeam?.team_name ?? "Your team"}
            </h1>
            {selectedTeam?.location && (
              <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin aria-hidden="true" className="h-4 w-4 shrink-0" />
                <span className="truncate">{selectedTeam.location}</span>
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 sm:justify-end">
          <Badge variant="secondary" className="gap-1.5 px-3 py-1 text-sm">
            <UsersRound aria-hidden="true" className="h-4 w-4" />
            {users?.length ?? 0} {users?.length === 1 ? "player" : "players"}
          </Badge>
          <Badge variant="secondary" className="px-3 py-1 text-sm">
            {admins?.length ?? 0} {admins?.length === 1 ? "coach" : "coaches"}
          </Badge>
        </div>
      </header>

      {!isTeamListEmpty ? (
        <div className="grid min-w-0 items-start gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)]">
          <Card className="min-w-0">
            <CardHeader className="p-5 pb-3">
              <CardTitle className="text-xl">Upcoming events</CardTitle>
              <CardDescription>What’s coming up for your team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 p-4 pt-0 sm:p-5 sm:pt-0">
              {visibleFixtures.map((fixture) => {
                const isMatch = "opponent" in fixture;
                const title = isMatch ? fixture.opponent : fixture.event_type;
                const description = isMatch
                  ? `${fixture.competition} · ${fixture.venue}`
                  : fixture.location;
                const dateAndTime = isMatch
                  ? `${fixture.date} · ${fixture.time}`
                  : `${fixture.displayDate} · ${fixture.displayTime}`;

                return (
                  <div
                    key={fixture.id}
                    className="flex min-w-0 items-center justify-between gap-3 rounded-lg bg-muted p-3 text-left sm:p-4"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold">{title}</span>
                        {isMatch && (
                          <Badge
                            variant={fixture.isHome ? "default" : "destructive"}
                          >
                            {fixture.isHome ? "Home" : "Away"}
                          </Badge>
                        )}
                      </div>
                      <p className="truncate text-sm text-muted-foreground">
                        {description}
                      </p>
                    </div>
                    <time className="shrink-0 text-right text-sm font-medium">
                      {dateAndTime}
                    </time>
                  </div>
                );
              })}
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={onShowCalendar}
              >
                View full calendar
              </Button>
            </CardContent>
          </Card>

          <Card className="min-w-0">
            <CardContent className="p-3 sm:p-5">
              <UserListTable />
            </CardContent>
          </Card>
        </div>
      ) : null}
    </div>
  );
}

export default AdminDashboard;
