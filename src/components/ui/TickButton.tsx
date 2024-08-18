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
    ${type === "success" ? "bg-successBase" : "bg-dangerBase"} px-2 min-w-12 w-full py-1 text-black hover:text-textBase border-2 `}
    >
      {type === "success" ? "Y" : "N"}
    </button>
  );
}

export default TickButton;
