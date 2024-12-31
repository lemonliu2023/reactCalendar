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
  monthView: 'week' | 'month';
  enableSwiper: boolean;
  setMonthView: (view: 'week' | 'month') => void;
}
function MonthView({
  currentDate,
  activeDate,
  setActiveDate,
  weekStart = 0,
  dayRender,
  showFixedNumberOfWeeks,
  showNeighboringMonth,
  enableSwiper,
  monthView,
  setMonthView,
}: MonthViewProps) {
  const monthStartDay = dayjs(activeDate || currentDate).startOf('month');
  const currentMonthIndex = monthStartDay.month();
  const viewStartDay =
    monthView === 'month'
      ? monthStartDay.locale('en', { weekStart }).startOf('week').toDate()
      : dayjs(activeDate || currentDate)
          .startOf('week')
          .toDate();
  // 拿当前日期获取该月第一天，再获取该周第一天
  return (
    <div className="react-calendar__month-view">
      <Weekdays viewStartDay={viewStartDay} />
      <Days
        activeDate={activeDate}
        viewStartDay={viewStartDay}
        currentDate={currentDate}
        currentMonthIndex={currentMonthIndex}
        onDayClick={(date: Date) => setActiveDate(date)}
        dayRender={dayRender}
        showFixedNumberOfWeeks={showFixedNumberOfWeeks}
        showNeighboringMonth={showNeighboringMonth}
        monthView={monthView}
        setMonthView={setMonthView}
        enableSwiper={enableSwiper}
      />
    </div>
  );
}

export default MonthView;
