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
    setSelectedDay(day);
  };

  return (
    <>
      <p className="pb-8 text-4xl font-semibold text-center text-accentColor">
        Week beginning on {weekStartDate.toDateString()}
      </p>
      <div className="grid grid-cols-7 gap-4 p-4 rounded-xl">
        {daysOfWeek.map((day) => (
          <CalendarDay
            key={day.id}
            day={day}
            onClick={() => handleDayClick(day)}
          />
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
