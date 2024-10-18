import { DayState, EventState } from "../../types/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { format, parse } from "date-fns";

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
          <CardTitle className="md:text-2xl text-xl">
            {selectedDay.day} | {format(new Date(selectedDay.date), "dd-MMM")}
          </CardTitle>
          <CardDescription>
            {selectedEvent.event_type}
            <br />
            {startTime ? format(startTime, "h:mma") : ""} to{" "}
            {endTime ? format(endTime, "h:mma") : ""}
            <br />
            {selectedEvent.location}
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </>
  );
}

export default EventDetails;
