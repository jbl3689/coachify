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
    <div className="min-w-0">
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

      <div className="mx-auto mt-3 w-full max-w-5xl py-3" ref={eventDetailsRef}>
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
