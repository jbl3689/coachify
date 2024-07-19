import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useDispatch } from "react-redux";

import { setDayEvents } from "../context/calendarSlice";
import { useEvents } from "../hooks/useEvents";
import { BREAKPOINTS, DayState, EventState } from "../types/types";

import TickButton from "../ui/TickButton";
import FadeInContainer from "../ui/FadeInContainer";
import EventBox from "./EventBox";
import { useBreakpoint } from "use-breakpoint";

interface CalendarDayProps {
  day: DayState;
  isSelected: boolean;
  onClick: () => void;
}

function CalendarDay({ day, isSelected, onClick }: CalendarDayProps) {
  const dispatch = useDispatch();
  const [totalGoing, setTotalGoing] = useState<number>(14);
  const { breakpoint } = useBreakpoint(BREAKPOINTS);

  const { events, isLoading, error, refetch } = useEvents(day.id || 0);

  useEffect(() => {
    if (events && events?.length > 0) {
      dispatch(
        setDayEvents({
          dayDate: day.date,
          events: events[0],
        })
      );
    }
  }, [day.date, dispatch, events]);

  return (
    <div
      onClick={onClick}
      className="grid h-[400px] grid-rows-4 p-2 text-2xl transition-all rounded-md shadow-md border-amber-100 text-stone-200 hover:cursor-pointer hover:font-semibold bg-secondaryBase w-11/12 mx-auto"
    >
      <div className="text-left">
        <div className="w-full">{day.day}</div>
        <div className="w-full text-lg font-light text-textAlt">
          {format(new Date(day.date), "dd-MMM")}
        </div>
      </div>

      {!isLoading && events && events.length > 0
        ? events.map((event: EventState) => (
            <>
              <FadeInContainer key={event.id}>
                <div
                  className={
                    `flex flex-col items-center justify-between w-full gap-2` +
                      event.event_start_time.split(":")[0] <
                    "13"
                      ? `row-start-2`
                      : `row-start-3`
                  }
                  key={event.id}
                >
                  {event.event_start_time.split(":")[0] < "13" ? (
                    <EventBox event={event} />
                  ) : null}

                  <div className="row-start-3 py-2 border-b-2"></div>

                  {event.event_start_time.split(":")[0] >= "13" ? (
                    <EventBox event={event} />
                  ) : null}
                  {/* <p className="text-xl">{totalGoing} / 22 going</p> */}
                </div>
              </FadeInContainer>
              <div className="flex items-stretch row-start-4 justify-stretch">
                {isSelected && (
                  <div className="flex items-end justify-center flex-grow ">
                    <TickButton
                      onClick={() => setTotalGoing(totalGoing + 1)}
                      type="success"
                    />
                    <TickButton
                      onClick={() => setTotalGoing(totalGoing - 1)}
                      type="fail"
                    />
                  </div>
                )}
              </div>
            </>
          ))
        : null}
    </div>
  );
}

export default CalendarDay;
