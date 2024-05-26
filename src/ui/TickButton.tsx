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
    ${type === "success" ? "bg-accentColor" : "bg-dangerColor"} px-2 py-1 text-black hover:text-white border-4 bg-accentColor rounded-3xl`}
    >
      {type === "success" ? "yes" : "no"}
    </button>
  );
}

export default TickButton;
