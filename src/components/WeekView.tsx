import { useEffect, useState } from "react";
import { useBreakpoint } from "use-breakpoint";

import { BREAKPOINTS, DayState } from "../types/types";
import { addDays } from "../utils/calendarLogic";
import { getDayObject, useAddDay, useDays } from "../hooks/useDays";
import { updateWeek } from "../services/apiWeeks";

import CalendarDay from "./CalendarDay";
import Loader from "../ui/Loader";
import { useDispatch } from "react-redux";
import { setWeekDays } from "../context/calendarSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

interface WeekViewProps {
  weekData: WeekState;
  selectedDay: number;
  handleDayClick: (day: DayState) => void;
}

function WeekView({ weekData, selectedDay, handleDayClick }: WeekViewProps) {
  const dispatch = useDispatch();
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const [isPending, setIsPending] = useState(false);
  const [weekDaysData, setWeekDaysData] = useState<DayState[]>([]);
  const weekDaysLoaded = !weekDaysData.some((day) => day === undefined);

  const [visibleDays, setVisibleDays] = useState<DayState[]>([]);
  const [visibleRange, setVisibleRange] = useState<number[]>([0, 6]);

  const { createDay, isCreatingDay } = useAddDay();

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

          // @ts-expect-error I know that it isn't undefined at this point
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
        case "mobile":
          setVisibleDays(weekDaysData.slice(2, 5));
          setVisibleRange([2, 5]);
          break;
        default:
          setVisibleDays(weekDaysData);
          break;
      }
    }
  }, [weekDaysData, breakpoint]);

  const handleDayNavigate = (isNext: boolean) => {
    if (
      !visibleDays ||
      (!isNext && visibleRange[0] === 0) ||
      (isNext && visibleRange[1] === 7)
    )
      return;

    const newVisibleRange = visibleRange.map((i) => i + (isNext ? 1 : -1));
    console.log(newVisibleRange);
    setVisibleDays(weekDaysData.slice(newVisibleRange[0], newVisibleRange[1]));
    setVisibleRange(newVisibleRange);
  };
  console.log(visibleRange);
  return (
    <div className="flex flex-row">
      {breakpoint !== "desktop" && (
        <span
          className={`text-3xl font-semiBold my-auto mr-1 ${visibleRange[0] === 0 ? "text-stone-600" : "cursor-pointer hover:text-accentLight"}`}
          onClick={() => handleDayNavigate(false)}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </span>
      )}

      <div
        className={`grid grid-cols-${visibleDays.length} gap-4 py-4 rounded-xl mx-auto w-full`}
      >
        {weekDaysLoaded ? (
          visibleDays.map((day) => (
            <CalendarDay
              key={day.id}
              day={day}
              isSelected={day.id === selectedDay}
              onClick={() => handleDayClick(day)}
            />
          ))
        ) : (
          <div className="flex justify-center align-middle">
            <Loader />
          </div>
        )}
      </div>
      {breakpoint !== "desktop" && (
        <span
          className={`text-3xl font-semiBold my-auto ml-1 ${visibleRange[0] === 7 ? "text-stone-600" : "cursor-pointer hover:text-accentLight"}`}
          onClick={() => handleDayNavigate(true)}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </span>
      )}
    </div>
  );
}

export default WeekView;
