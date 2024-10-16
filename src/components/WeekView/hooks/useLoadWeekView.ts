import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useBreakpoint } from "use-breakpoint";

import { setWeekDays } from "../../../context/calendarSlice";
import { updateWeek } from "../../../services/apiWeeks";
import { BREAKPOINTS, DayState, WeekState } from "../../../types/types";
import { addDays } from "../../../utils/calendarLogic";
import { useAddDay } from "@/hooks/days/useAddDay";
import { useDays } from "@/hooks/days/useDays";
import { getDayObject } from "../utils/getDayObject";

interface LoadWeekViewProps {
  weekData: WeekState;
}

const useLoadWeekView = ({ weekData }: LoadWeekViewProps) => {
  const dispatch = useDispatch();
  const { breakpoint } = useBreakpoint(BREAKPOINTS);

  const { createDay, isCreatingDay } = useAddDay();
  const [visibleDays, setVisibleDays] = useState<DayState[]>([]);
  const [visibleRange, setVisibleRange] = useState<number[]>([0, 6]);
  const [isPending, setIsPending] = useState(isCreatingDay || false);
  const [weekDaysData, setWeekDaysData] = useState<DayState[]>([]);
  const weekDaysLoaded = !weekDaysData.some((day) => day === undefined);

  const {
    days: daysData,
    isLoading: isLoadingDays,
    error: errorDays,
    refetch,
  } = useDays(weekData.id || 0);

  async function loadDayData(date: Date) {
    if (daysData) {
      let dayObject = await getDayObject(daysData, date);

      if (weekData.is_populated) return dayObject;

      if (!dayObject) {
        createDay({
          date: date.toLocaleDateString("en-CA"),
          day: date.toLocaleDateString("en-NZ", { weekday: "long" }),
          weekId: weekData.id,
        });
        dayObject = await getDayObject(daysData, date);
      }
      return dayObject;
    }
    throw new Error("Error loading day data");
  }

  useEffect(() => {
    if (daysData && !isLoadingDays && !errorDays) {
      const fetchDays = async () => {
        setIsPending(true);
        try {
          const date = new Date(weekData.week_start_date);
          const results = Array.from({ length: 7 }, (_, i) =>
            loadDayData(addDays(date, i))
          );

          const weekDaysData = await Promise.all(results);

          // @ts-expect-error I know that it isn't undefined by this point
          setWeekDaysData(weekDaysData);
          dispatch(setWeekDays(weekDaysData));

          setIsPending(false);
        } catch (error) {
          console.error("Error loading week days data:", error);
          setIsPending(false);
        }
      };

      fetchDays();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weekData, daysData]);

  useEffect(() => {
    if (daysData && daysData.length === 7) {
      updateWeek({
        weekId: weekData.id,
        weekData: { ...weekData, is_populated: true },
      });
    }
  }, [weekData, daysData]);

  useEffect(() => {
    if (weekData?.id) {
      refetch();
    }
  }, [weekData?.id, refetch]);

  useEffect(() => {
    if (weekDaysData !== undefined) {
      switch (breakpoint) {
        case "desktop":
          setVisibleDays(weekDaysData);
          setVisibleRange([0, 7]);
          break;
        case "tablet":
          setVisibleDays(weekDaysData.slice(1, 6));
          setVisibleRange([1, 6]);
          break;
        case "mobileLarge":
          setVisibleDays(weekDaysData.slice(2, 5));
          setVisibleRange([2, 5]);
          break;
        case "mobile":
          setVisibleDays(weekDaysData.slice(3, 4));
          setVisibleRange([3, 4]);
          break;
        default:
          setVisibleDays(weekDaysData);
          break;
      }
    }
  }, [weekDaysData, breakpoint]);

  console.log(breakpoint);

  const handleDayNavigate = (isNext: boolean) => {
    if (
      !visibleDays ||
      (!isNext && visibleRange[0] === 0) ||
      (isNext && visibleRange[1] === 7)
    )
      return;

    const newVisibleRange = visibleRange.map((i) => i + (isNext ? 1 : -1));
    setVisibleDays(weekDaysData.slice(newVisibleRange[0], newVisibleRange[1]));
    setVisibleRange(newVisibleRange);
  };

  return {
    visibleDays,
    visibleRange,
    weekDaysLoaded,
    isPending,
    handleDayNavigate,
  };
};

export default useLoadWeekView;
