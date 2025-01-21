import clsx from 'clsx';
import dayjs from 'dayjs';
import { useRef } from 'react';
import ReactCalendar, { ReactCalendarInstance } from './packages/ReactCalendar';
import { HolidayUtil, Lunar } from 'lunar-typescript';
import './App.less';

function CalendarWrapper() {
  const reactCalendarRef = useRef<ReactCalendarInstance | undefined>();
  const dayRender = (date: Date) => {
    const dayIns = dayjs(date);
    const day = dayIns.format('D');
    const d = Lunar.fromDate(date);
    const lunar = d.getDayInChinese();
    const solarTerm = d.getJieQi();
    const h = HolidayUtil.getHoliday(date.getFullYear(), date.getMonth() + 1, date.getDate());
    const displayHoliday = h?.getTarget() === h?.getDay() ? h?.getName() : undefined;
    const isCurrentDay = dayIns.isSame(dayjs(), 'day');
    return (
      <div className="schedule-tile">
        <div className="day-wrapper">
          <div className="day">{isCurrentDay ? '今' : day}</div>
          <div className="lunar">{displayHoliday || solarTerm || lunar}</div>
        </div>
        <div className={clsx(['schedule-dot'])}></div>
      </div>
    );
  };
  return (
    <div className="px-[12px] mt-[10px] pt-[10px] bg-white">
      <ReactCalendar
        navigationCenter={() => null}
        dayRender={dayRender}
        showNeighboringMonth
        showFixedNumberOfWeeks
        monthView="week"
        enableSwiper
        reactCalendarRef={reactCalendarRef}
      />
    </div>
  );
}
export default CalendarWrapper;
