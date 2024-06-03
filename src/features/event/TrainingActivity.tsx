import React from "react";
import { useDrag } from "react-dnd";

interface TraningActivityProps {
  activity: {
    name: string;
  };
}

const TraningActivity = ({ activity }: TraningActivityProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ACTIVITY",
    item: { activity },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`bg-blue-500 text-white rounded-xl p-2 mb-2 cursor-move ${isDragging ? "opacity-50" : "opacity-100"}`}
    >
      {activity.name}
    </div>
  );
};

export default TraningActivity;
