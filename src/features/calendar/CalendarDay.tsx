interface CalendarDayProps {
  day: { id: number; label: string; abbreviation: string };
  children: React.ReactNode;
  onClick: () => void;
}

function CalendarDay({ day, children, onClick }: CalendarDayProps) {
  return (
    <div
      onClick={onClick}
      className="w-42 h-56 text-center py-4 rounded-lg border-amber-100 border-2 shadow-md text-2xl text-stone-200 flex flex-col justify-start hover:bg-secondaryColor transition-all hover:cursor-pointer hover:w-44 hover:h-58 hover:font-semibold"
    >
      <div className="w-full border-b-2 pb-2">{day.abbreviation}</div>
      <div className="border-t h-5/6 w-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

export default CalendarDay;
