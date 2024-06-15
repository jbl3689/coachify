import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useBreakpoint } from "use-breakpoint";

import { BREAKPOINTS } from "../../../types";
import { getCurrentWeek, useAddWeek, useWeeks } from "../hooks/useWeeks";
import { addDays, startOfWeek } from "../services/calendarLogic";
import CalendarDay from "./CalendarDay";
import CalendarDayPreview from "./CalendarDayPreview";

import { WeekState } from "../types";

type DayOfWeek = {
  id: number;
  abbreviation: string;
  label: string;
};

const daysOfWeek = [
  { id: 1, abbreviation: "Mon", label: "Monday" },
  { id: 2, abbreviation: "Tue", label: "Tuesday" },
  { id: 3, abbreviation: "Wed", label: "Wednesday" },
  { id: 4, abbreviation: "Thu", label: "Thursday" },
  { id: 5, abbreviation: "Fri", label: "Friday" },
  { id: 6, abbreviation: "Sat", label: "Saturday" },
  { id: 7, abbreviation: "Sun", label: "Sunday" },
];

function Calendar() {
  const { weeks, isLoading, error } = useWeeks();

  const { breakpoint } = useBreakpoint(BREAKPOINTS);

  const [currentWeekLocal, setCurrentWeekLocal] = useState<Date>(startOfWeek());
  const [currentWeek, setCurrentWeek] = useState<WeekState | undefined>(
    undefined
  );

  const [selectedDay, setSelectedDay] = useState<DayOfWeek | null>(null);

  const { mutate: createWeek, isCreating } = useAddWeek();

  const handleClickWeekButton = (isNext: boolean) => {
    const date = addDays(currentWeekLocal, isNext ? 7 : -7);
    if (weeks) {
      const currWeek = getCurrentWeek(weeks, date);
      if (!currWeek) {
        createWeek(date.toLocaleDateString("en-CA"));
        setCurrentWeek(getCurrentWeek(weeks, date));
      } else {
        setCurrentWeek(currWeek);
      }
    }
    setCurrentWeekLocal(date);
    setSelectedDay(null);
  };

  const handleDayClick = (day: DayOfWeek) => {
    setSelectedDay(day);
  };

  return (
    <>
      <div className="flex items-center justify-center gap-8 pb-8 text-primaryColor">
        <span
          className="pt-2 text-3xl cursor-pointer hover:text-slate-500 font-semiBold"
          onClick={() => handleClickWeekButton(false)}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </span>
        <p className="text-4xl font-semibold text-center text-accentColor">
          Week beginning on {currentWeekLocal.toDateString()}
        </p>
        <span
          className="pt-2 text-3xl cursor-pointer font-semiBold hover:text-slate-500"
          onClick={() => handleClickWeekButton(true)}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </span>
      </div>
      <div>{currentWeek && currentWeek.week_start_date}</div>
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
      <div className="flex items-center justify-center w-5/6 px-4 py-3 mx-auto mt-6 text-3xl transition-all text-stone-200">
        {selectedDay ? (
          <CalendarDayPreview
            selectedDay={selectedDay}
            weekStartDate={currentWeekLocal}
          />
        ) : null}
      </div>
    </>
  );
}

export default Calendar;
