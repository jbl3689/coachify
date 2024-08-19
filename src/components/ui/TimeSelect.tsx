import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

// Custom Time Select Component
const generateTimeOptions = (interval: number, startTime?: number) => {
  const times = [];
  const date = new Date();

  if (startTime) {
    // If startTime is provided, set date to that time
    date.setTime(startTime);
    // Calculate end time as 3 hours after start time
    const endTime = new Date(date.getTime() + 3 * 60 * 60 * 1000);
    // Loop to generate times until 3 hours after start time
    while (date <= endTime) {
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      times.push(`${hours}:${minutes}`);
      date.setMinutes(date.getMinutes() + interval); // Increment by interval
    }
  } else {
    // Otherwise, start at midnight
    date.setHours(0, 0, 0, 0);
    // Set end time to the end of the day
    const endTime = new Date(date);
    endTime.setHours(23, 59, 59, 999);
    // Loop to generate times for the whole day
    while (date <= endTime) {
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      times.push(`${hours}:${minutes}`);
      date.setMinutes(date.getMinutes() + interval); // Increment by interval
    }
  }

  return times;
};

interface TimeSelectProps {
  id: "event_start_time" | "event_end_time";
  startTime?: number;
  isDisabled?: boolean;
  interval?: number;
}

const TimeSelect = ({
  id,
  startTime,
  isDisabled = false,
  interval = 30,
}: TimeSelectProps) => {
  const timeOptions = generateTimeOptions(interval);

  return (
    <div className='className="block w-full mt-1 text-black rounded-md form-select"'>
      <Select disabled={isDisabled}>
        <SelectTrigger>
          <SelectValue placeholder="select a time" />
        </SelectTrigger>
        <SelectContent>
          {timeOptions.map((time) => (
            <SelectItem key={time} value={time}>
              {time}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TimeSelect;
