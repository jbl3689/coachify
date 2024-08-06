import { format } from 'date-fns';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setDayEvents } from '../../context/calendarSlice';
import { useEvents } from '../../hooks/useEvents';
import { dayOfWeek, dayOfWeekAbbreviations, DayState } from '../../types/types';
import EventBox from '../EventBox';

interface CalendarDayProps {
  day: DayState;
  isSelected: boolean;
  onClick: () => void;
}

function CalendarDay({ day, isSelected, onClick }: CalendarDayProps) {
  const dispatch = useDispatch();

  const { events, isLoading, error, refetch } = useEvents(day.id || 0);

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
    <div
      onClick={onClick}
      className={`grid h-[500px] grid-rows-[1fr,4fr] gap-4 p-2 text-2xl transition-all rounded-md shadow-md border ${isSelected ? "border-accentBase bg-bgPrimary" : "bg-secondaryBase"} text-stone-200 hover:font-semibold w-11/12 mx-auto cursor-pointer`}
    >
      <div className="text-left">
        <div
          className={`w-full ${isToday ? "text-accentLight" : "text-textBase"} text-3xl font-semibold`}
        >
          {dayOfWeekAbbreviations[day.day as dayOfWeek]}
        </div>
        <div className="text-lg font-light text-textAlt">
          {format(new Date(day.date), "dd-MMM")}
        </div>
        <div className="mt-1 mr-16 border-b-2 border-textAlt border-spacing-8"></div>
      </div>

      {events && (
        <div className="flex flex-col gap-12 justify-normal">
          <div className="min-h-28">
            {events?.filter((event) => event.is_morning).length > 0 ? (
              events
                .filter((event) => event.is_morning)
                .map((event) => (
                  <EventBox key={event.id} event={event} onClick={onClick} />
                ))
            ) : (
              <p>No morning</p>
            )}
          </div>

          <div className="text-sm text-left text-textAlt">- 12pm -</div>

          <div className="min-h-28">
            {events?.filter((event) => !event.is_morning).length > 0 ? (
              events
                .filter((event) => !event.is_morning)
                .map((event) => (
                  <EventBox key={event.id} event={event} onClick={onClick} />
                ))
            ) : (
              <p>No evening</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarDay;
