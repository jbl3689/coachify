import React, { useState } from "react";
import TrainingActivitySlot from "./TrainingActivitySlot";
import TraningActivity from "./TrainingActivity";

const activitiesList = [
  { id: 1, name: "Warm-up", duration: 5 },
  { id: 2, name: "11 v 11", duration: 10 },
  { id: 3, name: "Cool-down", duration: 5 },
];

// Utility function to format time as HH:MM
// @ts-expect-error asd
const formatTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
};

interface TrainingProps {
  isDisabled: boolean;
  startTime: string;
  endTime: string;
  location: string;
}

function Training({ isDisabled, startTime, endTime, location }: TrainingProps) {
  const timeSlots = Array.from({ length: 6 }, (_, i) => i * 10); // 5-minute intervals for 1 hour
  //  const timeSlots = Array.from({ length: 6 }, (_, i) => formatTime(i * 10)); // 10-minute intervals for 1 hour
  const [scheduledActivities, setScheduledActivities] = useState(
    Array(12).fill(null)
  );

  // @ts-expect-error asd
  const handleDrop = (item, index) => {
    const activity = item.activity;
    const durationSlots = activity.duration / 5;
    const endIndex = index + durationSlots;

    console.log(
      `Dropping activity ${activity.name} at index ${index} with duration ${activity.duration}mins ending at ${endIndex}`
    );

    // Check if the activity fits within the timetable
    if (endIndex > timeSlots.length) return;

    // Check if there is already an activity in the slots to be filled
    for (let i = index; i < endIndex; i++) {
      if (scheduledActivities[i] !== null) {
        return; // Abort if any of the slots are already filled
      }
    }

    // Create a new array for the updated activities
    const updatedActivities = [...scheduledActivities];

    // Add the activity to the scheduledActivities array
    for (let i = index; i < endIndex; i++) {
      updatedActivities[i] = activity;
    }

    setScheduledActivities(updatedActivities);
  };

  return (
    <div
      className={
        `flex flex-col items-center min-h-screen text-primaryColor rounded-2xl` +
          isDisabled && "opacity-50 pointer-events-none"
      }
    >
      <div className="w-full max-w-4xl p-4 rounded shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Training Session Timetable</h2>
        <div className="grid grid-cols-1 gap-2 mb-4">
          {timeSlots.map((time, index) => (
            <TrainingActivitySlot
              key={index}
              time={time}
              index={index}
              onDrop={handleDrop}
              activity={scheduledActivities[index]}
            />
          ))}
        </div>
        <div>
          <h3 className="mb-2 text-xl font-bold">Activities</h3>
          {activitiesList.map((activity) => (
            <TraningActivity key={activity.id} activity={activity} />
          ))}
        </div>
      </div>
    </div>
    // <div className="grid grid-cols-6 text-2xl text-center border border-white rounded-md min-h-32 h-3/5">
    //   <div></div>
    //   <div className="w-full border-b border-white bg-secondaryColor">
    //     Warm-up
    //   </div>
    //   <div className="flex items-center justify-center w-full h-8 border-b border-white bg-secondaryLightColor">
    //     Rondo's
    //   </div>
    // </div>
  );
}

export default Training;
