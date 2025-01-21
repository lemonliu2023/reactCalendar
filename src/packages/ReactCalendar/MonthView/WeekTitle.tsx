import { zhWeekdays } from '../config';
import Flex from '../Flex';

interface WeekdaysProps {
  weekStart: 0 | 1;
}
function WeekTitle({ weekStart }: WeekdaysProps) {
  const weekdays = [];
  for (let i = 0; i < 7; i++) {
    const day = zhWeekdays[i + weekStart]
    weekdays.push(
      <div className="react-calendar__month-view__weekdays__weekday" key={i}>
        {day}
      </div>
    );
  }
  return <Flex className="react-calendar__month-view__weekdays" count={7}>{weekdays}</Flex>;
}

export default WeekTitle;
