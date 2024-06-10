import Button from "../../../ui/Button";

interface CalendarDayPreviewProps {
  selectedDay: { id: number; label: string; abbreviation: string };
  weekStartDate: Date;
}

function getDateFromStartOfWeek(startOfWeek: Date, dayIndex: number): Date {
  const daysToAdd = dayIndex - startOfWeek.getDay();
  const currentDate = new Date(startOfWeek);
  currentDate.setDate(startOfWeek.getDate() + daysToAdd);
  return currentDate;
}

function CalendarDayPreview({
  selectedDay,
  weekStartDate,
}: CalendarDayPreviewProps) {
  const isDayEmpty = selectedDay.abbreviation !== "Sat";
  const currentDate = getDateFromStartOfWeek(weekStartDate, selectedDay.id);

  return (
    <div>
      {isDayEmpty ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <p>
            {selectedDay.label} |{" "}
            {currentDate.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </p>
          <div className="flex gap-10 mt-2">
            <Button
              to={`/event/create?eventType=training&date=${currentDate.toISOString()}`}
              type="secondary"
            >
              Create Training
            </Button>
            <Button
              to={`/event/create?eventType=game&date=${currentDate.toISOString()}`}
              type="secondary"
            >
              Create Game
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-4/6 gap-2 text-2xl text-center border border-white rounded-md min-h-32 h-3/5">
          <div className="w-full border-b border-white bg-secondaryColor">
            Warm-up
          </div>
          <div className="flex items-center justify-center w-full h-8 border-b border-white bg-secondaryLightColor">
            Rondo's
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarDayPreview;
