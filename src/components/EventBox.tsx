import React from "react";
import { EventState } from "../types/types";

interface EventBoxProps {
  event: EventState;
}

function EventBox({ event }: EventBoxProps) {
  return (
    <div className="flex flex-col justify-between w-11/12 h-24 px-2 py-1 mx-auto text-left rounded-md bg-bg3">
      <div className="text-[20px]">{event.event_type}</div>
      <div>
        <div className="text-sm text-textAlt">
          {event.event_start_time} - {event.event_end_time}
        </div>
        {/* <div className="text-sm text-textAlt">Eden Park</div> */}
      </div>
    </div>
  );
}

export default EventBox;
