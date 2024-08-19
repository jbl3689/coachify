import { format, parse } from 'date-fns'; // Assuming you're using date-fns for formatting
// EventCardHeader.tsx
import React, { Dispatch, SetStateAction } from 'react';

import { Button } from '@/components/ui/button';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DayState, EventState } from '@/types/types';

// Define props based on what you need
interface EventCardHeaderProps {
  selectedDay: DayState;
  displayedEvent: EventState | null;
  setFormEventType: Dispatch<SetStateAction<string | null>>;
}

const EventCardHeader = ({
  selectedDay,
  displayedEvent,
  setFormEventType,
}: EventCardHeaderProps) => {
  const startTime = displayedEvent?.event_start_time
    ? parse(displayedEvent.event_start_time, "HH:mm:ss", new Date())
    : null;
  const endTime = displayedEvent?.event_end_time
    ? parse(displayedEvent.event_end_time, "HH:mm:ss", new Date())
    : null;

  return (
    <div className="flex flex-row items-center justify-between ">
      <CardHeader className="text-left ">
        <CardTitle className="">
          <div className="text-2xl font-semibold tracking-wide md:text-3xl">
            {selectedDay.day} | {format(new Date(selectedDay.date), "dd-MMM")}
          </div>
        </CardTitle>
        <CardDescription>
          {displayedEvent && (
            <div className="text-xl md:text-2xl">
              <div className="text-textAlt">
                {displayedEvent.event_type} |{" "}
                {startTime ? format(startTime, "h:mma") : ""} to{" "}
                {endTime ? format(endTime, "h:mma") : ""}
              </div>
              <div className="text-textAlt">{displayedEvent.location}</div>
            </div>
          )}
        </CardDescription>
      </CardHeader>

      {!displayedEvent && (
        <div className="flex gap-4 px-4">
          <Button
            onClick={() => setFormEventType("Training")}
            size="lg"
            className="px-12"
          >
            Add a Training
          </Button>
          <Button
            onClick={() => setFormEventType("Game")}
            size="lg"
            variant="destructive"
            className="px-12"
          >
            Add a Game
          </Button>
        </div>
      )}
    </div>
  );
};

export default EventCardHeader;
