import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button } from "./ui/button";
import FadeInContainer from "./ui/FadeInContainer";
import { Label } from "./ui/Label";
import { useBreakpoint } from "use-breakpoint";
import { BREAKPOINTS } from "@/types/types";
import { FlexBox } from "./ui/FlexBox";

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

  const formatDate = (date: Date) => {
    if (breakpoint === "mobile" || breakpoint === "mobileLarge") {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
    return date.toDateString();
  };

  return (
    <FlexBox
      container
      gap="20px"
      flexDirection={breakpoint === "mobile" ? "column" : "row"}
      justifyContent="space-between"
      alignItems="center"
      padding="0 16px 32px 16px"
    >
      <FadeInContainer>
        <Label
          className={`${breakpoint === "desktop" ? "text-4xl" : "text-3xl"} font-semibold`}
        >
          Week of {formatDate(selectedWeek)}
        </Label>
      </FadeInContainer>
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          aria-label="Previous week"
          className="p-2 text-2xl font-semibold hover:text-accentLight sm:text-3xl"
          onClick={() => onClickWeekNavigate(false)}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <Button
          type="button"
          variant="default"
          className="whitespace-nowrap"
          onClick={handleNavigateToToday}
        >
          Current week
        </Button>
        <button
          type="button"
          aria-label="Next week"
          className="p-2 text-2xl font-semibold hover:text-accentLight sm:text-3xl"
          onClick={() => onClickWeekNavigate(true)}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </FlexBox>
  );
}

export default WeekNavigator;
