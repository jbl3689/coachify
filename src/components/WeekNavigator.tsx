import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from './ui/ButtonBeta';
import FadeInContainer from './ui/FadeInContainer';

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
    <div className="flex items-center justify-between gap-8 px-4 pb-8">
      <FadeInContainer>
        <p className="text-4xl font-semibold text-center">
          Week of {selectedWeek.toDateString()}
        </p>
      </FadeInContainer>
      <div className="flex items-center justify-center gap-4">
        <span
          className="text-3xl cursor-pointer hover:text-accentLight font-semiBold"
          onClick={() => onClickWeekNavigate(false)}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </span>
        <Button type="primary" onClick={handleNavigateToToday}>
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
