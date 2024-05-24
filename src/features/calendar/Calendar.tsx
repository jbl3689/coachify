import { useState } from "react";

import CalendarDayPreview from "./CalendarDayPreview";
import Pill from "../../ui/Pill";
import CalendarDay from "./CalendarDay";

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

const startOfWeek = () => {
  const startOfWeek = new Date();
  const dayOfWeek = startOfWeek.getDay();
  const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  startOfWeek.setDate(startOfWeek.getDate() - diff);
  startOfWeek.setHours(0, 0, 0, 0);

  return startOfWeek;
};

function Calendar() {
  const weekStartDate = startOfWeek();
  const [selectedDay, setSelectedDay] = useState<DayOfWeek | null>(null);

  const handleDayClick = (day: DayOfWeek) => {
    console.log(day);
    setSelectedDay(day);
  };

  return (
    <>
      <p className="text-center text-accentColor font-semibold text-4xl pb-8 ">
        Week beginning on {weekStartDate.toDateString()}
      </p>
      <div className="rounded-xl grid grid-cols-7 gap-4 p-4 ">
        {daysOfWeek.map((day) => (
          <CalendarDay
            key={day.id}
            day={day}
            onClick={() => handleDayClick(day)}
          >
            {day.abbreviation === "Tue" && <Pill type="accent">Training</Pill>}
            {day.abbreviation === "Thu" && <Pill type="accent">Training</Pill>}
            {day.abbreviation === "Sat" && <Pill type="danger">Game</Pill>}
          </CalendarDay>
        ))}
      </div>
      {selectedDay ? (
        <CalendarDayPreview
          selectedDay={selectedDay}
          weekStartDate={weekStartDate}
        />
      ) : null}
    </>
  );
}

export default Calendar;
