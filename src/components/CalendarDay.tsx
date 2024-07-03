import { useEffect, useState } from "react";
import Pill from "../ui/Pill";
import TickButton from "../ui/TickButton";
import { useEvents } from "../hooks/useEvents";
import { DayState, EventState } from "../features/calendar/types";
import { format } from "date-fns";

interface CalendarDayProps {
  day: DayState;
  isSelected: boolean;
  onClick: () => void;
}

function CalendarDay({ day, isSelected, onClick }: CalendarDayProps) {
  const [totalGoing, setTotalGoing] = useState<number>(14);

  const { events, isLoading, error, refetch } = useEvents(day.id || 0);

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
            <div
              className="flex flex-col items-center justify-between w-full row-start-2 gap-2 pt-8 h-5/6"
              key={event.id}
            >
              <Pill
                type={event.event_type === "Training" ? "secondary" : "accent"}
              >
                {event.event_type}
              </Pill>
              <p className="text-xl">{totalGoing} / 22 going</p>
            </div>
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
