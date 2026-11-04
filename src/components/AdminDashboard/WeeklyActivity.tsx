import { addDays, format, isSameDay } from "date-fns";
import { ScheduledEvent } from "@/hooks/events/useTeamSchedule";
import { eventDurationMinutes, formatDuration } from "@/utils/eventTime";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface WeeklyActivityProps {
  events: ScheduledEvent[];
  weekStart: Date;
  isLoading: boolean;
  error: unknown;
}

export default function WeeklyActivity({
  events,
  weekStart,
  isLoading,
  error,
}: WeeklyActivityProps) {
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = addDays(weekStart, index);
    const sessions = events.filter((event) => isSameDay(event.startsAt, date));
    return {
      date,
      count: sessions.length,
      minutes: sessions.reduce(
        (total, event) =>
          total +
          eventDurationMinutes(event.event_start_time, event.event_end_time),
        0,
      ),
    };
  });
  const totalMinutes = days.reduce((total, day) => total + day.minutes, 0);
  const totalSessions = days.reduce((total, day) => total + day.count, 0);
  const scale = Math.max(
    60,
    Math.ceil(Math.max(...days.map((day) => day.minutes)) / 60) * 60,
  );

  return (
    <Card className="min-w-0">
      <CardHeader className="flex-row flex-wrap items-start justify-between gap-3 space-y-0 p-5">
        <div>
          <CardTitle className="text-lg">This week</CardTitle>
          <p className="mt-2 text-sm text-muted-foreground">
            {format(weekStart, "d MMM")} –{" "}
            {format(addDays(weekStart, 6), "d MMM")}
          </p>
        </div>
        <span className="text-xs text-muted-foreground">
          Scheduled time · minutes
        </span>
      </CardHeader>
      <CardContent className="p-5 pt-0">
        {error ? (
          <p className="py-12 text-sm text-muted-foreground" role="status">
            The weekly schedule could not be loaded.
          </p>
        ) : isLoading ? (
          <p className="py-12 text-sm text-muted-foreground" role="status">
            Loading this week’s schedule…
          </p>
        ) : (
          <>
            <div className="mb-6 flex flex-wrap items-baseline gap-x-5 gap-y-1">
              <p className="text-3xl font-semibold tracking-tight tabular-nums">
                {formatDuration(totalMinutes)}{" "}
                <span className="text-sm font-normal tracking-normal text-muted-foreground">
                  scheduled
                </span>
              </p>
              <p className="text-sm text-muted-foreground">
                {totalSessions} {totalSessions === 1 ? "session" : "sessions"} ·{" "}
                {days.filter((day) => day.count === 0).length} days free
              </p>
            </div>
            <figure aria-label="Scheduled session minutes for each day this week">
              <div className="relative pl-8">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-5 flex h-32 flex-col justify-between text-[10px] tabular-nums text-muted-foreground"
                >
                  {[scale, scale / 2, 0].map((value, index) => (
                    <div
                      key={value}
                      className="absolute inset-x-0 flex -translate-y-1/2 items-center gap-2"
                      style={{ top: `${index * 50}%` }}
                    >
                      <span className="w-6 text-right">{value}</span>
                      <span className="flex-1 border-t border-dashed" />
                    </div>
                  ))}
                </div>
                <ul className="relative grid grid-cols-7 gap-2 sm:gap-4">
                  {days.map((day) => (
                    <li
                      key={day.date.toISOString()}
                      aria-label={`${format(day.date, "EEEE")}: ${day.count} sessions, ${day.minutes} minutes`}
                      className="min-w-0 text-center"
                    >
                      <div
                        aria-hidden="true"
                        className="flex h-[148px] flex-col items-center justify-end"
                      >
                        {day.minutes > 0 && (
                          <span className="mb-1 text-[11px] tabular-nums text-muted-foreground">
                            {day.minutes}
                          </span>
                        )}
                        <div
                          className={`w-full max-w-10 rounded-t-sm ${isSameDay(day.date, new Date()) ? "bg-primary" : "bg-foreground/25"}`}
                          style={{
                            height: day.minutes
                              ? `${(day.minutes / scale) * 128}px`
                              : "2px",
                          }}
                        />
                      </div>
                      <p
                        aria-hidden="true"
                        className={`mt-3 text-xs ${isSameDay(day.date, new Date()) ? "font-semibold text-primary" : "text-muted-foreground"}`}
                      >
                        {format(day.date, "EEE")}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <figcaption className="mt-4 text-xs text-muted-foreground">
                {totalSessions
                  ? "Planned session time, including matches and recovery."
                  : "No sessions scheduled this week. Open the calendar to plan your week."}
              </figcaption>
            </figure>
          </>
        )}
      </CardContent>
    </Card>
  );
}
