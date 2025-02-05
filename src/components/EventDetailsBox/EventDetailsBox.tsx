import { format, parse } from "date-fns";
import { HiHome } from "react-icons/hi";
import { FaPersonRunning } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import { EventState } from "../../types/types";
import { FlexBox } from "../ui/FlexBox";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/button";
import { Check, Cross, X } from "lucide-react";

interface EventBoxProps {
  event: EventState;
}

function EventDetailsBox({ event }: EventBoxProps) {
  // const { eventAttendance } = useEventAttendance(event.id);

  const startTime = event?.event_start_time
    ? parse(event.event_start_time, "HH:mm:ss", new Date())
    : null;
  const endTime = event?.event_end_time
    ? parse(event.event_end_time, "HH:mm:ss", new Date())
    : null;

  const getVariant = (eventType: string) => {
    switch (eventType) {
      case "Game":
        return "bg-emerald-500";
      case "Whiteboard":
        return "bg-green-500";
      case "Bonding":
        return "bg-lime-500";
      default:
        return "bg-cyan-500";
    }
  };

  return (
    <div className="relative group overflow-hidden">
      <FlexBox
        container
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        gap="5px"
      >
        <Badge
          className={
            "flex justify-between w-5/6 text-xs " + getVariant(event.event_type)
          }
        >
          {event.event_type}
          <FaPersonRunning />
        </Badge>
        {event.location ? (
          <Badge variant="secondary" className="flex justify-between w-5/6">
            {event.location} <HiHome />
          </Badge>
        ) : null}
        <Badge variant="secondary" className="flex justify-between w-5/6">
          {startTime ? format(startTime, "h:mma") : ""} -{" "}
          {endTime ? format(endTime, "h:mma") : ""} <FaClock />
        </Badge>
        {/* <Badge variant="destructive">
            {eventAttendance?.length ?? 0} / 32
          </Badge> */}
      </FlexBox>

      <FlexBox className="absolute bottom-[-20px] z-100 right-[-20px] opacity-0 group-hover:opacity-100 transition-opacity">
        <Check size={24} color="green" />
        <X size={24} color="red" />
      </FlexBox>
    </div>
  );
}

export default EventDetailsBox;
