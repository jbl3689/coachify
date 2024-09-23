import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { selectCurrentWeekDayEvents } from "../../context/calendarSlice";
import { DayState, ReduxAppState } from "../../types/types";
import EventForm from "../EventForm/EventForm";
import FormDialog from "../FormDialog/FormDialog";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/Label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import EventCardHeader from "./EventCardHeader/EventCardHeader";
import { daySessionNumbers } from "../CalendarDay/CalendarDay";
import { set } from "date-fns";

interface DayDetailsProps {
  selectedDay: DayState;
}

function DayDetails({ selectedDay }: DayDetailsProps) {
  const [formEventType, setFormEventType] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const selectedDayEvents = useSelector((state: ReduxAppState) =>
    selectCurrentWeekDayEvents(state, selectedDay.date)
  );
  const [selectedSession, setSelectedSession] = useState<number>(
    daySessionNumbers[0]
  );
  const selectedSessionEvents = selectedDayEvents?.find(
    (event) => event.session_number === selectedSession
  );

  const eventAttendance = [
    {
      id: 1,
      name: "James Blake",
    },
  ];
  // const { eventAttendance } = useEventAttendance(displayedEvent?.id ?? 0);

  useEffect(() => {
    setFormEventType(null);
  }, [selectedDay]);

  const handleOpenDialog = (sessionNumber: number) => {
    setSelectedSession(sessionNumber);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Tabs defaultValue="morning" className="grid mx-auto">
        <TabsList
          className={`grid w-full mb-4 grid-cols-${daySessionNumbers.length}`}
        >
          {daySessionNumbers.map((number) => (
            <TabsTrigger value={`session${number}`} className="text-2xl">
              Session {number}
            </TabsTrigger>
          ))}
        </TabsList>

        {daySessionNumbers.map((number) => (
          <TabsContent value={`session${number}`}>
            <Card className="flex flex-col justify-between border-4 h-96 border-accentBase">
              <EventCardHeader
                selectedDay={selectedDay}
                displayedEvent={selectedDayEvents?.find(
                  (event) => event.session_number === number
                )}
                handleOpenDialog={handleOpenDialog}
                sessionNumber={number}
              />

              <CardContent>
                {selectedDayEvents?.find(
                  (event) => event.session_number === number
                ) ? (
                  <div className="flex flex-row">
                    <div className="flex-1 p-2">
                      <div>Attendes:</div>
                      <div>
                        {eventAttendance?.map((user) => <div>{user.name}</div>)}
                      </div>
                    </div>
                    <div className="flex-1 p-2">Col-2</div>
                  </div>
                ) : (
                  <Label className="text-4xl text-textAlt">
                    No events for session {number}
                  </Label>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <FormDialog
        Title={
          <div>
            <h2 className="mb-6 ">
              Add a new event for{" "}
              <span className="text-textAlt">
                {new Date(selectedDay.date!).toDateString()}
              </span>
            </h2>
          </div>
        }
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      >
        <EventForm
          selectedDay={selectedDay}
          sessionNumber={selectedSession}
          setIsDialogOpen={setIsDialogOpen}
        />
      </FormDialog>
    </>
  );
}

export default DayDetails;
