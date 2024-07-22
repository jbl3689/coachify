import React from "react";
import { EventState } from "../types/types";

interface EventBoxProps {
  event: EventState;
  onClick: () => void;
}

function EventBox({ event, onClick }: EventBoxProps) {
  return (
    <div
      className="flex flex-col justify-between w-11/12 h-24 px-2 py-1 mx-auto font-normal text-left rounded-md hover:px-1.5 hover:py-0.5 bg-bg3 hover:cursor-pointer"
      onClick={onClick}
    >
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
