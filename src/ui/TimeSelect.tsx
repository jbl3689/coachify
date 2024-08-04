import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { EventFormInputs } from "../components/EventForm";

const generateTimeOptions = (interval: number) => {
  const times = [];
  // Start at midnight
  const date = new Date();
  date.setHours(0, 0, 0, 0); // Reset to midnight

  // Calculate total minutes in a day
  const totalMinutesInDay = 24 * 60;
  let minutesSinceMidnight = 0;

  // Loop to generate times
  while (minutesSinceMidnight < totalMinutesInDay) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    times.push(`${hours}:${minutes}`);
    date.setMinutes(date.getMinutes() + interval); // Increment by interval
    minutesSinceMidnight += interval; // Update minutes since midnight
  }

  return times;
};

// Custom Time Select Component
interface TimeSelectProps {
  id: string;
  label: string;
  value: string;
  register: UseFormRegister<EventFormInputs>;
  isRequired: boolean;
  interval?: number; // Optional prop to customize interval
}

const TimeSelect = ({
  id,
  label,
  value,
  register,
  isRequired,
  interval = 15, // Default to 15-minute intervals
}: TimeSelectProps) => {
  const timeOptions = generateTimeOptions(interval);
  console.log(timeOptions[timeOptions.length / 2]);

  return (
    <div className="w-48 mb-4">
      <label htmlFor={id} className="block mb-2">
        {label}
        <select
          id={id}
          value={value}
          // onChange={(e) => onChange(e.target.value)}
          className="block w-full mt-1 text-black rounded-md form-select"
          {...register(
            id,
            isRequired ? { required: "This field is required" } : {}
          )}
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
