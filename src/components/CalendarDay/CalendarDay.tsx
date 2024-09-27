import { format } from "date-fns";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setDayEvents } from "../../context/calendarSlice";
import { useEvents } from "../../hooks/events/useEvents";
import { dayOfWeek, dayOfWeekAbbreviations, DayState } from "../../types/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/Table";
import { FlexBox } from "../ui/FlexBox";
import EventDetailsBox from "../EventDetailsBox/EventDetailsBox";

interface CalendarDayProps {
  day: DayState;
  isSelected: boolean;
  onClick: (sessionNumber: number) => void;
}

export const daySessionNumbers = [1, 2, 3];

function CalendarDay({ day, isSelected, onClick }: CalendarDayProps) {
  const dispatch = useDispatch();

  const { events } = useEvents(day.id || 0);

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

  return (
    <Card
      className={`grid h-[500px] grid-rows-[1fr,4fr] gap-2 transition-all shadow-md border ${isSelected ? "border-accentBase bg-bgPrimary" : "bg-secondaryBase"} hover:font-semibold w-11/12 mx-auto`}
    >
      <CardHeader className="text-left">
        <CardTitle
          className={`w-full ${isToday ? "text-accentLight" : "text-textBase"} text-3xl font-semibold`}
        >
          <div>{dayOfWeekAbbreviations[day.day as dayOfWeek]}</div>
        </CardTitle>
        <CardDescription className="text-lg font-light">
          <div>{format(new Date(day.date), "dd-MMM")}</div>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <FlexBox container flexDirection="column">
          <Table className="overflow-hidden">
            {/* <TableCaption>{format(new Date(day.date), "dd-MMM")}</TableCaption> */}
            <TableHeader className="bg-[#305c57]">
              <TableRow>
                <TableHead>Sessions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {daySessionNumbers.map((number) => {
                const event = events?.find(
                  (event) => event.session_number === number
                );

                return (
                  <TableRow
                    key={number}
                    onClick={() => onClick(number)}
                    className="cursor-pointer"
                  >
                    <TableCell className="px-0 py-2">
                      <div className="h-full min-h-[5rem]">
                        {event && (
                          <EventDetailsBox
                            key={event.id}
                            event={event}
                            sessionNumber={number}
                          />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </FlexBox>
      </CardContent>
      <CardFooter className="text-textAlt mx-auto text-xs py-1 px-0">
        click a session to view details
      </CardFooter>
    </Card>
  );
}

export default CalendarDay;
