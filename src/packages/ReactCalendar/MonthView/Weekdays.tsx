import dayjs, { Dayjs } from 'dayjs';
import WeekChild from './WeekChild';
import React, { useEffect, useState } from 'react';

interface WeekDaysProps {
  activeDate: Date;
  currentDate?: Date;
  onDayClick: (date: Date) => void;
  dayRender?: (date: Date) => React.ReactNode;
  weekStart: 0 | 1;
  height?: number;
  baseHeight: number;
  barHeight: number;
  monthView: 'month' | 'week';
  offset: number;
  activeOffset: number;
  immediateActiveDate: Dayjs;
}

const WeekDays = ({
  activeDate,
  weekStart,
  currentDate,
  onDayClick,
  dayRender,
  height = 0,
  baseHeight,
  barHeight,
  monthView,
  activeOffset,
  offset,
  immediateActiveDate,
}: WeekDaysProps) => {
  const selfActiveDate = immediateActiveDate.add(offset - activeOffset, monthView);
  const monthStartDay = selfActiveDate.startOf('month');
  const currentMonthIndex = monthStartDay.month();
  const viewStartDay = monthStartDay.startOf('week');
  const totalMinHeight = baseHeight + barHeight;
  const totalMaxHeight = baseHeight * 6 + barHeight;
  const list: React.ReactNode[] = [];
  const rows = 6;
  const [activeWeekPosition, setActiveWeekPosition] = useState(0);
  useEffect(() => {
    if (monthView === 'month') {
      const date = dayjs(activeDate);
      const firstDayOfMonth = dayjs(date).startOf('month').startOf('week');
      const daysDiff = date.diff(firstDayOfMonth, 'days');
      setActiveWeekPosition(Math.ceil((daysDiff + 1) / 7) - 1);
    }
  }, [monthView, activeDate]);
  const activeOffsetHeight = ((height - totalMinHeight) / (totalMaxHeight - totalMinHeight)) * baseHeight * activeWeekPosition;
  for (let i = 0; i < rows; i++) {
    const _startDate = viewStartDay.add(i, 'week');
    const isActiveWeek = selfActiveDate.isSame(_startDate, 'week');
    list.push(
      <WeekChild
        monthView={monthView}
        key={i}
        style={{
          display: (monthView === 'week' && isActiveWeek) || monthView === 'month' ? 'flex' : 'none',
          transform: monthView === 'week' ? 'none' : `translateY(${-baseHeight * activeWeekPosition + activeOffsetHeight}px)`,
          opacity: isActiveWeek || monthView === 'week' ? 1 : (height - totalMinHeight) / (totalMaxHeight - totalMinHeight) || 0,
        }}
        startDate={_startDate}
        currentDate={currentDate}
        activeDate={activeDate}
        onDayClick={onDayClick}
        dayRender={dayRender}
        weekStart={weekStart}
        currentMonthIndex={currentMonthIndex}
      />
    );
  }

  return <>{list}</>;
};

export default WeekDays;
