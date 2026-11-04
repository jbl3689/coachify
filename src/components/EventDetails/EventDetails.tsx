import { DayState, EventState } from "../../types/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addMinutes, format, parse, parseISO } from "date-fns";
import { CalendarDays, Clock3, MapPin, X } from "lucide-react";
import { eventDurationMinutes, formatDuration } from "@/utils/eventTime";
import EventAttendancePanel from "./EventAttendancePanel";
import { Button } from "../ui/button";
import FormDialog from "../FormDialog/FormDialog";
import EventForm from "../EventForm/EventForm";
import { Dispatch, SetStateAction, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/AlertDialog";
import { useDeleteEvent } from "@/hooks/events/useDeleteEvent";
import { useIsUserAdmin } from "@/hooks/user/useIsUserAdmin";
import { useGuestMode } from "@/demo/session";

interface DayDetailsProps {
  selectedDay: DayState;
  selectedEvent: EventState;
  setSelectedDay: Dispatch<SetStateAction<DayState | null>>;
}

function EventDetails({
  selectedDay,
  selectedEvent,
  setSelectedDay,
}: DayDetailsProps) {
  const isUserAdmin = useIsUserAdmin();
  const isGuest = useGuestMode();
  const { mutate: deleteEvent } = useDeleteEvent();

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const startTime = selectedEvent?.event_start_time
    ? parse(selectedEvent.event_start_time, "HH:mm:ss", new Date())
    : null;
  const endTime = selectedEvent?.event_end_time
    ? parse(selectedEvent.event_end_time, "HH:mm:ss", new Date())
    : null;

  const duration = eventDurationMinutes(
    selectedEvent.event_start_time,
    selectedEvent.event_end_time,
  );
  const startsAt = parseISO(
    `${selectedDay.date}T${selectedEvent.event_start_time}`,
  );
  const endsAt = addMinutes(startsAt, duration);
  const now = new Date();
  const status =
    now < startsAt ? "Upcoming" : now > endsAt ? "Finished" : "In progress";

  return (
    <AlertDialog>
      <>
        <Card className="overflow-hidden border-t-2 border-t-primary">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="flex min-w-0 flex-col">
              <CardHeader className="p-5 pb-0 sm:p-6 sm:pb-0">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Selected session
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Close event details"
                    onClick={() => setSelectedDay(null)}
                  >
                    <X aria-hidden="true" className="h-4 w-4" />
                  </Button>
                </div>
                <CardTitle className="text-3xl leading-tight">
                  {selectedEvent.event_type}
                </CardTitle>
                <p className="pt-1 text-sm text-muted-foreground">
                  {status} · Session {selectedEvent.session_number}
                </p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col p-5 pt-6 sm:p-6">
                <dl className="space-y-5">
                  <div className="flex items-start gap-3">
                    <CalendarDays
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"
                    />
                    <div>
                      <dt className="text-xs text-muted-foreground">Date</dt>
                      <dd className="mt-1 text-sm font-medium">
                        {format(
                          parseISO(selectedDay.date),
                          "EEEE, d MMMM yyyy",
                        )}
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock3
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"
                    />
                    <div>
                      <dt className="text-xs text-muted-foreground">
                        Time & duration
                      </dt>
                      <dd className="mt-1 text-sm font-medium tabular-nums">
                        {startTime ? format(startTime, "HH:mm") : "TBC"} –{" "}
                        {endTime ? format(endTime, "HH:mm") : "TBC"}
                        <span className="ml-2 font-normal text-muted-foreground">
                          {duration ? formatDuration(duration) : "Duration TBC"}
                        </span>
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"
                    />
                    <div className="min-w-0">
                      <dt className="text-xs text-muted-foreground">
                        Location
                      </dt>
                      <dd className="mt-1 break-words text-sm font-medium">
                        {selectedEvent.location || "To be confirmed"}
                      </dd>
                    </div>
                  </div>
                </dl>
                {isUserAdmin && !isGuest && (
                  <div className="mt-auto flex flex-wrap gap-3 pt-8">
                    <Button onClick={() => setIsDialogOpen(true)}>
                      Edit session
                    </Button>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="text-destructive">
                        Delete session
                      </Button>
                    </AlertDialogTrigger>
                  </div>
                )}
              </CardContent>
            </div>
            {selectedEvent.id ? (
              <EventAttendancePanel
                key={selectedEvent.id}
                eventId={selectedEvent.id}
              />
            ) : (
              <p className="p-6 text-sm text-muted-foreground">
                Attendance is available once this event is saved.
              </p>
            )}
          </div>
        </Card>

        <FormDialog
          Title={
            <div>
              <h2 className="mb-6 ">
                Updating the{" "}
                <span className="text-cyan-500">
                  {selectedEvent.event_type}
                </span>{" "}
                for{" "}
                <span className="text-textAlt">
                  {new Date(selectedDay.date).toDateString()}{" "}
                </span>
              </h2>
            </div>
          }
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        >
          <EventForm
            selectedDay={selectedDay}
            selectedEvent={selectedEvent}
            setIsDialogOpen={setIsDialogOpen}
          />
        </FormDialog>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete the event?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You are deleting the {selectedEvent.event_type} session on{" "}
              {new Date(selectedDay.date).toDateString()}. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive"
              onClick={() => {
                selectedEvent.id && deleteEvent(selectedEvent.id);
                setSelectedDay(null);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </>
    </AlertDialog>
  );
}

export default EventDetails;
