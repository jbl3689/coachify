import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addDays, startOfWeek } from "../../../utils/calendarLogic";
import { DayState, WeekState } from "../../../types/types";
import { getCurrentWeek, useAddWeek, useWeeks } from "../../../hooks/useWeeks";
import { moveWeeks, setWeekDate } from "../../../context/calendarSlice";

interface useLoadCalendarProps {
  eventDetailsRef: React.RefObject<HTMLDivElement>;
}

const useLoadCalendar = ({ eventDetailsRef }: useLoadCalendarProps) => {
  const dispatch = useDispatch();

  const [selectedWeek, setSelectedWeek] = useState<Date>(startOfWeek());
  const [weekData, setWeekData] = useState<WeekState | undefined>(undefined);
  const [selectedDay, setSelectedDay] = useState<DayState | null>(null);

  const { allWeeks, isLoadingWeeks, error: errorWeeks, refetch } = useWeeks();
  const { createWeek, isCreatingWeek } = useAddWeek();

  const isPending = isLoadingWeeks || isCreatingWeek;

  const effectRunningRef = useRef(false);

  useEffect(() => {
    if (selectedWeek) {
      handleLoadWeek(selectedWeek);
    }
  }, [selectedWeek, allWeeks]);

  useEffect(() => {
    eventDetailsRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedDay]);

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

  async function handleLoadWeek(newDate: Date) {
    if (!effectRunningRef.current) {
      effectRunningRef.current = true;

      const newWeekData = allWeeks ? await loadCurrentWeek(newDate) : undefined;
      setWeekData(newWeekData);
      if (newWeekData) dispatch(setWeekDate(newWeekData));
      setSelectedDay(null);
      effectRunningRef.current = false;
    }
  }

  const handleClickWeekNavigate = async (isNext: boolean) => {
    const newDate = addDays(selectedWeek, isNext ? 7 : -7);
    await refetch();
    setSelectedWeek(newDate);
    dispatch(moveWeeks(isNext ? 1 : -1));
  };

  const handleNavigateToToday = async () => {
    setSelectedWeek(startOfWeek());
    await refetch();
    dispatch(setWeekDate(startOfWeek()));
  };

  const handleDayClick = (day: DayState) => {
    if (selectedDay?.id === day.id) {
      setSelectedDay(null);
    } else setSelectedDay(day);
  };

  return {
    isPending,
    selectedWeek,
    weekData,
    selectedDay,
    handleClickWeekNavigate,
    handleNavigateToToday,
    handleDayClick,
  };
};

export default useLoadCalendar;
