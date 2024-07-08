import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useDispatch } from "react-redux";

import { setDayEvents } from "../context/calendarSlice";
import { useEvents } from "../hooks/useEvents";
import { DayState, EventState } from "../types/types";

import TickButton from "../ui/TickButton";
import FadeInContainer from "../ui/FadeInContainer";
import Pill from "../ui/Pill";

interface CalendarDayProps {
  day: DayState;
  isSelected: boolean;
  onClick: () => void;
}

function CalendarDay({ day, isSelected, onClick }: CalendarDayProps) {
  const dispatch = useDispatch();
  const [totalGoing, setTotalGoing] = useState<number>(14);

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
      className="grid h-64 grid-rows-4 pt-4 text-2xl text-center transition-all border-2 rounded-t-lg shadow-md border-amber-100 text-stone-200 hover:cursor-pointer hover:font-semibold"
    >
      <div>
        <div className="w-full pb-1 ">{day.day}</div>
        <div className="w-full pb-1 font-light border-b-2 text-md">
          {format(new Date(day.date), "dd-MMM")}
        </div>
      </div>

      {!isLoading && events && events.length > 0
        ? events.map((event: EventState) => (
            <FadeInContainer key={event.id}>
              <div
                className="flex flex-col items-center justify-between w-full row-start-2 gap-2 pt-8 h-5/6"
                key={event.id}
              >
                <Pill
                  type={
                    event.event_type === "Training" ? "secondary" : "accent"
                  }
                >
                  {event.event_type}
                </Pill>
                <p className="text-xl">{totalGoing} / 22 going</p>
              </div>
            </FadeInContainer>
          ))
        : null}

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
    </div>
  );
}

export default CalendarDay;
