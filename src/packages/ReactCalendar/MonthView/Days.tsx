import dayjs from 'dayjs';
import Flex from '../Flex';
import clsx from 'clsx';
import React, { useMemo } from 'react';
import { useSwipeable } from 'react-swipeable';

interface DaysProps {
  activeDate: Date;
  viewStartDay: Date;
  currentDate?: Date;
  currentMonthIndex: number;
  onDayClick: (date: Date) => void;
  dayRender?: (date: Date) => React.ReactNode;
  showFixedNumberOfWeeks: boolean;
  showNeighboringMonth: boolean;
  monthView: 'week' | 'month';
  enableSwiper: boolean;
  setMonthView: (monthView: 'week' | 'month') => void;
}

const baseClassName = 'react-calendar__month-view__day';

function Days({
  currentDate,
  activeDate,
  viewStartDay,
  currentMonthIndex,
  onDayClick,
  dayRender,
  showFixedNumberOfWeeks,
  showNeighboringMonth,
  monthView,
  enableSwiper,
  setMonthView,
}: DaysProps) {
  const rows = useMemo(() => (monthView === 'week' ? 1 : 6), [monthView]);
  const handlers = useSwipeable({
    onSwipedDown: () => {
      setMonthView('month');
    },
    onSwipedUp: () => {
      setMonthView('week');
    },
    trackMouse: enableSwiper,
    trackTouch: enableSwiper,
    delta: 20,
  });
  const days = useMemo(() => {
    const list: React.ReactElement[] = [];
    for (let i = 0; i < rows * 7; i++) {
      const dayIns = dayjs(viewStartDay).add(i, 'day');
      const formatDay = dayjs(dayIns).format('YYYY-MM-DD');
      const day = dayIns.toDate();
      const isCurrentDay = dayIns.isSame(dayjs(currentDate), 'day');
      const classNames: string[] = [baseClassName];
      if (day.getMonth() !== currentMonthIndex) {
        if (showFixedNumberOfWeeks) {
          classNames.push(`${baseClassName}--neighboringMonth`);
        } else if (showNeighboringMonth) {
          if (day.getDay() === 0 && !dayIns.isSame(dayjs(viewStartDay))) {
            list.push(<span key={formatDay}></span>);
            break;
          } else {
            classNames.push(`${baseClassName}--neighboringMonth`);
          }
        } else {
          list.push(<span key={formatDay}></span>);
          continue;
        }
      }
      // 跟current相同的日期
      if (isCurrentDay) {
        classNames.push(`${baseClassName}--current`);
      }
      // 跟active相同的日期
      if (dayIns.isSame(dayjs(activeDate), 'day')) {
        classNames.push(`${baseClassName}--active`);
      }
      // 比active之前的日期
      if (dayIns.isBefore(dayjs(currentDate))) {
        classNames.push(`${baseClassName}--before`);
      }
      // 相同周
      if (dayIns.isSame(dayjs(currentDate), 'week')) {
        classNames.push(`${baseClassName}--sameWeek`);
      }
      list.push(
        <div key={formatDay} onClick={() => onDayClick(day)} className={clsx(classNames)}>
          <div className="tile">{dayRender ? dayRender(day) : <span>{isCurrentDay ? '今' : dayjs(day).format('D')}</span>}</div>
        </div>
      );
    }
    return list;
  }, [viewStartDay, currentMonthIndex, currentDate, activeDate, dayRender, showFixedNumberOfWeeks, showNeighboringMonth, onDayClick, rows]);

  return (
    <div {...handlers} className="react-calendar__month-view__days__wrapper">
      <Flex count={7} className="react-calendar__month-view__days" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {days}
      </Flex>
    </div>
  );
}

export default Days;
