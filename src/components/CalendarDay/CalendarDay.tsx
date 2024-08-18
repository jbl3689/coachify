import { format } from 'date-fns';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setDayEvents } from '../../context/calendarSlice';
import { useEvents } from '../../hooks/useEvents';
import { dayOfWeek, dayOfWeekAbbreviations, DayState } from '../../types/types';
import EventBox from '../EventBox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';

interface CalendarDayProps {
  day: DayState;
  isSelected: boolean;
  onClick: () => void;
}

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
      onClick={onClick}
      className={`grid h-[500px] grid-rows-[1fr,4fr] gap-4 transition-all shadow-md border ${isSelected ? "border-accentBase bg-bgPrimary" : "bg-secondaryBase"} hover:font-semibold w-11/12 mx-auto cursor-pointer`}
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
      <CardContent>
        {events && (
          <div className="flex flex-col gap-12 justify-normal">
            <div className="flex items-center justify-center min-h-28">
              {events?.filter((event) => event.is_morning).length > 0 ? (
                events
                  .filter((event) => event.is_morning)
                  .map((event) => (
                    <EventBox key={event.id} event={event} onClick={onClick} />
                  ))
              ) : (
                <p className="text-3xl text-textAlt"></p>
              )}
            </div>

            {/* <div className="text-sm text-left text-textAlt">- 12pm -</div> */}

            <div className="flex items-center justify-center min-h-28">
              {events?.filter((event) => !event.is_morning).length > 0 ? (
                events
                  .filter((event) => !event.is_morning)
                  .map((event) => (
                    <EventBox key={event.id} event={event} onClick={onClick} />
                  ))
              ) : (
                <p className="text-3xl text-textAlt"></p>
              )}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}

export default CalendarDay;
