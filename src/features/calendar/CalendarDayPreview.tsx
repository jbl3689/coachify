import React from "react";
import Button from "../../ui/Button";

interface CalendarDayPreviewProps {
  selectedDay: { id: number; label: string; abbreviation: string };
  weekStartDate: Date;
}

function CalendarDayPreview({
  selectedDay,
  weekStartDate,
}: CalendarDayPreviewProps) {
  const isDayEmpty = true;
  const currentDate = weekStartDate.setDate(
    weekStartDate.getDate() + (selectedDay.id - 1)
  );

  return (
    <div className="flex justify-center items-center px-4 py-3 text-stone-200 text-3xl mt-6">
      {isDayEmpty ? (
        <div className="flex flex-col gap-4 justify-center items-center ">
          <p>
            {selectedDay.label} | {currentDate.toLocaleString()}
          </p>
          <div className="flex gap-10 mt-2">
            <Button to="/event/training/new" type="secondary">
              Create Training
            </Button>
            <Button to="/event/game/new" type="secondary">
              Create Game
            </Button>
          </div>
        </div>
      ) : (
        <div>GAME</div>
      )}
    </div>
  );
}

export default CalendarDayPreview;
