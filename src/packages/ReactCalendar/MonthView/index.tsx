import dayjs from 'dayjs';
import Weekdays from './Weekdays';
import Days from './Days';

interface MonthViewProps {
  currentDate: Date;
  weekStart: 1 | 0;
  activeDate: Date;
  setActiveDate: (date: Date) => void;
  dayRender?: (date: Date) => React.ReactNode;
  showFixedNumberOfWeeks: boolean;
  showNeighboringMonth: boolean;
}
function MonthView({ currentDate, activeDate, setActiveDate, weekStart = 0, dayRender, showFixedNumberOfWeeks, showNeighboringMonth }: MonthViewProps) {
  const monthStartDay = dayjs(activeDate || currentDate).startOf('month');
  const currentMonthIndex = monthStartDay.month();
  const viewStartDay = monthStartDay.locale('en', { weekStart }).startOf('week').toDate();
  const onDayClick = (date: Date) => {
    setActiveDate(date);
  };
  // 拿当前日期获取该月第一天，再获取该周第一天
  return (
    <div className="react-calendar__month-view">
      <Weekdays viewStartDay={viewStartDay} />
      <Days
        activeDate={activeDate}
        viewStartDay={viewStartDay}
        currentDate={currentDate}
        currentMonthIndex={currentMonthIndex}
        onDayClick={onDayClick}
        dayRender={dayRender}
        showFixedNumberOfWeeks={showFixedNumberOfWeeks}
        showNeighboringMonth={showNeighboringMonth}
      />
    </div>
  );
}

export default MonthView;
