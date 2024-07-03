import { useBreakpoint } from "use-breakpoint";
import { BREAKPOINTS } from "../types/types";
import CalendarDay from "./CalendarDay";
import { DayState, WeekState, daysOfWeek } from "../features/calendar/types";
import { getDayObject, useAddDay, useDays } from "../hooks/useDays";
import { useEffect, useState } from "react";
import { addDays } from "../utils/calendarLogic";
import { updateWeek } from "../services/apiWeeks";
import Loader from "../ui/Loader";

type DayOfWeek = {
  id: number;
  abbreviation: string;
  label: string;
};

interface WeekViewProps {
  weekData: WeekState;
  selectedDay: number;
  handleDayClick: (day: DayState) => void;
}

function WeekView({ weekData, selectedDay, handleDayClick }: WeekViewProps) {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const [isPending, setIsPending] = useState(false);
  const [weekDaysData, setWeekDaysData] = useState<DayState[]>([]);
  const weekDaysLoaded = !weekDaysData.some((day) => day === undefined);

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

          // @ts-expect-error abc
          setWeekDaysData(weekDaysData);

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

  return (
    <div className="grid grid-cols-7 gap-4 p-4 rounded-xl">
      {weekDaysLoaded ? (
        weekDaysData.map((day) => (
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
  );
}

export default WeekView;
