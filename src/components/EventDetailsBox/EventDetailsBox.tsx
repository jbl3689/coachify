import { format, parse } from "date-fns";
import { EventState } from "../../types/types";

interface EventBoxProps {
  event: EventState;
}

function EventDetailsBox({ event }: EventBoxProps) {
  const startTime = event.event_start_time
    ? parse(event.event_start_time, "HH:mm:ss", new Date())
    : null;
  const endTime = event.event_end_time
    ? parse(event.event_end_time, "HH:mm:ss", new Date())
    : null;

  return (
    <div className="mx-2 rounded-md border-l-2 border-primary bg-muted/60 px-3 py-3 text-left">
      <p className="font-semibold text-foreground">{event.event_type}</p>
      <p className="mt-1 text-xs tabular-nums text-muted-foreground">
        {startTime ? format(startTime, "HH:mm") : ""}
        {endTime ? ` – ${format(endTime, "HH:mm")}` : ""}
      </p>
      {event.location && (
        <p className="mt-2 break-words text-xs leading-relaxed text-muted-foreground">
          {event.location}
        </p>
      )}
    </div>
  );
}

export default EventDetailsBox;
