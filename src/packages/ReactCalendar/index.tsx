import { useState } from 'react';
import MonthView from './MonthView';
import Navigation from './Navigation';
import './index.css';

interface ReactCalendarProps {
  currentDate?: Date;
  weekStart?: 0 | 1;
  navigationPre?: React.ReactNode;
  navigationNext?: React.ReactNode;
  navigationCenter?: (date: Date) => React.ReactNode;
  dayRender?: (date: Date) => React.ReactNode;
  showFixedNumberOfWeeks?: boolean;
  showNeighboringMonth?: boolean;
  enableSwiper?: boolean;
  monthView?: 'week' | 'month'
}

const ReactCalendar = ({
  navigationPre,
  navigationNext,
  weekStart,
  navigationCenter,
  dayRender,
  showFixedNumberOfWeeks,
  showNeighboringMonth,
  monthView,
  enableSwiper,
}: ReactCalendarProps) => {
  const currentDate = new Date(); // 当前日期 可传入
  const [activeDate, setActiveDate] = useState(currentDate);
  const [_monthView, _setMonthView] = useState(monthView || 'month');
  return (
    <div className="react-calendar">
      <Navigation
        activeDate={activeDate}
        setActiveDate={setActiveDate}
        monthView={_monthView}
        navigationCenter={navigationCenter && navigationCenter(currentDate)}
        navigationPre={navigationPre}
        navigationNext={navigationNext}
      />
      <div className="react-calendar__viewContainer">
        <MonthView
          currentDate={currentDate}
          activeDate={activeDate}
          setActiveDate={setActiveDate}
          weekStart={weekStart || 0}
          dayRender={dayRender}
          showFixedNumberOfWeeks={!!showFixedNumberOfWeeks}
          showNeighboringMonth={!!showNeighboringMonth}
          monthView={_monthView}
          setMonthView={_setMonthView}
          enableSwiper={!!enableSwiper}
        />
      </div>
    </div>
  );
};

export default ReactCalendar;
