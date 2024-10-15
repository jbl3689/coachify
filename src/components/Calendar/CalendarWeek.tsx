import { useRef } from "react";

import DayDetails from "../DayDetails/DayDetails";
import Loader from "../ui/Loader";
import WeekNavigator from "../WeekNavigator";
import WeekView from "../WeekView/WeekView";
import useLoadCalendar from "./hooks/useLoadCalendar";

function Calendar() {
  const eventDetailsRef = useRef<HTMLDivElement>(null);

  const {
    selectedWeek,
    weekData,
    selectedDay,
    isPending,
    selectedSessionNumber,
    selectedEventId,
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
        className="w-4/6 px-4 py-3 mx-auto transition-all"
        ref={eventDetailsRef}
      >
        {selectedDay ? (
          <DayDetails
            selectedDay={selectedDay}
            selectedSessionNumber={selectedSessionNumber}
          />
        ) : null}
      </div>
    </div>
  );
}

export default Calendar;
