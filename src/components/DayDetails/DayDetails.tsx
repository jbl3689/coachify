import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { selectCurrentWeekDayEvents } from "../../context/calendarSlice";
import { BREAKPOINTS, DayState, ReduxAppState } from "../../types/types";
import EventForm from "../EventForm/EventForm";
import FormDialog from "../FormDialog/FormDialog";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/Label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import EventCardHeader from "./EventCardHeader/EventCardHeader";
import { daySessionNumbers } from "../CalendarDay/CalendarDay";
import { set } from "date-fns";
import { useBreakpoint } from "use-breakpoint";

interface DayDetailsProps {
  selectedDay: DayState;
  selectedSessionNumber: number | null;
}

function DayDetails({ selectedDay, selectedSessionNumber }: DayDetailsProps) {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const selectedDayEvents = useSelector((state: ReduxAppState) =>
    selectCurrentWeekDayEvents(state, selectedDay.date)
  );
  const [selectedSession, setSelectedSession] = useState<number>(
    selectedSessionNumber ?? daySessionNumbers[0]
  );

  const eventAttendance = [
    {
      id: 1,
      name: "James Blake",
    },
  ];
  // const { eventAttendance } = useEventAttendance(displayedEvent?.id ?? 0);

  const handleOpenDialog = (sessionNumber: number) => {
    setSelectedSession(sessionNumber);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Tabs
        defaultValue={`${selectedSession}`}
        className="grid mx-auto"
        // onChange={(value) => setSelectedSession(Number(value))}
      >
        <TabsList
          className={`grid w-full mb-4 grid-cols-${daySessionNumbers.length}`}
        >
          {daySessionNumbers.map((number) => (
            <TabsTrigger value={`${number}`} className="text-2xl" key={number}>
              {breakpoint === "desktop" ? `Session ${number}` : `S${number}`}
            </TabsTrigger>
          ))}
        </TabsList>

        {daySessionNumbers.map((number) => (
          <TabsContent value={`${number}`}>
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
                {new Date(selectedDay.date!).toDateString()}{" "}
              </span>
              | Session {selectedSessionNumber}
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
