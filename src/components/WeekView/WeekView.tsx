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
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useGuestMode } from "@/demo/session";
import { getEventsByDayIds } from "@/services/apiEvents";
import { EventState } from "@/types/types";

const noEvents: EventState[] = [];

interface WeekViewProps {
  weekData: WeekState;
  selectedDay: number;
  handleDayClick: (day: DayState, sessionNumber: number) => void;
}

function WeekView({ weekData, selectedDay, handleDayClick }: WeekViewProps) {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const isGuest = useGuestMode();

  const {
    handleDayNavigate,
    visibleDays,
    visibleRange,
    weekDaysLoaded,
    weekDaysData,
  } = useLoadWeekView({ weekData });
  const dayIds = weekDaysData.flatMap((day) =>
    day?.id === undefined ? [] : [day.id],
  );
  const { data: weekEvents } = useQuery({
    queryKey: ["events", isGuest ? "guest" : "live", weekData.id, dayIds],
    queryFn: () => getEventsByDayIds(dayIds),
    enabled: weekDaysLoaded && dayIds.length > 0,
  });
  const eventsByDay = useMemo(() => {
    const result = new Map<number, EventState[]>();
    for (const event of weekEvents ?? []) {
      const dayEvents = result.get(event.day_id) ?? [];
      dayEvents.push(event);
      result.set(event.day_id, dayEvents);
    }
    return result;
  }, [weekEvents]);

  return (
    <div className="flex flex-row">
      {breakpoint !== "desktop" && (
        <button
          type="button"
          aria-label="Show previous day"
          disabled={visibleRange[0] === 0}
          className="my-auto mr-1 shrink-0 p-2 text-2xl font-semibold enabled:hover:text-accentLight disabled:text-stone-600"
          onClick={() => handleDayNavigate(false)}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      )}

      <div
        className="grid w-full gap-2"
        style={{
          gridTemplateColumns: `repeat(${visibleDays.length}, minmax(0, 1fr))`,
        }}
      >
        {weekDaysLoaded && !visibleDays.some((day) => day === undefined) ? (
          visibleDays.map((day) => (
            <CalendarDay
              key={day.id}
              day={day}
              events={
                weekEvents ? (eventsByDay.get(day.id) ?? noEvents) : undefined
              }
              isSelected={day.id === selectedDay}
              handleDayClick={(sessionNumber: number) =>
                handleDayClick(day, sessionNumber)
              }
            />
          ))
        ) : (
          <div className="flex justify-center align-middle">
            <Loader />
          </div>
        )}
      </div>
      {breakpoint !== "desktop" && (
        <button
          type="button"
          aria-label="Show next day"
          disabled={visibleRange[1] === 7}
          className="my-auto ml-1 shrink-0 p-2 text-2xl font-semibold enabled:hover:text-accentLight disabled:text-stone-600"
          onClick={() => handleDayNavigate(true)}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      )}
    </div>
  );
}

export default WeekView;
