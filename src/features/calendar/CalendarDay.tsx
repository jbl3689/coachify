import { useState } from "react";
import Pill from "../../ui/Pill";
import TickButton from "../../ui/TickButton";

interface CalendarDayProps {
  day: { id: number; label: string; abbreviation: string };
  onClick: () => void;
}

function CalendarDay({ day, onClick }: CalendarDayProps) {
  const eventList = ["Tue", "Thu", "Sat"];
  const [totalGoing, setTotalGoing] = useState<number>(14);

  return (
    <div
      onClick={onClick}
      className="flex flex-col justify-start h-64 py-4 text-2xl text-center transition-all border-2 rounded-lg shadow-md w-42 border-amber-100 text-stone-200 hover:cursor-pointer hover:w-44 hover:h-58 hover:font-semibold"
    >
      <div className="w-full pb-2 border-b-2">{day.abbreviation}</div>
      <div className="flex flex-col items-center justify-center w-full gap-2 border-t h-5/6">
        {day.abbreviation === "Tue" && <Pill type="secondary">Training</Pill>}
        {day.abbreviation === "Thu" && (
          <>
            <Pill type="secondary">Training</Pill>
            <p className="text-xl">{totalGoing} / 22 going</p>
            <div>
              <TickButton
                onClick={() => setTotalGoing(totalGoing + 1)}
                type="success"
              />
              or{" "}
              <TickButton
                onClick={() => setTotalGoing(totalGoing - 1)}
                type="fail"
              />
            </div>
          </>
        )}
        {day.abbreviation === "Sat" && <Pill type="danger">Game</Pill>}
      </div>
    </div>
  );
}

export default CalendarDay;
