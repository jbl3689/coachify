import { format } from "date-fns";
import { AppState, DayState, ReduxAppState } from "../types/types";
import Button from "../ui/Button";
import { useSelector } from "react-redux";
import { selectCurrentWeekDayEvents } from "../context/calendarSlice";
import EventInfo from "./EventInfo/EventInfo";

interface CalendarDayPreviewProps {
  selectedDay: DayState;
}

function CalendarDayPreview({ selectedDay }: CalendarDayPreviewProps) {
  const selectedDayEvents = useSelector((state: ReduxAppState) =>
    selectCurrentWeekDayEvents(state, selectedDay.date)
  );

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
        <EventInfo />
      )}
    </div>
  );
}

export default CalendarDayPreview;
