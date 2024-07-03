import { useDrop } from "react-dnd";

interface TrainingActivitySlotProps {
  time: number;
  index: number;
  onDrop: (item: any, index: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  activity: any;
}

const TrainingActivitySlot = ({
  time,
  index,
  onDrop,
  activity,
}: TrainingActivitySlotProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "ACTIVITY",
    drop: (item) => onDrop(item, index),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div className="flex gap-4">
      <div
        className={`border border-gray-300 p-2 text-bgDark w-28 rounded-xl ${isOver ? "bg-blue-100" : "bg-primaryColor"}`}
        style={{
          height: "40px",
          backgroundColor: activity ? "lightgreen" : "",
        }}
      >
        <span className="pr-4">{`${time} mins`}</span>
      </div>
      <div
        ref={drop}
        className={`border border-gray-300 p-2 w-full text-bgDark rounded-xl ${isOver ? "bg-blue-100" : "bg-primaryColor"}`}
        style={{
          height: "40px",
          backgroundColor: activity ? "lightgreen" : "",
        }}
      >
        <span className="">
          {activity ? activity.name : "Drag an activity over"}
        </span>
      </div>
    </div>
  );
};

export default TrainingActivitySlot;
