import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import FadeInContainer from "../ui/FadeInContainer";

interface WeekNavigatorProps {
  selectedWeek: Date;
  onClickWeekNavigate: (isNextWeek: boolean) => void;
}

function WeekNavigator({
  selectedWeek,
  onClickWeekNavigate,
}: WeekNavigatorProps) {
  return (
    <div className="flex items-center justify-center gap-8 pb-8 text-primaryColor">
      <span
        className="pt-2 text-3xl cursor-pointer hover:text-slate-500 font-semiBold"
        onClick={() => onClickWeekNavigate(false)}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </span>
      <FadeInContainer>
        <p className="text-4xl font-semibold text-center text-accentColor">
          Week beginning on {selectedWeek.toDateString()}
        </p>
      </FadeInContainer>

      <span
        className="pt-2 text-3xl cursor-pointer font-semiBold hover:text-slate-500"
        onClick={() => onClickWeekNavigate(true)}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </span>
    </div>
  );
}

export default WeekNavigator;
