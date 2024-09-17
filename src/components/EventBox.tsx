import { format, parse } from "date-fns";

import { useEventAttendance } from "../hooks/events/useEventAttendance";
import { EventState } from "../types/types";
import { FlexBox } from "./ui/FlexBox";
import { Label } from "@radix-ui/react-dropdown-menu";

interface EventBoxProps {
  event: EventState;
  onClick: () => void;
}

function EventBox({ event, onClick }: EventBoxProps) {
  const { eventAttendance } = useEventAttendance(event.id);

  const startTime = event?.event_start_time
    ? parse(event.event_start_time, "HH:mm:ss", new Date())
    : null;
  const endTime = event?.event_end_time
    ? parse(event.event_end_time, "HH:mm:ss", new Date())
    : null;

  return (
    <FlexBox
      container
      flexDirection="column"
      justifyContent="space-between"
      gap="4px"
    >
      <FlexBox container flexDirection="column" justifyContent="space-between">
        <Label className="text-lg">{event.event_type}</Label>
        <Label className="text-sm">{eventAttendance?.length ?? 0} / 32</Label>
      </FlexBox>

      <FlexBox className="text-sm text-textAlt">
        <Label>{event.location}</Label>
        {startTime ? format(startTime, "h:mma") : ""} -{" "}
        {endTime ? format(endTime, "h:mma") : ""}
      </FlexBox>
    </FlexBox>
  );
}

export default EventBox;
