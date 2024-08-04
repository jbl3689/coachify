import React from "react";

import { useForm } from "react-hook-form";
import { useAddEvent } from "../hooks/useEvents";
import Button from "@mui/material/Button";
import { DayState } from "../types/types";

interface EventFormProps {
  selectedDay: DayState;
  eventType: string;
  isCreating?: boolean;
}

function EventForm({ selectedDay, eventType, isCreating }: EventFormProps) {
  const date = selectedDay.date;

  const eventLabel = eventType === "training" ? "Training" : "Game";
  const { mutate, isPending } = useAddEvent(0);

  const { register, handleSubmit, reset, formState } = useForm();

  const [startTime, setStartTime] = React.useState<string>("");
  const [endTime, setEndTime] = React.useState<string>("");
  const [location, setLocation] = React.useState<string>("");
  const [eventData, setEventData] = React.useState({
    startTime: "",
    endTime: "",
    location: "",
  });

  const onSubmit = (data: {
    event_start_time: string;
    event_end_time: string;
    event_type: string;
  }) => {
    mutate(data);
  };

  const baseInputStyles = "w-5/6 h-14 p-2 text-xl border rounded text-bgDark";

  return (
    <div className="grid justify-between">
      <div className="flex items-center justify-center col-span-2 gap-6 p-4 mx-auto rounded-lg bg-bgTertiary">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <h2 className="mb-6 text-3xl font-semibold text-center text-textPrimary">
            Add a New {eventLabel} for {new Date(date!).toDateString()}
          </h2>

          <div className="flex flex-row">
            <div className="">
              <label className="block mb-2 ">
                Select start time
                <input
                  type="time"
                  value={startTime}
                  className={baseInputStyles}
                  id="event_start_time"
                  {...register("event_start_time", {
                    required: "This field is required",
                  })}
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block mb-2 ">
                Select end time
                <input
                  type="time"
                  value={endTime}
                  className={baseInputStyles}
                  id="event_end_time"
                  {...register("event_end_time", {
                    required: "This field is required",
                  })}
                />
              </label>
            </div>
          </div>

          <div
            className={`mb-4 ${endTime ? "transition-all duration-[1.5s] opacity-100" : "opacity-0 h-0 overflow-hidden"}}`}
          >
            <label className="block mb-2 ">
              Select location
              <input
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

          {location && (
            <Button
              type="submit"
              variant="outlined"
              // className="w-full p-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Submit
            </Button>
          )}
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
