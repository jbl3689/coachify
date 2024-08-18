import { format, parse } from 'date-fns';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useBreakpoint } from 'use-breakpoint';

import { Button } from '@/components/ui/button';

import { selectCurrentWeekDayEvents } from '../../context/calendarSlice';
import { useEventAttendance } from '../../hooks/useEvents';
import {
    BREAKPOINTS, dayOfWeek, dayOfWeekAbbreviations, DayState, EventState, ReduxAppState
} from '../../types/types';
import EventForm from '../EventForm';
import FormDialog from '../FormDialog/FormDialog';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Label } from '../ui/label';

interface DayDetailsProps {
  selectedDay: DayState;
}

function DayDetails({ selectedDay }: DayDetailsProps) {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);

  const [formEventType, setFormEventType] = useState<string | null>(null);

  const selectedDayEvents = useSelector((state: ReduxAppState) =>
    selectCurrentWeekDayEvents(state, selectedDay.date)
  );
  const [displayedEvent, setDisplayedEvent] = useState<EventState | null>(
    selectedDayEvents?.[0] ?? null
  );
  const [isMorning, setIsMorning] = useState<boolean>(
    displayedEvent?.is_morning ?? true
  );

  const { eventAttendance } = useEventAttendance(displayedEvent?.id ?? 0);

  useEffect(() => {
    if (selectedDayEvents)
      setDisplayedEvent(
        selectedDayEvents.find((event) => event.is_morning === isMorning) ??
          null
      );
  }, [isMorning, selectedDayEvents]);

  useEffect(() => {
    setFormEventType(null);
    setIsMorning(true);
  }, [selectedDay]);

  const handleChangeTime = () => {
    setIsMorning(!isMorning);
    if (selectedDayEvents) {
      setDisplayedEvent(
        selectedDayEvents.find((event) => event.is_morning === isMorning) ??
          null
      );
    }
  };

  const startTime = displayedEvent?.event_start_time
    ? parse(displayedEvent.event_start_time, "HH:mm:ss", new Date())
    : null;
  const endTime = displayedEvent?.event_end_time
    ? parse(displayedEvent.event_end_time, "HH:mm:ss", new Date())
    : null;

  return (
    <>
      <Card className="grid mx-auto border-4 h-96 border-accentBase ">
        <CardHeader>
          <div className="flex flex-row justify-between space-x-2 tracking-wide text-left ">
            <div>
              <div className="text-2xl font-semibold md:text-3xl">
                {breakpoint === "mobile"
                  ? dayOfWeekAbbreviations[selectedDay.day as dayOfWeek]
                  : selectedDay.day}{" "}
                | {format(new Date(selectedDay.date), "dd-MMM")}
              </div>
              {displayedEvent && (
                <div className="text-xl md:text-2xl">
                  <div className="text-textAlt">
                    {displayedEvent?.event_type} |{" "}
                    {startTime ? format(startTime, "h:mma") : ""} to{" "}
                    {endTime ? format(endTime, "h:mma") : ""}
                  </div>
                  <div className="text-textAlt">Michael's Ave Reserve</div>
                </div>
              )}
            </div>
            <div className="text-textAlt ">
              <button
                className="px-8 py-2 rounded-tl-md rounded-bl-md rounded-br-md text-accentBase bg-primaryBase hover:bg-primaryLight"
                onClick={handleChangeTime}
              >
                Event {isMorning ? "1" : "2"} of 2
              </button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* <div
          className={`${
            breakpoint === "mobile" ? "flex-row" : "flex-col"
          } flex justify-center flex-grow py-2`}
          > */}
          {displayedEvent ? (
            <div className="flex flex-row">
              <div className="flex-1 p-2">
                <div>Attendes:</div>
                <div>
                  {eventAttendance?.map((user) => <div>{user.id}</div>)}
                </div>
              </div>
              <div className="flex-1 p-2">Col-2</div>
            </div>
          ) : (
            <Label className="text-4xl text-textAlt">
              No events for this day
            </Label>
          )}
          {/* </div> */}
        </CardContent>

        <CardFooter className="flex gap-4 justify-evenly">
          {!displayedEvent && (
            <>
              <Button
                onClick={() => setFormEventType("Training")}
                size="lg"
                className="px-24"
              >
                Add a Training
              </Button>
              <Button
                onClick={() => setFormEventType("Game")}
                size="lg"
                variant="destructive"
                className="px-24"
              >
                Add a Game
              </Button>
            </>
          )}
        </CardFooter>
      </Card>

      {formEventType && (
        <FormDialog
          Title={
            <div>
              <h2 className="mb-6 ">
                Add a new {formEventType} for{" "}
                <span className="text-textAlt">
                  {new Date(selectedDay.date!).toDateString()}
                </span>
              </h2>
            </div>
          }
          isOpen={formEventType !== null}
          onClose={() => setFormEventType(null)}
        >
          <EventForm
            selectedDay={selectedDay}
            eventType={formEventType ?? ""}
            setFormEventType={setFormEventType}
          />
        </FormDialog>
      )}
    </>
  );
}

export default DayDetails;
