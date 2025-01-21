import { useCallback, useState } from 'react';
import MonthView from './MonthView';
import Navigation from './Navigation';
import './index.less';
import { useEffect } from 'react';

export type MonthViewType = 'week' | 'month';

export type ReactCalendarInstance = {
  monthView: MonthViewType;
  activeDate: Date;
  setActiveDate: (date: Date) => void;
};
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
  monthView?: MonthViewType;
  onActiveDayChange?: (date: Date) => void;
  onMonthViewChange?: (monthView: MonthViewType) => void;
  reactCalendarRef?: React.MutableRefObject<ReactCalendarInstance | undefined>;
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
  onActiveDayChange = () => {},
  onMonthViewChange = () => {},
  reactCalendarRef,
  currentDate = new Date(),
}: ReactCalendarProps) => {
  const [activeDate, setActiveDate] = useState(currentDate);
  const [_monthView, _setMonthView] = useState(monthView || 'month');
  const _onMonthViewChange = useCallback(
    (view: MonthViewType) => {
      _setMonthView((pre) => {
        if (pre !== view) {
          onMonthViewChange(view);
          return view;
        }
        return pre;
      });
    },
    [onMonthViewChange]
  );
  const _setActiveDate = (date: Date) => {
    setActiveDate(date);
    onActiveDayChange(date);
  };
  useEffect(() => {
    if (reactCalendarRef) {
      reactCalendarRef.current = {
        monthView: _monthView,
        activeDate,
        setActiveDate: (date: Date) => {
          setActiveDate(date);
        },
      };
    }
  }, [reactCalendarRef, _monthView, activeDate]);
  return (
    <div className="react-calendar">
      <Navigation
        activeDate={activeDate}
        setActiveDate={_setActiveDate}
        monthView={_monthView}
        navigationCenter={navigationCenter && navigationCenter(currentDate)}
        navigationPre={navigationPre}
        navigationNext={navigationNext}
      />
      <div className="react-calendar__viewContainer">
        <MonthView
          currentDate={currentDate}
          activeDate={activeDate}
          setActiveDate={_setActiveDate}
          weekStart={weekStart || 0}
          dayRender={dayRender}
          showFixedNumberOfWeeks={!!showFixedNumberOfWeeks}
          showNeighboringMonth={!!showNeighboringMonth}
          monthView={_monthView}
          setMonthView={_onMonthViewChange}
          enableSwiper={!!enableSwiper}
        />
      </div>
    </div>
  );
};

export default ReactCalendar;
