import { useRef } from "react";

import Loader from "../ui/Loader";
import WeekNavigator from "../WeekNavigator";
import WeekView from "../WeekView/WeekView";
import useLoadCalendar from "./hooks/useLoadCalendar";
import EventDetails from "../EventDetails/EventDetails";
import { useSelector } from "react-redux";
import { ReduxAppState } from "@/types/types";
import { selectCurrentWeekDayEvents } from "@/context/calendarSlice";

function Calendar() {
  const eventDetailsRef = useRef<HTMLDivElement>(null);

  const {
    selectedWeek,
    weekData,
    selectedDay,
    isPending,
    selectedSessionNumber,
    handleClickWeekNavigate,
    handleNavigateToToday,
    handleDayClick,
  } = useLoadCalendar({ eventDetailsRef });

  const selectedDayEvents = useSelector((state: ReduxAppState) =>
    selectedDay ? selectCurrentWeekDayEvents(state, selectedDay.date) : null
  );

  const selectedEvent =
    selectedDayEvents?.find(
      (event) => event.session_number === selectedSessionNumber
    ) ?? null;

  return (
    <div className="p-4 overflow-y-hidden">
      {isPending ? (
        <Loader />
      ) : (
        <>
          <WeekNavigator
            selectedWeek={selectedWeek}
            onClickWeekNavigate={handleClickWeekNavigate}
            handleNavigateToToday={handleNavigateToToday}
          />

          {weekData && (
            <WeekView
              weekData={weekData}
              selectedDay={selectedDay?.id || 0}
              handleDayClick={handleDayClick}
            />
          )}
        </>
      )}

      <div
        className="w-4/6 px-4 py-3 mx-auto transition-all"
        ref={eventDetailsRef}
      >
        {selectedDay && selectedEvent ? (
          <EventDetails
            selectedDay={selectedDay}
            selectedEvent={selectedEvent}
          />
        ) : null}
      </div>
    </div>
  );
}

export default Calendar;
