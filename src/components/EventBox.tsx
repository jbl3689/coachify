import React from "react";
import { EventState } from "../types/types";
import { useEventAttendance } from "../hooks/useEvents";
import { format, parse } from "date-fns";

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
    <div
      className="flex flex-col justify-between w-11/12 h-28 px-2 py-1 mx-auto font-normal text-left rounded-md hover:px-1.5 hover:py-0.5 bg-bgTertiary hover:cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-[20px]">{event.event_type}</div>
        <div className="text-sm">{eventAttendance?.length} / 32</div>
      </div>

      <div>
        <div className="text-sm text-textAlt">
          {startTime ? format(startTime, "h:mma") : ""} -{" "}
          {endTime ? format(endTime, "h:mma") : ""}
          {/* {event.event_start_time} - {event.event_end_time} */}
        </div>
        <div className="text-sm text-textAlt">{event.location}</div>
      </div>
    </div>
  );
}

export default EventBox;
