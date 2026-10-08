import { useRef } from "react";

import Loader from "../ui/Loader";
import WeekNavigator from "../WeekNavigator";
import WeekView from "../WeekView/WeekView";
import useLoadCalendar from "./hooks/useLoadCalendar";
import EventDetails from "../EventDetails/EventDetails";

export const Calendar = () => {
  const eventDetailsRef = useRef<HTMLDivElement>(null);

  const {
    selectedWeek,
    weekData,
    selectedDay,
    isPending,
    selectedEvent,
    setSelectedDay,
    handleClickWeekNavigate,
    handleNavigateToToday,
    handleDayClick,
  } = useLoadCalendar({ eventDetailsRef });

  return (
    <div className="min-w-0 p-2 sm:p-4">
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
        className="mx-auto w-full max-w-2xl px-0 py-3 transition-all sm:px-4"
        ref={eventDetailsRef}
      >
        {selectedDay && selectedEvent ? (
          <EventDetails
            selectedDay={selectedDay}
            selectedEvent={selectedEvent}
            setSelectedDay={setSelectedDay}
          />
        ) : null}
      </div>
    </div>
  );
};
