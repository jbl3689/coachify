import { useBreakpoint } from "use-breakpoint";
import { BREAKPOINTS } from "../../../types";
import CalendarDay from "./CalendarDay";

const daysOfWeek = [
  { id: 1, abbreviation: "Mon", label: "Monday" },
  { id: 2, abbreviation: "Tue", label: "Tuesday" },
  { id: 3, abbreviation: "Wed", label: "Wednesday" },
  { id: 4, abbreviation: "Thu", label: "Thursday" },
  { id: 5, abbreviation: "Fri", label: "Friday" },
  { id: 6, abbreviation: "Sat", label: "Saturday" },
  { id: 7, abbreviation: "Sun", label: "Sunday" },
];

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
