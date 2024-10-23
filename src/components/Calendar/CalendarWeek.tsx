import { useRef } from "react";

import Loader from "../ui/Loader";
import WeekNavigator from "../WeekNavigator";
import WeekView from "../WeekView/WeekView";
import useLoadCalendar from "./hooks/useLoadCalendar";
import EventDetails from "../EventDetails/EventDetails";

function Calendar() {
  const eventDetailsRef = useRef<HTMLDivElement>(null);

  const {
    selectedWeek,
    weekData,
    selectedDay,
    isPending,
    selectedEvent,
    handleClickWeekNavigate,
    handleNavigateToToday,
    handleDayClick,
  } = useLoadCalendar({ eventDetailsRef });

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
        className="w-2/5 px-4 py-2 mx-auto transition-all"
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
