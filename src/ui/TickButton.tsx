import React from "react";

interface TickButtonProps {
  type: "success" | "fail";
  onClick: () => void;
}

function TickButton({ type, onClick }: TickButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
    ${type === "success" ? "bg-accentColor" : "bg-dangerColor"} px-2 w-16 py-1 text-black hover:text-white border-2 bg-accentColor `}
    >
      {type === "success" ? "Y" : "N"}
    </button>
  );
}

export default TickButton;
