import { useState } from 'react';
import MonthView from './MonthView';
import Navigation from './Navigation';
import './index.css';
import dayjs from 'dayjs';

interface ReactCalendarProps {
  currentDate?: Date;
  weekStart?: 0 | 1;
  navigationPre?: React.ReactNode;
  navigationNext?: React.ReactNode;
  navigationCenter?: (date: Date) => React.ReactNode;
  dayRender?: (date: Date) => React.ReactNode;
  showFixedNumberOfWeeks?: boolean;
  showNeighboringMonth?: boolean;
}

const ReactCalendar = ({
  navigationPre,
  navigationNext,
  weekStart,
  navigationCenter,
  dayRender,
  showFixedNumberOfWeeks,
  showNeighboringMonth,
}: ReactCalendarProps) => {
  const currentDate = new Date(); // 当前日期 可传入
  const [activeDate, setActiveDate] = useState(currentDate);
  return (
    <div className="react-calendar">
      <div>activeDate: {dayjs(activeDate).format('YYYY-MM-DD')}</div>
      <div>currentDate: {dayjs(currentDate).format('YYYY-MM-DD')}</div>
      <Navigation
        activeDate={activeDate}
        setActiveDate={setActiveDate}
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
        />
      </div>
    </div>
  );
};

export default ReactCalendar;
