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
      <div className="flex items-center justify-center gap-4">
        <span
          className="text-3xl cursor-pointer hover:text-accentLight font-semiBold"
          onClick={() => onClickWeekNavigate(false)}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </span>
        <Button type="button" variant="default" onClick={handleNavigateToToday}>
          Current week
        </Button>
        <span
          className="text-3xl cursor-pointer font-semiBold hover:text-accentLight"
          onClick={() => onClickWeekNavigate(true)}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </span>
      </div>
    </FlexBox>
  );
}

export default WeekNavigator;
