import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { setDayEvents } from "../../context/calendarSlice";
import { useEvents } from "../../hooks/events/useEvents";
import { dayOfWeek, dayOfWeekAbbreviations, DayState } from "../../types/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { EventsTable } from "./EventsTable";
import EventForm from "../EventForm/EventForm";
import { ContentDialog } from "../ContentDialog";

interface CalendarDayProps {
  day: DayState;
  isSelected: boolean;
  handleDayClick: (sessionNumber: number) => void;
}

function CalendarDay({ day, isSelected, handleDayClick }: CalendarDayProps) {
  const dispatch = useDispatch();

  const { events } = useEvents(day.id || 0);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const eventDate = new Date(day.date);
  const currentDate = new Date();

  // Resetting hours, minutes, seconds, and milliseconds for accurate comparison
  eventDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);
  const isToday = eventDate.getTime() === currentDate.getTime();

  useEffect(() => {
    if (events && events?.length > 0) {
      dispatch(
        setDayEvents({
          dayDate: day.date,
          events: events,
        })
      );
    }
  }, [day.date, dispatch, events]);

  const handleOpenFormDialog = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <Card
        className={`grid h-[500px] grid-rows-[1fr,4fr] gap-2 transition-all shadow-md border ${isSelected ? "border-accentBase border-2" : ""} hover:font-semibold w-11/12 mx-auto`}
      >
        <CardHeader className="text-left">
          <CardTitle
            className={`w-full ${isToday && "text-accentLight"} text-3xl font-semibold`}
          >
            {dayOfWeekAbbreviations[day.day as dayOfWeek]}
          </CardTitle>
          <CardDescription className="text-lg font-light">
            {format(new Date(day.date), "dd-MMM")}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <EventsTable
            events={events}
            onRowClick={handleDayClick}
            handleOpenDialog={handleOpenFormDialog}
          />
        </CardContent>
      </Card>

      <ContentDialog
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
      </ContentDialog>
    </>
  );
}

export default CalendarDay;
