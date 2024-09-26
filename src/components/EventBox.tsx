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
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <FlexBox container flexDirection="column">
        <Label className="text-lg">{event.event_type} session</Label>
        <Label className="text-textAlt">{event.location}</Label>
      </FlexBox>
      <FlexBox className="text-sm text-textAlt">
        {startTime ? format(startTime, "h:mma") : ""} -{" "}
        {endTime ? format(endTime, "h:mma") : ""}
        <Label className="text-sm text-right">
          {eventAttendance?.length ?? 0} / 32
        </Label>
      </FlexBox>
    </FlexBox>
  );
}

export default EventBox;
