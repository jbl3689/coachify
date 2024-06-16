import { useEffect, useState } from "react";

import { DayState, WeekState } from "../types";
import { getCurrentWeek, useAddWeek, useWeeks } from "../hooks/useWeeks";
import {
  useDays as fetchDays,
  getDayObject,
  useAddDay,
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

  const [daysData, setDaysData] = useState<DayState[] | undefined>([]);
  const [isLoadingDays, setIsLoadingDays] = useState(false);
  const [errorDays, setErrorDays] = useState<Error | null>(null);

  const { weeks, isLoadingWeeks, error: errorWeeks } = useWeeks();
  const { createWeek, isCreatingWeek } = useAddWeek();
  const { createDay, isCreatingDay } = useAddDay();

  // const { days, isLoadingDays, error: errorDays } = useDays(weekData?.id || 0);

  const isPending =
    isLoadingWeeks || isLoadingDays || isCreatingWeek | isCreatingDay;
  const isError = errorWeeks || errorDays;

  async function loadCurrentWeek(date: Date) {
    if (weeks) {
      let currWeek = getCurrentWeek(weeks, date);
      if (!currWeek) {
        await createWeek(date.toLocaleDateString("en-CA"));
        currWeek = getCurrentWeek(weeks, date);
      }
      return currWeek;
    }
  }

  async function loadDayData(date: Date) {
    if (weekData && daysData) {
      let dayObject = getDayObject(daysData, date);
      if (!dayObject) {
        await createDay(date.toLocaleDateString("en-CA"));
        dayObject = getDayObject(daysData, date);
      }
      return currWeek;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const week = await loadCurrentWeek(selectedWeek);
      setWeekData(week);
    };
    fetchData();
  }, [selectedWeek, weeks]);

  useEffect(() => {
    const fetchDaysData = async () => {
      if (weekData) {
        setIsLoadingDays(true);
        try {
          console.log(`Fetching days for week: ${weekData.id}`);
          const { days, isLoading, error } = fetchDays(weekData.id);
          setDaysData(days);
          setIsLoadingDays(isLoading);
          setErrorDays(error);
        } catch (error) {
          // setErrorDays(error);
          setIsLoadingDays(false);
        }
      }
    };
    fetchDaysData();
  }, [weekData]);

  useEffect(() => {
    if (weekData) {
      console.log(`Data & Days: ${weekData.week_start_date}, ${daysData}`);
    }
  }, [weekData, daysData]);

  const handleClickWeekNavigate = async (isNext: boolean) => {
    const newDate = addDays(selectedWeek, isNext ? 7 : -7);
    const newWeekData = weeks ? await loadCurrentWeek(newDate) : undefined;
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
