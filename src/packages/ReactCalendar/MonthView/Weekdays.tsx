import dayjs from 'dayjs';
import { formatNarrowWeekday } from '../shared/dateFormatter';
import Flex from '../Flex';

interface WeekdaysProps {
  viewStartDay: Date;
}
function Weekdays({ viewStartDay }: WeekdaysProps) {
  const weekdays = [];
  for (let i = 0; i < 7; i++) {
    const day = dayjs(viewStartDay).add(i, 'day').toDate();
    weekdays.push(
      <div className="react-calendar__month-view__weekdays__weekday" key={i}>
        {formatNarrowWeekday('zh-CN', day)}
      </div>
    );
  }
  return <Flex className="react-calendar__month-view__weekdays" count={7}>{weekdays}</Flex>;
}

export default Weekdays;
