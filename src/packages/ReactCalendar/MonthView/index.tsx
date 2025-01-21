import WeekTitle from './WeekTitle';
import { MonthViewType } from '..';
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import FloatingPanelTop from '../../FloatingPanelTop';
import Wrapper from './Wrapper';

interface MonthViewProps {
  currentDate: Date;
  weekStart: 1 | 0;
  activeDate: Date;
  setActiveDate: (date: Date) => void;
  dayRender?: (date: Date) => React.ReactNode;
  showFixedNumberOfWeeks: boolean;
  showNeighboringMonth: boolean;
  monthView: MonthViewType;
  enableSwiper: boolean;
  setMonthView: (view: MonthViewType) => void;
}
function MonthView({ currentDate, activeDate, setActiveDate, weekStart = 0, dayRender, monthView, setMonthView }: MonthViewProps) {
  const [baseHeight, setBaseHeight] = useState(0);
  const [barHeight, setBarHeight] = useState(0);
  const [height, setHeight] = useState(0);
  const heightRef = useRef(0);
  useLayoutEffect(() => {
    const dom = document.querySelector('.adm-swiper-item');
    const bar = document.querySelector('.next-floating-panel-header');
    const domHeight = dom?.clientHeight || 0;
    const barHeight = bar?.clientHeight || 0;
    heightRef.current = domHeight + barHeight;
    setBaseHeight(domHeight);
    setBarHeight(barHeight);
    setHeight(heightRef.current);
    console.log(domHeight, barHeight)
  }, []);
  const anchors = useMemo(() => {
    if (baseHeight && barHeight) {
      return [baseHeight + barHeight, baseHeight * 6 + barHeight];
    } else {
      return [];
    }
  }, [baseHeight, barHeight]);
  const onHeightChangeHandler = useCallback(
    (height: number) => {
      if (height > baseHeight + barHeight + 1) {
        setMonthView('month');
      } else if (height < baseHeight + barHeight + 1) {
        setMonthView('week');
      }
      setHeight(height);
    },
    [baseHeight, barHeight, setMonthView]
  );

  return (
    <div className="react-calendar__month-view">
      <WeekTitle weekStart={weekStart} />
      <FloatingPanelTop anchors={anchors} onHeightChange={onHeightChangeHandler}>
        <Wrapper
          height={height}
          baseHeight={baseHeight}
          barHeight={barHeight}
          currentDate={currentDate}
          activeDate={activeDate}
          setActiveDate={setActiveDate}
          weekStart={weekStart}
          monthView={monthView}
          dayRender={dayRender}
        />
      </FloatingPanelTop>
    </div>
  );
}

export default MonthView;
