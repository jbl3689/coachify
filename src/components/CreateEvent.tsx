import React from "react";
import { useLocation } from "react-router-dom";
import Training from "./Training";
import Game from "./Game";
import { useForm } from "react-hook-form";
import { useAddEvent } from "../hooks/useEvents";
import { useDays } from "../hooks/useDays";

function CreateEvent() {
  const urlLocation = useLocation();
  const params = new URLSearchParams(urlLocation.search);
  const eventType = params.get("eventType");
  const date = params.get("date");

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

  const baseInputStyles = "w-full h-14 p-2 text-xl border rounded text-bgDark";

  return (
    <div className="grid justify-between grid-cols-5 gap-10">
      <div className="flex items-center justify-center col-span-2 gap-6 px-4 text-primaryColor">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full rounded shadow-md"
        >
          <h2 className="mb-6 text-2xl font-bold text-center">
            Add a New {eventLabel} for {new Date(date!).toDateString()}
          </h2>

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
            <button
              type="submit"
              className="w-full p-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          )}
        </form>
      </div>
      <div className="col-span-3">
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
      </div>
    </div>
  );
}

export default CreateEvent;
