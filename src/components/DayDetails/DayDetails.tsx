import { format, parse } from "date-fns";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useBreakpoint } from "use-breakpoint";

import { selectCurrentWeekDayEvents } from "../../context/calendarSlice";
import {
  BREAKPOINTS,
  dayOfWeek,
  dayOfWeekAbbreviations,
  DayState,
  EventState,
  ReduxAppState,
} from "../../types/types";
import Button from "../../ui/Button";
import EventForm from "../EventForm";
import { useEventAttendance } from "../../hooks/useEvents";

interface DayDetailsProps {
  selectedDay: DayState;
}

function DayDetails({ selectedDay }: DayDetailsProps) {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);

  const [formEventType, setFormEventType] = useState<string | null>(null);
  const [displayedEvent, setDisplayedEvent] = useState<EventState | null>(null);
  const [isMorning, setIsMorning] = useState<boolean>(true);

  const selectedDayEvents = useSelector((state: ReduxAppState) =>
    selectCurrentWeekDayEvents(state, selectedDay.date)
  );

  const { eventAttendance } = useEventAttendance(displayedEvent?.id ?? 0);

  useEffect(() => {
    if (selectedDayEvents)
      setDisplayedEvent(
        selectedDayEvents.find((event) => event.is_morning === isMorning) ??
          null
      );
  }, [isMorning, selectedDayEvents]);

  useEffect(() => {
    setFormEventType(null);
    setIsMorning(true);
  }, [selectedDay]);

  const handleChangeTime = () => {
    setIsMorning(!isMorning);
    if (selectedDayEvents) {
      setDisplayedEvent(
        selectedDayEvents.find((event) => event.is_morning === isMorning) ??
          null
      );
    }
  };

  const startTime = displayedEvent?.event_start_time
    ? parse(displayedEvent.event_start_time, "HH:mm:ss", new Date())
    : null;
  const endTime = displayedEvent?.event_end_time
    ? parse(displayedEvent.event_end_time, "HH:mm:ss", new Date())
    : null;

  return (
    <div className="grid p-2 h-96 mx-auto border-4 rounded-md bg-secondaryBase border-accentBase grid-rows-[auto_1fr]">
      {!formEventType ? (
        <>
          <div className="flex flex-row justify-between px-1 space-x-2 tracking-wide text-left text-textBase">
            <div className="">
              <div className="text-2xl font-semibold md:text-3xl">
                {breakpoint === "mobile"
                  ? dayOfWeekAbbreviations[selectedDay.day as dayOfWeek]
                  : selectedDay.day}{" "}
                | {format(new Date(selectedDay.date), "dd-MMM")}
              </div>
              {displayedEvent && (
                <div className="text-xl md:text-2xl">
                  <div className="text-textAlt">
                    {displayedEvent?.event_type} |{" "}
                    {startTime ? format(startTime, "h:mma") : ""} to{" "}
                    {endTime ? format(endTime, "h:mma") : ""}
                  </div>
                  <div className="text-textAlt">Michael's Ave Reserve</div>
                </div>
              )}
            </div>
            <div className="text-textAlt ">
              <button
                className="px-8 py-2 rounded-tl-md rounded-bl-md rounded-br-md text-accentBase bg-primaryBase hover:bg-primaryLight"
                onClick={handleChangeTime}
              >
                {isMorning ? "Go to Evening" : "Go to Morning"}
              </button>
            </div>
          </div>

          <div
            className={`${
              breakpoint === "mobile" ? "flex-row" : "flex-col"
            } flex justify-center flex-grow py-2`}
          >
            {displayedEvent ? (
              <div className="flex justify-between">
                <div className="flex-1 p-2">
                  <div>Attendes:</div>
                  <div>
                    {eventAttendance?.map((user) => <div>{user.id}</div>)}
                  </div>
                </div>
                <div className="flex-1 p-2">Col-2</div>
              </div>
            ) : (
              <div className="flex flex-col w-1/2 gap-12 mx-auto">
                {!formEventType && (
                  <>
                    <Button
                      type="accent"
                      onClick={() => setFormEventType("Training")}
                    >
                      Add a Training
                    </Button>
                    <Button
                      type="accent"
                      onClick={() => setFormEventType("Game")}
                    >
                      Add a Game
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        </>
      ) : (
        <EventForm
          selectedDay={selectedDay}
          eventType={formEventType ?? ""}
          setFormEventType={setFormEventType}
        />
      )}
    </div>
  );
}

export default DayDetails;
