/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";

import { getCurrentWeek, useAddWeek, useWeeks } from "../hooks/useWeeks";

import { addDays, startOfWeek } from "../utils/calendarLogic";

import WeekView from "./WeekView";
import Loader from "../ui/Loader";
import WeekNavigator from "./WeekNavigator";
import CalendarDayPreview from "./CalendarDayPreview";
import { DayState, WeekState } from "../types/types";

function Calendar() {
  const [selectedWeek, setSelectedWeek] = useState<Date>(startOfWeek());
  const [weekData, setWeekData] = useState<WeekState | undefined>(undefined);
  const [selectedDay, setSelectedDay] = useState<DayState | null>(null);

  const { allWeeks, isLoadingWeeks, error: errorWeeks, refetch } = useWeeks();
  const { createWeek, isCreatingWeek } = useAddWeek();

  const [isPending, setIsPending] = useState(false);
  // setIsPending(isLoadingWeeks || isCreatingWeek);
  const isError = errorWeeks;

  const effectRunningRef = useRef(false);

  async function loadCurrentWeek(date: Date) {
    if (allWeeks) {
      let currWeek = getCurrentWeek(allWeeks, date);
      if (!currWeek) {
        await createWeek(date.toLocaleDateString("en-CA"));
        currWeek = getCurrentWeek(allWeeks, date);
      }
      return currWeek;
    }
  }

  useEffect(() => {
    if (selectedWeek) {
      handleLoadWeek(selectedWeek);
    }
  }, [selectedWeek, allWeeks]);

  async function handleLoadWeek(newDate: Date) {
    if (!effectRunningRef.current) {
      effectRunningRef.current = true;

      const newWeekData = allWeeks ? await loadCurrentWeek(newDate) : undefined;
      setWeekData(newWeekData);
      setSelectedDay(null);
      effectRunningRef.current = false;
    }
  }

  const handleClickWeekNavigate = async (isNext: boolean) => {
    const newDate = addDays(selectedWeek, isNext ? 7 : -7);
    await refetch();
    setSelectedWeek(newDate);
  };

  const handleDayClick = (day: DayState) => {
    setSelectedDay(day);
  };

  return (
    <>
      {isPending ? (
        <Loader />
      ) : (
        <>
          <WeekNavigator
            selectedWeek={selectedWeek}
            onClickWeekNavigate={handleClickWeekNavigate}
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

      <div className="flex items-center justify-center w-5/6 px-4 py-3 mx-auto mt-6 text-3xl transition-all text-stone-200 min-h-52">
        {selectedDay ? <CalendarDayPreview selectedDay={selectedDay} /> : null}
      </div>
    </>
  );
}

export default Calendar;
