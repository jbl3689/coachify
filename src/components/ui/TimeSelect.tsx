import { UseFormRegister } from 'react-hook-form';

import { EventFormInputs } from '../EventForm';

// Custom Time Select Component
const generateTimeOptions = (interval: number, startTime?: number) => {
  const times = [];
  const date = new Date();
  console.log(startTime);

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
  label: string;
  register: UseFormRegister<EventFormInputs>;
  startTime?: number;
  isRequired: boolean;
  isDisabled?: boolean;
  interval?: number;
}

const TimeSelect = ({
  id,
  label,
  register,
  isRequired,
  startTime,
  isDisabled = false,
  interval = 30,
}: TimeSelectProps) => {
  const timeOptions = generateTimeOptions(interval);
  console.log(timeOptions[timeOptions.length / 2]);

  return (
    <div className="w-48 mb-4">
      <label htmlFor={id} className="block mb-2">
        {label}
        <select
          id={id}
          className="block w-full mt-1 text-black rounded-md form-select"
          {...register(
            id,
            isRequired ? { required: "This field is required" } : {}
          )}
          disabled={isDisabled}
        >
          {timeOptions.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default TimeSelect;
