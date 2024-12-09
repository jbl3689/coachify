import { DayState, EventState } from "../../types/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { format, parse } from "date-fns";
import { FlexBox } from "../ui/FlexBox";
import { Button } from "../ui/button";
import FormDialog from "../FormDialog/FormDialog";
import EventForm from "../EventForm/EventForm";
import { useState } from "react";

interface DayDetailsProps {
  selectedDay: DayState;
  selectedEvent: EventState;
}

function EventDetails({ selectedDay, selectedEvent }: DayDetailsProps) {
  // const eventAttendance = [
  //   {
  //     id: 1,
  //     name: "James Blake",
  //   },
  // ];
  // const { eventAttendance } = useEventAttendance(displayedEvent?.id ?? 0);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const startTime = selectedEvent?.event_start_time
    ? parse(selectedEvent.event_start_time, "HH:mm:ss", new Date())
    : null;
  const endTime = selectedEvent?.event_end_time
    ? parse(selectedEvent.event_end_time, "HH:mm:ss", new Date())
    : null;

  return (
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

            <Button className="ml-auto" onClick={() => setIsDialogOpen(true)}>
              Edit
            </Button>
          </FlexBox>
        </CardContent>
      </Card>

      <FormDialog
        Title={
          <div>
            <h2 className="mb-6 ">
              Updating the{" "}
              <span className="text-cyan-500">{selectedEvent.event_type}</span>{" "}
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
    </>
  );
}

export default EventDetails;
