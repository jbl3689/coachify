import React from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { useAddEvent } from "../hooks/useEvents";
import { DayState } from "../types/types";
import TimeSelect from "../ui/TimeSelect";
import Input from "../ui/Input";
import Button from "../ui/Button";

interface EventFormProps {
  selectedDay: DayState;
  eventType: string;
  isCreating?: boolean;
}

export type EventFormInputs = {
  event_start_time: string;
  event_end_time: string;
  location: string;
};

function EventForm({ selectedDay, eventType, isCreating }: EventFormProps) {
  const date = selectedDay.date;

  const eventLabel = eventType === "training" ? "Training" : "Game";
  const { mutate, isPending } = useAddEvent(0);

  const { register, handleSubmit, reset } = useForm<EventFormInputs>({
    defaultValues: {
      event_start_time: "",
      event_end_time: "",
      location: "",
    },
  });

  const [startTime, setStartTime] = React.useState<string>("10:00");
  const [endTime, setEndTime] = React.useState<string>("12:00");
  const [location, setLocation] = React.useState<string>("");
  const [eventData, setEventData] = React.useState({
    startTime: "",
    endTime: "",
    location: "",
  });

  const baseInputStyles = "w-5/6 h-14 p-2 text-xl border rounded text-bgDark";

  const onSubmit: SubmitHandler<EventFormInputs> = (data) => {
    // Extracting form data
    const { event_start_time, event_end_time, location } = data;

    // Prepare the event data object. Adjust keys as necessary for your backend/API.
    const eventData = {
      event_start_time,
      event_end_time,
      location,
      event_type: eventType,
      day_id: selectedDay.id,
    };

    // Call the mutate function to submit the event data
    mutate(eventData, {
      onSuccess: () => {
        // Handle success, e.g., reset the form, show a success message
        reset();
        console.log("Event added successfully");
      },
      onError: (error) => {
        // Handle error, e.g., show an error message
        console.error("Error adding event:", error);
      },
    });
  };

  return (
    <div className="grid justify-between">
      <div className="flex items-center justify-center col-span-2 gap-6 p-4 mx-auto rounded-lg ">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="mb-6 text-3xl font-semibold text-center text-textPrimary">
            Add a New {eventLabel} for {new Date(date!).toDateString()}
          </h2>

          <div className="flex flex-row justify-evenly">
            <TimeSelect
              id="event_start_time"
              label="Select start time"
              value={startTime}
              register={register}
              isRequired={true}
            />
            <TimeSelect
              id="event_end_time"
              label="Select end time"
              value={endTime}
              register={register}
              isRequired={true}
            />
          </div>

          <div
            className={`mb-4 ${endTime ? "transition-all duration-[1.5s] opacity-100" : "opacity-0 h-0 overflow-hidden"}}`}
          >
            <label className="block mb-2 ">
              Select location
              <Input
                type="text"
                value={location}
                className={baseInputStyles}
                id="location"
                {...register("location", {
                  required: "This field is required",
                })}
              />
            </label>
          </div>

          <button
            className="w-4/6 p-2 mt-4 text-white rounded-md bg-bgTertiary hover:bg-blue-600"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
      {/* <div className="col-span-3">
        {eventType === "training" ? (
          <Training
            isDisabled={startTime === "" && endTime === "" && location === ""}
            startTime={eventData.startTime}
            endTime={eventData.endTime}
            location={eventData.location}
          />
        ) : (
          <Game />
        )}
      </div> */}
    </div>
  );
}

export default EventForm;
