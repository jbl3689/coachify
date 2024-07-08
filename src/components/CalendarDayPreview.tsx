import { format } from "date-fns";
import { AppState, DayState } from "../types/types";
import Button from "../ui/Button";
import { useSelector } from "react-redux";
import { selectCurrentWeekDayEvents } from "../context/calendarSlice";

interface CalendarDayPreviewProps {
  selectedDay: DayState;
}

function CalendarDayPreview({ selectedDay }: CalendarDayPreviewProps) {
  const selectedDayEvents = useSelector((state: AppState) =>
    selectCurrentWeekDayEvents(state, selectedDay.date)
  );

  console.log(selectedDayEvents);
  const isDayEmpty = selectedDayEvents && selectedDayEvents.length === 0;

  return (
    <div>
      {isDayEmpty ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <p>
            {selectedDay.day} | {format(new Date(selectedDay.date), "dd-MMM")}
          </p>
          <div className="flex gap-6 mt-2">
            <Button
              to={`/event/create?eventType=training&date=${selectedDay.date}`}
              type="secondary"
            >
              Add Training
            </Button>
            <Button
              to={`/event/create?eventType=game&date=${selectedDay.date}`}
              type="secondary"
            >
              Add Game
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
