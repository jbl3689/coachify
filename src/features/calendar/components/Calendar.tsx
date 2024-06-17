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
  const [weekDaysData, setWeekDaysData] = useState<DayState[] | undefined>(
    undefined
  );

  const { allWeeks, isLoadingWeeks, error: errorWeeks } = useWeeks();
  const { createWeek, isCreatingWeek } = useAddWeek();
  const { createDay, isCreatingDay } = useAddDay();

  const {
    days: daysData,
    isLoading: isLoadingDays,
    error: errorDays,
  } = useDays(weekData?.id || 0);

  const isPending =
    isLoadingWeeks || isLoadingDays || isCreatingWeek || isCreatingDay;
  const isError = errorWeeks || errorDays;

  async function loadCurrentWeek(date: Date) {
    console.log(allWeeks);
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
      try {
        const week = await loadCurrentWeek(selectedWeek);
        setWeekData(week);
      } catch (error) {
        console.error("Error loading weeks:", error);
      }
    };
    fetchWeek();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWeek, allWeeks]);

  async function loadDayData(date: Date) {
    if (weekData && daysData) {
      let dayObject = await getDayObject(daysData, date);
      console.log(`DayObject: ${dayObject?.date} for Date: ${date}`);
      if (!dayObject) {
        console.log("WHY ARE WE HERE");
        await createDay({
          date: date.toLocaleDateString("en-CA"),
          weekId: weekData.id,
        });
        dayObject = await getDayObject(daysData, date);
      }
      return dayObject;
    }
  }

  useEffect(() => {
    if (weekData) {
      const fetchDays = async () => {
        try {
          const results = Array.from({ length: 7 }, (_, i) =>
            loadDayData(addDays(selectedWeek, i))
          );

          const weekDaysData = await Promise.all(results);
          console.log("results:", weekDaysData);
        } catch (error) {
          console.error("Error loading week days data:", error);
        }
      };

      fetchDays();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weekData]);

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

          <WeekView selectedDay={selectedDay} handleDayClick={handleDayClick} />
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
