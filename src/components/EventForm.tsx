import { SubmitHandler, useForm } from "react-hook-form";

import { useAddEvent } from "../hooks/useEvents";
import { DayState } from "../types/types";
import Input from "../ui/Input";
import TimeSelect from "../ui/TimeSelect";
import { Dispatch, SetStateAction } from "react";

interface EventFormProps {
  selectedDay: DayState;
  eventType: string;
  setFormEventType: Dispatch<SetStateAction<string | null>>;
  isCreating?: boolean;
}

export type EventFormInputs = {
  event_start_time: string;
  event_end_time: string;
  location: string;
};

function EventForm({
  selectedDay,
  eventType,
  setFormEventType,
}: EventFormProps) {
  const date = selectedDay.date;

  const { mutate } = useAddEvent(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<EventFormInputs>({
    defaultValues: {
      event_start_time: "18:00",
      event_end_time: "21:00",
      location: "",
    },
  });

  const currentStartTime = watch("event_start_time");

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
            Add a new {eventType} for{" "}
            <span className="text-accentLight">
              {new Date(date!).toDateString()}
            </span>
          </h2>

          <div className="flex flex-row justify-evenly">
            <TimeSelect
              id="event_start_time"
              label="Select start time"
              register={register}
              isRequired={true}
            />
            <TimeSelect
              id="event_end_time"
              label="Select end time"
              register={register}
              startTime={parseInt(currentStartTime)}
              isRequired={true}
              isDisabled={currentStartTime === ""}
            />
          </div>

          <div className={"mb-4 transition-all duration-[1.5s] opacity-100"}>
            <label className="block mb-2 ">
              Enter location
              <Input
                type="text"
                className="w-5/6"
                id="location"
                {...register("location", {
                  required: "This field is required",
                })}
              />
            </label>
          </div>

          <div className="font-semibold text-dangerBase">
            {errors.event_start_time && <p>Start time is required!</p>}
            {errors.event_end_time && <p>End time is required!</p>}
            {errors.location && <p>Location is required!</p>}
          </div>

          <div className="flex flex-row gap-4 w-5/6 mx-auto">
            <button
              className="w-2/6 p-2 mt-4 mx-auto text-white rounded-md bg-dangerBase hover:bg-accentBase"
              type="button"
              onClick={() => setFormEventType(null)}
            >
              Back
            </button>
            <button
              className="w-4/6 mx-auto p-2 mt-4 text-white rounded-md bg-bgTertiary hover:bg-accentBase"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventForm;
