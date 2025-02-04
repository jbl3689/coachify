import { DayState, EventState } from "../../types/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { format, parse } from "date-fns";
import { FlexBox } from "../ui/FlexBox";
import { Button } from "../ui/button";
import { ContentDialog } from "../ContentDialog";
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
  const { mutate: deleteEvent } = useDeleteEvent();

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const startTime = selectedEvent?.event_start_time
    ? parse(selectedEvent.event_start_time, "HH:mm:ss", new Date())
    : null;
  const endTime = selectedEvent?.event_end_time
    ? parse(selectedEvent.event_end_time, "HH:mm:ss", new Date())
    : null;

  return (
    <AlertDialog>
      <>
        <Card>
          <CardHeader className="text-left">
            <CardTitle className="text-xl md:text-2xl">
              {selectedDay.day} | {format(new Date(selectedDay.date), "dd-MMM")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FlexBox container>
              <div className="text-left">
                {selectedEvent.event_type}
                <br />
                {startTime ? format(startTime, "h:mma") : ""} to{" "}
                {endTime ? format(endTime, "h:mma") : ""}
                <br />
                {selectedEvent.location}
              </div>
              {isUserAdmin ? (
                <div className="flex flex-col gap-4 ml-auto ">
                  <Button onClick={() => setIsDialogOpen(true)}>Edit</Button>
                  <AlertDialogTrigger>
                    <Button variant="destructive">Delete</Button>
                  </AlertDialogTrigger>
                </div>
              ) : null}
            </FlexBox>
          </CardContent>
        </Card>

        <ContentDialog
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
        </ContentDialog>

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
