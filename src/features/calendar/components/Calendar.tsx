import { useEffect, useState } from "react";

import { DayState, WeekState, daysOfWeek } from "../types";
import { getCurrentWeek, useAddWeek, useWeeks } from "../hooks/useWeeks";
import {
  useDays as fetchDays,
  getDayObject,
  useAddDay,
  useDays,
} from "../hooks/useDays";
import { addDays, startOfWeek } from "../services/calendarLogic";

import CalendarDayPreview from "./CalendarDayPreview";
import WeekView from "./WeekView";
import WeekNavigator from "./WeekNavigator";
import Loader from "../../../ui/Loader";

type DayOfWeek = {
  id: number;
  abbreviation: string;
  label: string;
};

function Calendar() {
  const [selectedWeek, setSelectedWeek] = useState<Date>(startOfWeek());
  const [weekData, setWeekData] = useState<WeekState | undefined>(undefined);
  const [selectedDay, setSelectedDay] = useState<DayOfWeek | null>(null);
  const [weekDaysData, setWeekDaysData] = useState<DayState[]>([]);

  const { allWeeks, isLoadingWeeks, error: errorWeeks } = useWeeks();
  const { createWeek, isCreatingWeek } = useAddWeek();

  const isPending = isLoadingWeeks || isCreatingWeek;
  const isError = errorWeeks;

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
    const fetchWeek = async () => {
      if (isPending || !allWeeks) {
        return;
      }

      try {
        const week = await loadCurrentWeek(selectedWeek);
        if (!week) {
          return;
        }
        setWeekData(week);
      } catch (error) {
        console.error("Error loading weeks:", error);
      }
    };
    fetchWeek();
  }, [selectedWeek, isPending, allWeeks]);

  const handleClickWeekNavigate = async (isNext: boolean) => {
    const newDate = addDays(selectedWeek, isNext ? 7 : -7);
    const newWeekData = allWeeks ? await loadCurrentWeek(newDate) : undefined;
    setSelectedWeek(newDate);
    setWeekData(newWeekData);
    setSelectedDay(null);
  };

  const handleDayClick = (day: DayOfWeek) => {
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

          <WeekView
            weekData={weekData}
            selectedDay={selectedDay}
            handleDayClick={handleDayClick}
          />
        </>
      )}

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
