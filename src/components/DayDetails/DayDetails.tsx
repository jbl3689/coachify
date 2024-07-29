import { useSelector } from "react-redux";
import { DayState, EventState, ReduxAppState } from "../../types/types";
import { selectCurrentWeekDayEvents } from "../../context/calendarSlice";
import { format, parse } from "date-fns";
import { useEffect, useState } from "react";
import Button from "../../ui/Button";

interface DayDetailsProps {
  selectedDay: DayState;
}

function DayDetails({ selectedDay }: DayDetailsProps) {
  const selectedDayEvents = useSelector((state: ReduxAppState) =>
    selectCurrentWeekDayEvents(state, selectedDay.date)
  );

  const [displayedEvent, setDisplayedEvent] = useState<EventState | undefined>(
    selectedDayEvents?.at(0) ?? undefined
  );

  useEffect(() => {
    if (selectedDayEvents) setDisplayedEvent(selectedDayEvents.at(0));
  }, [selectedDayEvents]);

  console.log(displayedEvent);

  const startTime = displayedEvent?.event_start_time
    ? parse(displayedEvent.event_start_time, "HH:mm:ss", new Date())
    : null;
  const endTime = displayedEvent?.event_end_time
    ? parse(displayedEvent.event_end_time, "HH:mm:ss", new Date())
    : null;

  return (
    <div className="grid p-2 h-96 mx-auto border-4 rounded-md bg-secondaryBase border-dangerBase grid-rows-[auto_1fr]">
      <div className="flex flex-row justify-between px-1 space-x-2 text-3xl tracking-wide text-left text-textBase">
        <div>
          <div className="font-semibold">
            {selectedDay.day} | {format(new Date(selectedDay.date), "dd-MMM")}
          </div>
          {displayedEvent && (
            <>
              <div className="text-2xl text-textAlt">
                {displayedEvent?.event_type} |{" "}
                {startTime ? format(startTime, "h:mma") : ""} to{" "}
                {endTime ? format(endTime, "h:mma") : ""}
              </div>
              <div className="text-2xl text-textAlt">Michael's Ave Reserve</div>
            </>
          )}
        </div>
        <div className="text-2xl text-textAlt">
          {displayedEvent?.is_morning ? "Morning Event" : "Evening Event"}
        </div>
      </div>
      <div className="flex flex-col justify-center flex-grow py-2">
        {selectedDayEvents && selectedDayEvents?.length > 0 ? (
          <div className="flex justify-between">
            <div className="flex-1 p-2">Col-1</div>
            <div className="flex-1 p-2">Col-2</div>
          </div>
        ) : (
          <div className="flex flex-col w-4/6 gap-12 mx-auto">
            <Button type="accent">Add a Training</Button>
            <Button type="accent">Add a Game</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DayDetails;
