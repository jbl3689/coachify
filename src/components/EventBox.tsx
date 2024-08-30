import { format, parse } from "date-fns";

import { useEventAttendance } from "../hooks/useEvents";
import { EventState } from "../types/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface EventBoxProps {
  event: EventState;
  onClick: () => void;
}

function EventBox({ event, onClick }: EventBoxProps) {
  const { eventAttendance } = useEventAttendance(event.id);

  const startTime = event?.event_start_time
    ? parse(event.event_start_time, "HH:mm:ss", new Date())
    : null;
  const endTime = event?.event_end_time
    ? parse(event.event_end_time, "HH:mm:ss", new Date())
    : null;

  return (
    <Card
      className="flex flex-col justify-between w-11/12 mx-auto font-normal text-left border-4 border-double rounded-md h-28 bg-secondaryLight border-textBase"
      onClick={onClick}
    >
      <CardHeader className="p-2">
        <CardTitle className="flex flex-row items-center justify-between">
          <div className="text-[20px]">{event.event_type}</div>
          <div className="text-sm">{eventAttendance?.length ?? 0} / 32</div>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-2">
        <div className="text-sm text-textAlt">
          {startTime ? format(startTime, "h:mma") : ""} -{" "}
          {endTime ? format(endTime, "h:mma") : ""}
          {/* {event.event_start_time} - {event.event_end_time} */}
        </div>
        <div className="text-sm text-textAlt">{event.location}</div>
      </CardContent>
    </Card>
  );
}

export default EventBox;
