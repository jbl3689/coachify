import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { setDayEvents } from "../../context/calendarSlice";
import {
  dayOfWeek,
  dayOfWeekAbbreviations,
  DayState,
  EventState,
} from "../../types/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { EventsTable } from "./EventsTable";
import FormDialog from "../FormDialog/FormDialog";
import EventForm from "../EventForm/EventForm";

interface CalendarDayProps {
  day: DayState;
  events: EventState[] | undefined;
  isSelected: boolean;
  handleDayClick: (sessionNumber: number) => void;
}

function CalendarDay({
  day,
  events,
  isSelected,
  handleDayClick,
}: CalendarDayProps) {
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const eventDate = new Date(day.date);
  const currentDate = new Date();

  // Resetting hours, minutes, seconds, and milliseconds for accurate comparison
  eventDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);
  const isToday = eventDate.getTime() === currentDate.getTime();

  useEffect(() => {
    if (events) {
      dispatch(
        setDayEvents({
          dayDate: day.date,
          events: events,
        }),
      );
    }
  }, [day.date, dispatch, events]);

  const handleOpenFormDialog = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <Card
        className={`mx-auto grid min-h-[320px] w-full min-w-0 grid-rows-[auto,1fr] transition-colors sm:min-h-[380px] ${isSelected ? "border-primary ring-1 ring-primary" : ""}`}
      >
        <CardHeader className="border-b p-4 text-left">
          <CardTitle
            className={`w-full text-base font-semibold ${isToday ? "text-primary" : ""}`}
          >
            {dayOfWeekAbbreviations[day.day as dayOfWeek]}
          </CardTitle>
          <CardDescription className="text-sm">
            {format(new Date(day.date), "d MMM")}
          </CardDescription>
        </CardHeader>
        <CardContent className="min-h-0 overflow-y-auto p-0">
          <EventsTable
            events={events}
            onRowClick={handleDayClick}
            handleOpenDialog={handleOpenFormDialog}
          />
        </CardContent>
      </Card>

      <FormDialog
        Title={
          <div>
            <h2 className="mb-6 ">
              Add a new event for{" "}
              <span className="text-textAlt">
                {new Date(day.date).toDateString()}{" "}
              </span>
            </h2>
          </div>
        }
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      >
        <EventForm selectedDay={day} setIsDialogOpen={setIsDialogOpen} />
      </FormDialog>
    </>
  );
}

export default CalendarDay;
