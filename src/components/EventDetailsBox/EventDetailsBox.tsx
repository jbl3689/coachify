import { format, parse } from "date-fns";
import { HiHome } from "react-icons/hi";
import { FaPersonRunning } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import { EventState } from "../../types/types";
import { FlexBox } from "../ui/FlexBox";
import { Badge } from "../ui/Badge";

interface EventBoxProps {
  event: EventState;
  sessionNumber: number;
}

function EventDetailsBox({ event, sessionNumber }: EventBoxProps) {
  console.log(sessionNumber);
  // const { eventAttendance } = useEventAttendance(event.id);

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
      alignItems="center"
      gap="5px"
    >
      <Badge variant="default" className="flex justify-between w-5/6 text-xs">
        {event.event_type}
        <FaPersonRunning />
      </Badge>
      <Badge variant="secondary" className="flex justify-between w-5/6">
        {event.location} <HiHome />
      </Badge>
      <Badge variant="secondary" className="flex justify-between w-5/6">
        {startTime ? format(startTime, "h:mma") : ""} -{" "}
        {endTime ? format(endTime, "h:mma") : ""} <FaClock />
      </Badge>
      {/* <Badge variant="destructive">
            {eventAttendance?.length ?? 0} / 32
          </Badge> */}
    </FlexBox>
  );
}

export default EventDetailsBox;
