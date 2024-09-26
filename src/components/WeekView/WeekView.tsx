import { useBreakpoint } from "use-breakpoint";

import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { BREAKPOINTS, DayState, WeekState } from "../../types/types";
import CalendarDay from "../CalendarDay/CalendarDay";
import Loader from "../ui/Loader";
import useLoadWeekView from "./hooks/useLoadWeekView";

interface WeekViewProps {
  weekData: WeekState;
  selectedDay: number;
  handleDayClick: (day: DayState) => void;
}

function WeekView({ weekData, selectedDay, handleDayClick }: WeekViewProps) {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);

  const { handleDayNavigate, visibleDays, visibleRange, weekDaysLoaded } =
    useLoadWeekView({ weekData });

  return (
    <div className="flex flex-row">
      {breakpoint !== "desktop" && (
        <span
          className={`text-3xl font-semiBold my-auto mr-1 ${visibleRange[0] === 0 ? "text-stone-600" : "cursor-pointer hover:text-accentLight"}`}
          onClick={() => handleDayNavigate(false)}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </span>
      )}

      <div
        className={`grid grid-rows-${visibleDays.length} grid-flow-col gap-2 py-4 rounded-xl mx-auto w-full`}
      >
        {weekDaysLoaded && visibleDays ? (
          visibleDays.map((day) => (
            <CalendarDay
              key={day.id}
              day={day}
              isSelected={day.id === selectedDay}
              onClick={() => handleDayClick(day)}
            />
          ))
        ) : (
          <div className="flex justify-center align-middle">
            <Loader />
          </div>
        )}
      </div>
      {breakpoint !== "desktop" && (
        <span
          className={`text-3xl font-semiBold my-auto ml-1 ${visibleRange[0] === 7 ? "text-stone-600" : "cursor-pointer hover:text-accentLight"}`}
          onClick={() => handleDayNavigate(true)}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </span>
      )}
    </div>
  );
}

export default WeekView;
