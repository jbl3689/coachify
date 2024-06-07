import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useBreakpoint } from "use-breakpoint";
import { useQuery } from "@tanstack/react-query";

import { BREAKPOINTS } from "../../types";
import { useBookings, useWeeks } from "./useWeeks";
import { getWeeksByTeamId } from "../../services/apiTeams";
import { addWeek, findWeek } from "../../context/calendarSlice";
import { addDays, startOfWeek } from "./calendarLogic";

import CalendarDay from "./CalendarDay";
import CalendarDayPreview from "./CalendarDayPreview";

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
  const { isLoading, weeks, error } = useWeeks();

  const dispatch = useDispatch();
  const { breakpoint } = useBreakpoint(BREAKPOINTS);

  const [weekStartDate, setWeekStartDate] = useState<Date>(startOfWeek());
  const [selectedDay, setSelectedDay] = useState<DayOfWeek | null>(null);
  const [nextWeekDate, setNextWeekDate] = useState<Date | null>(null);

  const currentWeek = useSelector(findWeek(weekStartDate));
  // const nextWeek = useSelector(() =>
  //   nextWeekDate ? findWeek(nextWeekDate) : null
  // );

  const handleClickNextWeek = () => {
    const date = addDays(weekStartDate, 7);
    setNextWeekDate(date);
    setSelectedDay(null);
  };

  const handleClickPrevWeek = () => {
    const date = addDays(weekStartDate, -7);
    setNextWeekDate(date);
    setSelectedDay(null);
  };

  useEffect(() => {
    dispatch(addWeek(nextWeekDate));

    if (nextWeekDate) setWeekStartDate(nextWeekDate);
  }, [dispatch, nextWeekDate]);

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
          Week beginning on {weekStartDate.toDateString()}
        </p>
        <span
          className="pt-2 text-3xl cursor-pointer font-semiBold hover:text-slate-500"
          onClick={handleClickNextWeek}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </span>
      </div>

      <div className="grid grid-cols-7 gap-4 p-4 rounded-xl">
        {daysOfWeek.map((day) => (
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
            weekStartDate={weekStartDate}
          />
        ) : null}
      </div>
    </>
  );
}

export default Calendar;
