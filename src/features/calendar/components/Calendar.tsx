import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useBreakpoint } from "use-breakpoint";

import { BREAKPOINTS } from "../../../types";
import { getCurrentWeek, useWeeks } from "../hooks/useWeeks";
import { addDays, startOfWeek } from "../services/calendarLogic";
import { addWeek } from "../context/calendarSlice";
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
  console.log(weeks);

  const dispatch = useDispatch();
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  console.log(breakpoint);

  const [currWeekStartDate, setCurrWeekStartDate] =
    useState<Date>(startOfWeek());
  const [currWeekObject, setCurrWeekObject] = useState<WeekState | undefined>(
    undefined
  );

  const [selectedDay, setSelectedDay] = useState<DayOfWeek | null>(null);
  const [nextWeekDate, setNextWeekDate] = useState<Date | null>(null);

  useEffect(() => {
    console.log(
      `useEffect (currWeekStartDate && weeks): ${currWeekStartDate} | ${weeks?.at(0).week_start_date}`
    );
    if (currWeekStartDate && weeks) {
      setCurrWeekObject(getCurrentWeek(weeks, currWeekStartDate));
      console.log(`currWeekObject: ${currWeekObject}`);
    }
  }, [currWeekStartDate, weeks]);

  useEffect(() => {
    dispatch(addWeek(nextWeekDate));

    if (nextWeekDate) setCurrWeekStartDate(nextWeekDate);
  }, [dispatch, nextWeekDate]);

  const handleClickNextWeek = () => {
    const date = addDays(currWeekStartDate, 7);
    setNextWeekDate(date);
    setSelectedDay(null);
  };

  const handleClickPrevWeek = () => {
    const date = addDays(currWeekStartDate, -7);
    setNextWeekDate(date);
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
          onClick={handleClickPrevWeek}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </span>
        <p className="text-4xl font-semibold text-center text-accentColor">
          Week beginning on {currWeekStartDate.toDateString()}
        </p>
        <span
          className="pt-2 text-3xl cursor-pointer font-semiBold hover:text-slate-500"
          onClick={handleClickNextWeek}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </span>
      </div>

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
            weekStartDate={currWeekStartDate}
          />
        ) : null}
      </div>
    </>
  );
}

export default Calendar;
