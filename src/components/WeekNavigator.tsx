import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button } from "./ui/button";
import FadeInContainer from "./ui/FadeInContainer";
import { Label } from "./ui/Label";
import { useBreakpoint } from "use-breakpoint";
import { BREAKPOINTS } from "@/types/types";

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
  const { breakpoint } = useBreakpoint(BREAKPOINTS);

  return (
    <div className="flex items-center justify-between gap-8 px-4 pb-8">
      <FadeInContainer>
        <Label
          className={`${breakpoint === "desktop" ? "text-4xl" : "text-3xl"} font-semibold`}
        >
          Week of {selectedWeek.toDateString()}
        </Label>
      </FadeInContainer>
      <div className="flex items-center justify-center gap-4">
        <span
          className="text-3xl cursor-pointer hover:text-accentLight font-semiBold"
          onClick={() => onClickWeekNavigate(false)}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </span>
        <Button type="button" variant="default" onClick={handleNavigateToToday}>
          Today
        </Button>
        <span
          className="text-3xl cursor-pointer font-semiBold hover:text-accentLight"
          onClick={() => onClickWeekNavigate(true)}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </span>
      </div>
    </div>
  );
}

export default WeekNavigator;
