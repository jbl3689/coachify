import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { Button } from "./ui/button";

interface WeekNavigatorProps {
  selectedWeek: Date;
  onClickWeekNavigate: (isNextWeek: boolean) => void;
  handleNavigateToToday: () => void;
}

function WeekNavigator({
  selectedWeek,
  onClickWeekNavigate,
  handleNavigateToToday,
}: WeekNavigatorProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
        Week of {format(selectedWeek, "d MMM yyyy")}
      </h1>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Previous week"
          onClick={() => onClickWeekNavigate(false)}
        >
          <ChevronLeft aria-hidden="true" className="h-4 w-4" />
        </Button>
        <Button type="button" variant="outline" onClick={handleNavigateToToday}>
          Current week
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Next week"
          onClick={() => onClickWeekNavigate(true)}
        >
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default WeekNavigator;
