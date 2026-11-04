import { format } from "date-fns";
import { ArrowRight, Clock3, MapPin, UsersRound } from "lucide-react";
import { useSelector } from "react-redux";
import { getSelectedTeam } from "@/context/teamSlice";
import { useUserTeams } from "@/hooks/teams/useUserTeams";
import { useTeamAdmins } from "@/hooks/user/useTeamAdmins";
import { useTeamUsers } from "@/hooks/user/useTeamUsers";
import { useTeamSchedule } from "@/hooks/events/useTeamSchedule";
import { eventDurationMinutes, formatDuration } from "@/utils/eventTime";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Loader from "../ui/Loader";
import UserListTable from "../UserListTable/UserListTable";
import WeeklyActivity from "./WeeklyActivity";

function AdminDashboard({ onShowCalendar }: { onShowCalendar: () => void }) {
  const { teams, isLoading } = useUserTeams();
  const { admins } = useTeamAdmins();
  const { users } = useTeamUsers();
  const selectedTeamId = useSelector(getSelectedTeam());
  const schedule = useTeamSchedule();
  const upcoming = schedule.events.filter(
    (event) => event.startsAt >= new Date(),
  );
  const nextEvent = upcoming[0];
  const selectedTeam =
    teams?.find((team) => team.id === selectedTeamId) ?? teams?.[0];

  if (isLoading || !teams) return <Loader />;

  return (
    <div className="space-y-6">
      <header className="flex min-w-0 flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          {selectedTeam?.logo ? (
            <img
              src={selectedTeam.logo}
              alt=""
              className="h-14 w-14 shrink-0 rounded-lg border bg-card object-contain p-1.5"
            />
          ) : (
            <div
              aria-hidden="true"
              className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-primary/10 text-xl font-bold text-primary"
            >
              {selectedTeam?.team_name?.slice(0, 1) ?? "T"}
            </div>
          )}
          <div className="min-w-0">
            <p className="text-xs font-medium text-muted-foreground">
              Team overview
            </p>
            <h1 className="mt-1 truncate text-2xl font-semibold tracking-tight sm:text-3xl">
              {selectedTeam?.team_name ?? "Your team"}
            </h1>
            {selectedTeam?.location && (
              <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{selectedTeam.location}</span>
              </p>
            )}
          </div>
        </div>
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <UsersRound aria-hidden="true" className="h-4 w-4" />
          <span className="font-medium text-foreground">
            {users?.length ?? 0}
          </span>{" "}
          players{" "}
          <span aria-hidden="true" className="mx-1">
            /
          </span>
          <span className="font-medium text-foreground">
            {admins?.length ?? 0}
          </span>{" "}
          {admins?.length === 1 ? "coach" : "coaches"}
        </p>
      </header>

      {teams.length > 0 && (
        <>
          <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <WeeklyActivity {...schedule} />
            <Card className="flex min-w-0 flex-col border-t-2 border-t-primary">
              <CardHeader className="p-5 pb-3">
                <CardTitle className="text-lg">Up next</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Your next team session
                </p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col p-5 pt-2">
                {schedule.error ? (
                  <p className="text-sm text-muted-foreground" role="status">
                    Upcoming sessions could not be loaded.
                  </p>
                ) : schedule.isLoading ? (
                  <p className="text-sm text-muted-foreground" role="status">
                    Loading the schedule…
                  </p>
                ) : nextEvent ? (
                  <>
                    <div className="mb-5 flex items-center gap-4">
                      <div className="w-16 shrink-0 border-r pr-4 text-center">
                        <p className="text-xs font-medium uppercase text-muted-foreground">
                          {format(nextEvent.startsAt, "MMM")}
                        </p>
                        <p className="mt-1 text-4xl font-semibold tracking-tight tabular-nums">
                          {format(nextEvent.startsAt, "d")}
                        </p>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm text-muted-foreground">
                          {format(nextEvent.startsAt, "EEEE")}
                        </p>
                        <h2 className="mt-1 break-words text-2xl font-semibold tracking-tight">
                          {nextEvent.event_type}
                        </h2>
                      </div>
                    </div>
                    <p className="flex items-center gap-2 text-sm">
                      <Clock3
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 text-muted-foreground"
                      />
                      {nextEvent.event_start_time.slice(0, 5)} –{" "}
                      {nextEvent.event_end_time.slice(0, 5)}
                      <span className="text-muted-foreground">
                        ·{" "}
                        {formatDuration(
                          eventDurationMinutes(
                            nextEvent.event_start_time,
                            nextEvent.event_end_time,
                          ),
                        )}
                      </span>
                    </p>
                    <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin aria-hidden="true" className="h-4 w-4 shrink-0" />
                      {nextEvent.location || "Location to be confirmed"}
                    </p>
                  </>
                ) : (
                  <p className="py-4 text-sm text-muted-foreground">
                    No upcoming sessions in the next two weeks.
                  </p>
                )}
                <div className="mt-auto pt-6">
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={onShowCalendar}
                  >
                    Open calendar
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid min-w-0 items-start gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <Card className="min-w-0">
              <CardContent className="p-4 sm:p-5">
                <UserListTable />
              </CardContent>
            </Card>
            <Card className="min-w-0">
              <CardHeader className="p-5 pb-0">
                <CardTitle className="text-lg">Further ahead</CardTitle>
                <p className="text-sm text-muted-foreground">
                  The rest of the next two weeks
                </p>
              </CardHeader>
              <CardContent className="px-5 pb-5 pt-2">
                {!schedule.error &&
                  !schedule.isLoading &&
                  upcoming.slice(1, 4).map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start justify-between gap-3 border-b py-5 last:border-0 last:pb-0"
                    >
                      <div className="min-w-0">
                        <p className="font-medium">{event.event_type}</p>
                        <p className="mt-1 break-words text-sm text-muted-foreground">
                          {event.location || "Location to be confirmed"}
                        </p>
                      </div>
                      <p className="shrink-0 text-right text-sm tabular-nums">
                        {format(event.startsAt, "EEE d MMM")}
                        <span className="mt-1 block text-muted-foreground">
                          {format(event.startsAt, "HH:mm")}
                        </span>
                      </p>
                    </div>
                  ))}
                <p className="pt-4 text-xs text-muted-foreground" role="status">
                  {schedule.error
                    ? "The schedule is currently unavailable."
                    : schedule.isLoading
                      ? "Loading upcoming sessions…"
                      : upcoming.length < 2
                        ? "Nothing else scheduled in this period."
                        : "Showing the next three sessions after your next event."}
                </p>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminDashboard;
