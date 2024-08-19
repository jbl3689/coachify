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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import EventCardHeader from './EventCardHeader/EventCardHeader';

interface DayDetailsProps {
  selectedDay: DayState;
}

function DayDetails({ selectedDay }: DayDetailsProps) {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);

  const [formEventType, setFormEventType] = useState<string | null>(null);

  const selectedDayEvents = useSelector((state: ReduxAppState) =>
    selectCurrentWeekDayEvents(state, selectedDay.date)
  );

  const [morningEvent, setMorningEvent] = useState<EventState | null>(
    selectedDayEvents?.[0] ?? null
  );
  const [eveningEvent, setEveningEvent] = useState<EventState | null>(
    selectedDayEvents?.[1] ?? null
  );
  const [displayedEvent, setDisplayedEvent] = useState<EventState | null>(
    selectedDayEvents?.[0] ?? null
  );
  const [isMorning, setIsMorning] = useState<boolean>(true);

  const { eventAttendance } = useEventAttendance(displayedEvent?.id ?? 0);

  useEffect(() => {
    if (selectedDayEvents)
      if (selectedDayEvents.length === 1) {
        setDisplayedEvent(selectedDayEvents[0]);
        setIsMorning(selectedDayEvents[0].is_morning);
      } else {
        setDisplayedEvent(
          selectedDayEvents.find((event) => event.is_morning === isMorning) ??
            null
        );
      }
  }, [selectedDayEvents]);

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

  return (
    <>
      <Tabs defaultValue="morning" className="grid mx-auto ">
        <TabsList className="grid w-full grid-cols-2 mb-4 ">
          <TabsTrigger value="morning" className="text-2xl">
            Morning Event
          </TabsTrigger>
          <TabsTrigger value="evening" className="text-2xl">
            Evening Event
          </TabsTrigger>
        </TabsList>

        {/* Morning Event */}
        <TabsContent value="morning">
          <Card className="flex flex-col justify-between border-4 h-96 border-accentBase">
            <EventCardHeader
              selectedDay={selectedDay}
              displayedEvent={morningEvent}
              setFormEventType={setFormEventType}
            />

            <CardContent>
              {morningEvent ? (
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
                  No events for this morning
                </Label>
              )}
              {/* </div> */}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Evening Event */}
        <TabsContent value="evening">
          <Card className="flex flex-col justify-between border-4 h-96 border-accentBase">
            <EventCardHeader
              selectedDay={selectedDay}
              displayedEvent={eveningEvent}
              setFormEventType={setFormEventType}
            />

            <CardContent>
              {eveningEvent ? (
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
                  No events for this evening
                </Label>
              )}
              {/* </div> */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

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
