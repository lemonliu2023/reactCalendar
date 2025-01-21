import { Swiper } from 'antd-mobile';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import WeekDays from './WeekDays';
import { MonthViewType } from '..';

interface MonthViewProps {
  currentDate: Date;
  weekStart: 1 | 0;
  activeDate: Date;
  setActiveDate: (date: Date) => void;
  dayRender?: (date: Date) => React.ReactNode;
  monthView: MonthViewType;
  baseHeight: number;
  barHeight: number;
  height: number;
}

function Wrapper({ currentDate, activeDate, setActiveDate, weekStart, dayRender, baseHeight, barHeight, height, monthView }: MonthViewProps) {
  const [pre, setPre] = useState(1);
  const [list, setList] = useState<number[]>([0, 1, 2]);
  const [activeIndex, setActiveIndex] = useState(1);
  const [immediateActiveDate, setImmediateActiveDate] = useState(dayjs(activeDate));
  const children = useMemo(() => {
    return (
      <Swiper
        loop
        indicator={false}
        defaultIndex={1}
        onIndexChange={(i) => {
          setActiveIndex(i);
          const cur = list[i];
          // 向左滑动
          if (cur > pre) {
            const ii = (i - 2 + 3) % 3;
            setList((prev) => {
              const newArr = [...prev];
              newArr[ii] = newArr[ii] + 3;
              return newArr;
            });
            const newDate = dayjs(activeDate).add(1, monthView);
            setImmediateActiveDate(newDate);
            setTimeout(() => {
              setActiveDate(newDate.toDate());
            }, 200);
          } else {
            // 向右滑动
            const ii = (i + 2 + 3) % 3;
            setList((prev) => {
              const newArr = [...prev];
              newArr[ii] = newArr[ii] - 3;
              return newArr;
            });
            const newDate = dayjs(activeDate).subtract(1, monthView);
            setImmediateActiveDate(newDate);
            setTimeout(() => {
              setActiveDate(newDate.toDate());
            }, 200);
          }
          setPre(cur);
        }}
      >
        {list.map((_, index) => {
          return (
            <Swiper.Item key={index}>
              <WeekDays
                activeOffset={list[activeIndex]}
                immediateActiveDate={immediateActiveDate}
                offset={_}
                activeDate={activeDate}
                currentDate={currentDate}
                dayRender={dayRender}
                weekStart={weekStart}
                height={height}
                baseHeight={baseHeight}
                barHeight={barHeight}
                monthView={monthView}
                onDayClick={(date: Date) => {
                  setImmediateActiveDate(dayjs(date));
                  setActiveDate(date);
                }}
              />
            </Swiper.Item>
          );
        })}
      </Swiper>
    );
  }, [activeDate, activeIndex, barHeight, baseHeight, currentDate, dayRender, height, immediateActiveDate, list, monthView, pre, setActiveDate, weekStart]);
  return children;
}

export default Wrapper;
