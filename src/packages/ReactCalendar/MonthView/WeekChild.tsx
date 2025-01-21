import clsx from 'clsx';
import dayjs, { type Dayjs } from 'dayjs';
import React, { ReactElement } from 'react';
import Flex from '../Flex';

interface WeekChildProps {
  startDate: Dayjs;
  activeDate: Dayjs | Date;
  currentDate?: Date;
  monthView: 'month' | 'week';
  onDayClick: (date: Date) => void;
  dayRender?: (date: Date) => React.ReactNode;
  weekStart: 0 | 1;
  currentMonthIndex?: number;
  style?: React.CSSProperties;
}

const baseClassName = 'react-calendar__month-view__day';

const WeekChild = ({ startDate, currentDate, activeDate, dayRender, onDayClick, currentMonthIndex, style, monthView }: WeekChildProps) => {
  const list: ReactElement[] = [];
  for (let i = 0; i < 7; i++) {
    const dayIns = startDate.add(i, 'day');
    const formatDay = dayjs(dayIns).format('YYYY-MM-DD');
    const day = dayIns.toDate();
    const isCurrentDay = dayIns.isSame(dayjs(currentDate), 'day');
    const classNames: string[] = [baseClassName];
    if (day.getMonth() !== currentMonthIndex && monthView === 'month') {
      classNames.push(`${baseClassName}--neighboringMonth`);
    }
    // 比active之前的日期
    if (dayIns.isBefore(dayjs(currentDate), 'date') && monthView === 'month') {
      classNames.push(`${baseClassName}--before`);
    }
    // 相同周
    if (dayIns.isSame(dayjs(currentDate), 'week')) {
      classNames.push(`${baseClassName}--sameWeek`);
    }
    // 跟current相同的日期
    if (isCurrentDay) {
      classNames.push(`${baseClassName}--current`);
    }
    // 跟active相同的日期
    if (dayIns.isSame(dayjs(activeDate), 'day')) {
      classNames.push(`${baseClassName}--active`);
    }
    list.push(
      <div key={formatDay} aria-label="month" onClick={() => onDayClick(day)} className={clsx(classNames)}>
        {dayRender ? dayRender(day) : <span>{isCurrentDay ? '今' : dayjs(day).format('D')}</span>}
      </div>
    );
  }
  return (
    <Flex style={style} key={startDate.format('MM-DD')} count={7} className={clsx(['react-calendar__month-view__days'])}>
      {list}
    </Flex>
  );
};

export default WeekChild;
