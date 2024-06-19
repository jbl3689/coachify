import { useBreakpoint } from "use-breakpoint";
import { BREAKPOINTS } from "../../../types";
import CalendarDay from "./CalendarDay";
import { WeekState, daysOfWeek } from "../types";
import { getDayObject, useAddDay, useDays } from "../hooks/useDays";
import { useEffect, useState } from "react";
import { addDays } from "../services/calendarLogic";
import { updateWeek } from "../services/apiWeeks";

type DayOfWeek = {
  id: number;
  abbreviation: string;
  label: string;
};

interface WeekViewProps {
  weekData: WeekState | undefined;
  selectedDay: DayOfWeek | null;
  handleDayClick: (day: DayOfWeek) => void;
}

function WeekView({ weekData, selectedDay, handleDayClick }: WeekViewProps) {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const [isPending, setIsPending] = useState(false);

  const { createDay, isCreatingDay } = useAddDay();

  const {
    days: daysData,
    isLoading: isLoadingDays,
    error: errorDays,
  } = useDays(weekData?.id || 0);

  useEffect(() => {
    console.log(`isLoadingDays: ${isLoadingDays} isPending: ${isPending}`);
  }, [isLoadingDays, isPending]);

  async function loadDayData(date: Date) {
    if (weekData && daysData && !isLoadingDays && !errorDays) {
      let dayObject = await getDayObject(daysData, date);

      if (weekData.is_populated) return dayObject;

      if (!dayObject) {
        console.log(`DAY NOT FOUND FOR DATE: ${date}`);

        await createDay({
          date: date.toLocaleDateString("en-CA"),
          day: date.toLocaleDateString("en-NZ", { weekday: "long" }),
          weekId: weekData.id,
        });
        dayObject = await getDayObject(daysData, date);
      }
      return dayObject;
    }
  }

  useEffect(() => {
    if (weekData && !isPending) {
      const fetchDays = async () => {
        setIsPending(true);
        try {
          const date = new Date(weekData.week_start_date);
          const results = Array.from({ length: 7 }, (_, i) =>
            loadDayData(addDays(date, i))
          );

          const weekDaysData = await Promise.all(results);

          console.log("results:", JSON.stringify(weekDaysData, null, 2));

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
    if (weekData && daysData && daysData.length === 7) {
      updateWeek({
        weekId: weekData.id,
        weekData: { ...weekData, is_populated: true },
      });
    }
  }, [weekData, daysData]);

  return (
    <div className="grid grid-cols-7 gap-4 p-4 rounded-xl">
      {breakpoint !== "desktop"
        ? daysOfWeek.map((day) => (
            <CalendarDay
              key={day.id}
              day={day}
              isSelected={selectedDay?.id === day.id}
              onClick={() => handleDayClick(day)}
            />
          ))
        : daysOfWeek.map((day) => (
            <CalendarDay
              key={day.id}
              day={day}
              isSelected={selectedDay?.id === day.id}
              onClick={() => handleDayClick(day)}
            />
          ))}
    </div>
  );
}

export default WeekView;
