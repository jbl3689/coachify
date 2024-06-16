import { useBreakpoint } from "use-breakpoint";
import { BREAKPOINTS } from "../../../types";
import CalendarDay from "./CalendarDay";
import { daysOfWeek } from "../types";

type DayOfWeek = {
  id: number;
  abbreviation: string;
  label: string;
};

interface WeekViewProps {
  selectedDay: DayOfWeek | null;
  handleDayClick: (day: DayOfWeek) => void;
}

function WeekView({ selectedDay, handleDayClick }: WeekViewProps) {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);

  return (
    <div className="grid grid-cols-7 gap-4 p-4 rounded-xl">
      {breakpoint !== "desktop"
        ? daysOfWeek.map((day) => (
            <CalendarDay
              key={day.id}
              day={day}
              isSelected={selectedDay?.id === day.id}
              onClick={() => handleDayClick(day)}
            />
          ))
        : daysOfWeek.map((day) => (
            <CalendarDay
              key={day.id}
              day={day}
              isSelected={selectedDay?.id === day.id}
              onClick={() => handleDayClick(day)}
            />
          ))}
    </div>
  );
}

export default WeekView;
