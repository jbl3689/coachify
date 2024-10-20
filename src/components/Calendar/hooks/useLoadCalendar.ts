import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  moveWeeks,
  selectCurrentWeekDayEvents,
  setWeekDate,
} from "../../../context/calendarSlice";
import { useWeeks } from "../../../hooks/weeks/useWeeks";
import {
  DayState,
  ReduxAppState,
  ReduxEventState,
  WeekState,
} from "../../../types/types";
import { addDays, startOfWeek } from "../../../utils/calendarLogic";
import { useAddWeek } from "@/hooks/weeks/useAddWeek";
import { getCurrentWeek } from "../utils/getCurrentWeek";

interface useLoadCalendarProps {
  eventDetailsRef: React.RefObject<HTMLDivElement>;
}

const useLoadCalendar = ({ eventDetailsRef }: useLoadCalendarProps) => {
  const dispatch = useDispatch();

  const [selectedWeek, setSelectedWeek] = useState<Date>(startOfWeek());
  const [weekData, setWeekData] = useState<WeekState | undefined>(undefined);
  const [selectedDay, setSelectedDay] = useState<DayState | null>(null);
  const [selectedSessionNumber, setSelectedSessionNumber] = useState<
    number | null
  >(null);

  // finding the selected event
  const selectedDayEvents: ReduxEventState[] | undefined | null = useSelector(
    (state: ReduxAppState) =>
      selectedDay ? selectCurrentWeekDayEvents(state, selectedDay.date) : null
  );

  const selectedEvent = useMemo(() => {
    return (
      selectedDayEvents?.find(
        (event) => event.session_number === selectedSessionNumber
      ) ?? null
    );
  }, [selectedDayEvents, selectedSessionNumber]);

  // database api calls
  const { allWeeks, isLoadingWeeks, refetch } = useWeeks();
  const { createWeek, isCreatingWeek } = useAddWeek();
  const isPending = isLoadingWeeks || isCreatingWeek;

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

  async function handleLoadWeek(newDate: Date) {
    if (!effectRunningRef.current) {
      effectRunningRef.current = true;

      const newWeekData = allWeeks ? await loadCurrentWeek(newDate) : undefined;
      setWeekData(newWeekData);
      if (newWeekData) dispatch(setWeekDate(newWeekData));
      setSelectedDay(null);
      setSelectedSessionNumber(0);
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

  const handleDayClick = (day: DayState, sessionNumber?: number) => {
    setSelectedDay(day);

    setSelectedSessionNumber(sessionNumber ?? 0);
  };

  useEffect(() => {
    if (selectedWeek) {
      handleLoadWeek(selectedWeek);
    }
  }, [selectedWeek, allWeeks]);

  useEffect(() => {
    eventDetailsRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedDay]);

  return {
    isPending,
    selectedWeek,
    weekData,
    selectedDay,
    selectedEvent,
    handleClickWeekNavigate,
    handleNavigateToToday,
    handleDayClick,
  };
};

export default useLoadCalendar;
