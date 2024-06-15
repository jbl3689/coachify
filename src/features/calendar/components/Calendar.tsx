import { useEffect, useState } from "react";

import { getCurrentWeek, useAddWeek, useWeeks } from "../hooks/useWeeks";
import { addDays, startOfWeek } from "../services/calendarLogic";
import CalendarDayPreview from "./CalendarDayPreview";

import { WeekState } from "../types";
import WeekView from "./WeekView";
import WeekNavigator from "./WeekNavigator";
import { useDays } from "../hooks/useDays";

type DayOfWeek = {
  id: number;
  abbreviation: string;
  label: string;
};

function Calendar() {
  const [selectedWeek, setSelectedWeek] = useState<Date>(startOfWeek());

  // DATABASE STUFF
  const { weeks, isLoading: isLoadingWeeks, error: errorWeeks } = useWeeks();
  const loadCurrentWeek = (date: Date) => {
    if (weeks) {
      const currWeek = getCurrentWeek(weeks, date);

      if (!currWeek) {
        createWeek(date.toLocaleDateString("en-CA"));
        return getCurrentWeek(weeks, date);
      } else {
        return currWeek;
      }
    }
  };
  const [weekData, setWeekData] = useState<WeekState | undefined>(
    loadCurrentWeek(selectedWeek)
  );

  const {
    days,
    isLoading: isLoadingDays,
    error: errorDays,
  } = useDays(weekData?.id || 0);
  const isPending = isLoadingWeeks || isLoadingDays;
  const isError = errorWeeks || errorDays;

  const [selectedDay, setSelectedDay] = useState<DayOfWeek | null>(null);

  const { mutate: createWeek, isCreating } = useAddWeek();

  useEffect(() => {
    console.log(weekData);
    if (weekData) {
      console.log(days);
    }
  }, [weekData, days]);

  const handleClickWeekNavigate = (isNext: boolean) => {
    const date = addDays(selectedWeek, isNext ? 7 : -7);
    if (weeks) {
      setWeekData(loadCurrentWeek(date));
    }
    setSelectedWeek(date);
    setSelectedDay(null);
  };

  const handleDayClick = (day: DayOfWeek) => {
    setSelectedDay(day);
  };

  return (
    <>
      <WeekNavigator
        selectedWeek={selectedWeek}
        onClickWeekNavigate={handleClickWeekNavigate}
      />

      <WeekView selectedDay={selectedDay} handleDayClick={handleDayClick} />

      <div className="flex items-center justify-center w-5/6 px-4 py-3 mx-auto mt-6 text-3xl transition-all text-stone-200">
        {selectedDay ? (
          <CalendarDayPreview
            selectedDay={selectedDay}
            weekStartDate={selectedWeek}
          />
        ) : null}
      </div>
    </>
  );
}

export default Calendar;
