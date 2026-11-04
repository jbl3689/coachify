import { useState } from "react";
import { Button } from "../ui/button";
import { useEventAttendance } from "@/hooks/events/useEventAttendance";
import { useTeamUsers } from "@/hooks/user/useTeamUsers";

export default function EventAttendancePanel({ eventId }: { eventId: number }) {
  const attendance = useEventAttendance(eventId);
  const roster = useTeamUsers();
  const users = roster.users ?? [];
  const [page, setPage] = useState(0);
  const pageSize = 6;
  const pageCount = Math.ceil(users.length / pageSize);
  const currentPage = Math.min(page, Math.max(0, pageCount - 1));
  const firstIndex = currentPage * pageSize;
  const visibleUsers = users.slice(firstIndex, firstIndex + pageSize);
  const responses = new Map(
    attendance.eventAttendance?.map((response) => [
      response.user_id,
      response.isAttending,
    ]),
  );
  const going = users.filter((user) => responses.get(user.id) === true).length;
  const unavailable = users.filter(
    (user) => responses.get(user.id) === false,
  ).length;
  const waiting = users.length - going - unavailable;

  return (
    <section
      className="min-w-0 border-t p-5 sm:p-6 lg:border-l lg:border-t-0"
      aria-labelledby="event-attendance-heading"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 id="event-attendance-heading" className="font-semibold">
          Attendance
        </h3>
        <span className="text-xs text-muted-foreground">Team responses</span>
      </div>
      {attendance.error || roster.error ? (
        <p role="status" className="mt-5 text-sm text-muted-foreground">
          Attendance could not be loaded.
        </p>
      ) : attendance.isLoading || roster.isLoading ? (
        <p role="status" className="mt-5 text-sm text-muted-foreground">
          Loading attendance…
        </p>
      ) : users.length === 0 ? (
        <p className="mt-5 text-sm text-muted-foreground">
          No players have been added to this team yet.
        </p>
      ) : (
        <>
          <p className="mt-5 text-3xl font-semibold tabular-nums">
            {going}
            <span className="text-base font-normal text-muted-foreground">
              {" "}
              / {users.length} attending
            </span>
          </p>
          <div
            role="img"
            aria-label={`${going} attending, ${unavailable} not attending, ${waiting} awaiting a response`}
            className="mt-3 flex h-1.5 overflow-hidden rounded-full bg-muted"
          >
            <span
              className="bg-primary"
              style={{ width: `${(going / users.length) * 100}%` }}
            />
            <span
              className="bg-foreground/30"
              style={{ width: `${(unavailable / users.length) * 100}%` }}
            />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            {unavailable} not attending · {waiting} awaiting response
          </p>
          <ul id="event-attendee-list" className="mt-5 divide-y">
            {visibleUsers.map((user) => {
              const response = responses.get(user.id);
              return (
                <li
                  key={user.id}
                  className="flex items-center gap-3 py-2.5 text-sm"
                >
                  <span
                    aria-hidden="true"
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-[10px] font-medium text-muted-foreground"
                  >
                    {user.full_name
                      .split(" ")
                      .map((name) => name[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <span className="min-w-0 flex-1 truncate">
                    {user.full_name}
                  </span>
                  <span
                    className={`shrink-0 text-xs ${response === true ? "font-medium text-primary" : "text-muted-foreground"}`}
                  >
                    {response === true
                      ? "Attending"
                      : response === false
                        ? "Not attending"
                        : "No response"}
                  </span>
                </li>
              );
            })}
          </ul>
          {pageCount > 1 && (
            <nav
              aria-label="Attendee pages"
              className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-4"
            >
              <p
                className="text-xs tabular-nums text-muted-foreground"
                role="status"
              >
                {firstIndex + 1}–{Math.min(firstIndex + pageSize, users.length)}{" "}
                of {users.length} players
              </p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  aria-label="Previous attendees"
                  aria-controls="event-attendee-list"
                  disabled={currentPage === 0}
                  onClick={() => setPage(currentPage - 1)}
                >
                  Previous
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  aria-label="Next attendees"
                  aria-controls="event-attendee-list"
                  disabled={currentPage >= pageCount - 1}
                  onClick={() => setPage(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            </nav>
          )}
        </>
      )}
    </section>
  );
}
