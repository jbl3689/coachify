import { useState } from "react";
import Pill from "../../../ui/Pill";
import TickButton from "../../../ui/TickButton";
import { useEvents } from "../hooks/useEvents";
import { EventState } from "../types";

interface CalendarDayProps {
  day: { id: number; label: string; abbreviation: string };
  isSelected: boolean;
  onClick: () => void;
}

function CalendarDay({ day, isSelected, onClick }: CalendarDayProps) {
  const eventList = ["Tue", "Thu", "Sat"];
  const [totalGoing, setTotalGoing] = useState<number>(14);

  const { events, isLoading, error } = useEvents(
    day.abbreviation === "Tue" ? 1 : 3
  );

  const event = {
    id: 1,
    event_start_time: "18:00",
    event_end_time: "20:00",
    event_type: "Training",
    day_id: 1,
  };

  return (
    <div
      onClick={onClick}
      className="grid h-64 grid-rows-4 pt-4 text-2xl text-center transition-all border-2 rounded-t-lg shadow-md border-amber-100 text-stone-200 hover:cursor-pointer hover:font-semibold"
    >
      <div className="w-full pb-2 border-b-2">{day.abbreviation}</div>
      <div className="flex flex-col items-center justify-between w-full row-start-2 gap-2 mt-4 h-5/6">
        {events && events.length > 0
          ? events.map((event: EventState) => (
              <>
                <Pill type="secondary">{event.event_type}</Pill>
                <p className="text-xl">{totalGoing} / 22 going</p>
              </>
            ))
          : null}
      </div>

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
